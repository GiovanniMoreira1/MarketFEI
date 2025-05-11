import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

export function primeiraLetraMaiuscula(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ScannerScreen({ navigation }: { navigation: any }) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState('');
  const [productInfo, setProductInfo] = useState<{
    nome: string;
    marca: string;
    kcal: string;
    acucar: string;
    fibras: string;
    gordura: string;
    proteina: string;
    carboidrato: string;
  } | null>(null);
  const [verMais, setVerMais] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  const pegarInfoProduto = async (ean: string) => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${ean}.json`
      );
      console.log(ean);
      console.log(response);

      const data = await response.json();

      if (data.status === 1) {
        console.log(data.product_name);
        const kcal =
          `Calorias: ${data?.product?.nutriments?.['energy-kcal']} kcal` ??
          `Calorias: ${data?.product?.nutriments?.['energy_kcal']} kcal` ??
          'Kcal indisponível';
        const acucar = data.product.nutriments.sugars
          ? `Açúcar:  ${data.product.nutriments.sugars} g`
          : 'Açúcar indisponível';
        const fibras = data.product.nutriments.fiber
          ? `Fibras:  ${data.product.nutriments.fiber} g`
          : 'Fibra indisponível';
        const gordura = data.product.nutriments.fat
          ? `Gordura:  ${data.product.nutriments.fat} g`
          : 'Gordura indisponível';
        const carboidrato = data.product.nutriments.carbohydrates
          ? `Carboidratos: ${data.product.nutriments.carbohydrates} g`
          : 'Carboidrato indisponível';
        const proteinas = data.product.nutriments.proteins
          ? `Proteínas:  ${data.product.nutriments.proteins} g`
          : 'Proteína indisponível';
        const nomeProduto = data.product.product_name
          ? `${data.product.product_name}`
          : 'Nome indisponível';
        const nomeMarca = data.product.brands
          ? `Marca:  ${data.product.brands}`
          : 'Marca indisponível';

        setProductInfo({
          nome: primeiraLetraMaiuscula(nomeProduto),
          marca: nomeMarca,
          kcal: kcal,
          acucar: acucar,
          fibras: fibras,
          gordura: gordura,
          proteina: proteinas,
          carboidrato: carboidrato,
        });
      } else {
        console.log('Produto não encontrado.');
        setProductInfo(null);
      }
    } catch (error) {
      console.error('Erro ao achar o produto:', error);
      setProductInfo(null);
    }
  };

  const mostrarListasParaEscolha = async () => {
    try {
      const data = await AsyncStorage.getItem('listas');
      const listasSalvas = data ? JSON.parse(data) : [];

      if (listasSalvas.length === 0) {
        Alert.alert('Nenhuma lista encontrada. Crie uma lista primeiro.');
        return;
      }

      Alert.alert(
        'Escolha uma lista',
        'Selecione em qual lista deseja adicionar o produto:',
        listasSalvas.map((lista) => ({
          text: lista.nome,
          onPress: () => adicionarProdutoNaLista(lista.nome),
        }))
      );
    } catch (error) {
      console.error('Erro ao carregar listas:', error);
      Alert.alert('Erro ao carregar listas.');
    }
  };

  const adicionarProdutoNaLista = async (nomeLista: string) => {
    if (!productInfo || !productInfo.nome) return;

    try {
      const data = await AsyncStorage.getItem('listas');
      let listasSalvas = data ? JSON.parse(data) : [];

      const index = listasSalvas.findIndex((lista) => lista.nome === nomeLista);

      if (index === -1) {
        Alert.alert('Lista não encontrada.');
        return;
      }

      listasSalvas[index].itens.push({
        nome: productInfo.nome,
        quantidade: 1,
      });

      await AsyncStorage.setItem('listas', JSON.stringify(listasSalvas));
      Alert.alert('Produto adicionado à lista ' + nomeLista + '!');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      Alert.alert('Erro ao adicionar produto.');
    }
  };

  function toggleFlash() {
    setFlashOn((current) => !current);
  }

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Pedindo acesso à câmera ...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>É necessário permissão à câmera</Text>
        <Button onPress={requestPermission} title="Liberar permissão" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return;
    setScanned(true);
    setBarcodeData(data);
    pegarInfoProduto(data);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        enableTorch={flashOn}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_e', 'code39', 'code128'],
        }}>
        <View style={styles.overlay}>
          <View style={styles.scanFrame} />
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.botaoFlash} onPress={toggleFlash}>
            <Image
              source={require('../../assets/flashlight.png')}
              resizeMode="contain"
              style={styles.tabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}>
            <Image
              source={require('../../assets/rotate-square.png')}
              resizeMode="contain"
              style={styles.tabIcon}
            />
          </TouchableOpacity>
        </View>
      </CameraView>

      {scanned && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Código escaneado: {barcodeData}</Text>
          {productInfo ? (
            <View>
              <Text style={styles.productInfoText}>Nome: {productInfo.nome}</Text>
              <Text style={styles.productInfoText}>{productInfo.marca}</Text>
              <Text style={styles.productInfoText}>{productInfo.kcal}</Text>
            </View>
          ) : (
            <Text style={styles.productInfoText}>Produto não encontrado.</Text>
          )}
          <Button title="Ver mais" onPress={() => setVerMais(true)} />

          <Button
            title="Escanear novamente"
            onPress={() => setScanned(false)}
          />

          <Button
            title="Adicionar à lista"
            onPress={() => mostrarListasParaEscolha()}
          />
        </View>
      )}
      {verMais && (
        <View style={styles.verMaisContainer}>
          <Text style={styles.verMaisTitulo}>Informações completas:</Text>
          <Text style={styles.resultText}>Código escaneado: {barcodeData}</Text>
          {productInfo ? (
            <View>
              <Text style={styles.productInfoText}>Nome: {productInfo.nome}</Text>
              <Text style={styles.productInfoText}>{productInfo.marca}</Text>
              <Text style={styles.productInfoText}>{productInfo.kcal}</Text>
              <Text style={styles.productInfoText}>{productInfo.acucar}</Text>
              <Text style={styles.productInfoText}>{productInfo.proteina}</Text>
              <Text style={styles.productInfoText}>
                {productInfo.carboidrato}
              </Text>
              <Text style={styles.productInfoText}>{productInfo.gordura}</Text>
              <Text style={styles.productInfoText}>{productInfo.fibras}</Text>
            </View>
          ) : (
            <Text style={styles.productInfoText}>Produto não encontrado.</Text>
          )}

          <Button
            title="Escanear novamente"
            onPress={() => {
              setVerMais(false);
              setScanned(false);
            }}
          />

          <Button
            title="Adicionar à lista"
            onPress={() => mostrarListasParaEscolha()}
          />
        </View>
      )}

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('home')}>
          <Image
            source={require('../../assets/house-chimney.png')}
            resizeMode="contain"
            style={styles.tabIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Listas')}>
          <Image
            source={require('../../assets/shopping-cart.png')}
            resizeMode="contain"
            style={styles.tabIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, styles.activeTab]}
          onPress={() => navigation.navigate('Scanner')}>
          <Image
            source={require('../../assets/camera-viewfinder.png')}
            resizeMode="contain"
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    padding: 20,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 280,
    height: 120,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  botaoFlash: {
    padding: 12,
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: '#ffffff',
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flipButton: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: '#ffffff',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    marginBottom: 10,
    fontWeight: '500',
  },
  productInfoText: {
    fontSize: 15,
    marginVertical: 5,
    fontFamily: "Poppins_400Regular",
    fontWeight: '400',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeTab: {
    backgroundColor: 'rgba(0, 95, 153, 1)',
    borderRadius: 8,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  verMaisContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(230, 247, 255, 1)', // azul claro translúcido
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#007acc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  verMaisTitulo: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: '#007acc',
    marginBottom: 10,
  },
});
