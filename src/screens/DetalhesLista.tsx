import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function DetalhesLista({ route, navigation }: any) {
  const [produtoNome, setProdutoNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [lista, setLista] = useState(route.params.lista);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    setLista(route.params.lista);
  }, [route.params.lista]);

  const atualizarItem = async (itemAtualizado: any, incremento: number) => {
    const novaQuantidade = itemAtualizado.quantidade + incremento;

    let novaLista;

    if (novaQuantidade <= 0) {
      novaLista = {
        ...lista,
        itens: lista.itens.filter(
          (item: any) => item.nome !== itemAtualizado.nome
        ),
      };
    } else {
      novaLista = {
        ...lista,
        itens: lista.itens.map((item: any) =>
          item.nome === itemAtualizado.nome
            ? { ...item, quantidade: novaQuantidade }
            : item
        ),
      };
    }

    try {
      const data = await AsyncStorage.getItem('listas');
      const todasListas = data ? JSON.parse(data) : [];

      const listasAtualizadas = todasListas.map((l: any) =>
        l.nome === lista.nome ? novaLista : l
      );

      await AsyncStorage.setItem('listas', JSON.stringify(listasAtualizadas));
      setLista(novaLista);
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };

  const incrementarItem = async (item: any) => {
    await atualizarItem(item, 1);
  };

  const decrementarItem = async (item: any) => {
    await atualizarItem(item, -1);
  };

  const adicionarProduto = async () => {
    if (!produtoNome.trim() || !quantidade) return;

    const novoProduto = {
      nome: produtoNome,
      quantidade: parseInt(quantidade),
    };

    const novaLista = {
      ...lista,
      itens: [...lista.itens, novoProduto],
    };

    try {
      const data = await AsyncStorage.getItem('listas');
      const todasListas = data ? JSON.parse(data) : [];

      const listasAtualizadas = todasListas.map((l: any) =>
        l.nome === lista.nome ? novaLista : l
      );

      await AsyncStorage.setItem('listas', JSON.stringify(listasAtualizadas));
      setLista(novaLista);
      setProdutoNome('');
      setQuantidade('');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <View style={styles.itemLinha}>
        <Text style={styles.textoItem}>
          {item.nome} - {item.quantidade}
        </Text>
        <View style={styles.botoesContainer}>
          <TouchableOpacity onPress={() => decrementarItem(item)}>
            <Image
              source={require('../../assets/minus-circle.png')}
              style={styles.icones}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => incrementarItem(item)}>
            <Image
              source={require('../../assets/add.png')}
              style={styles.icones}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Detalhes da Lista</Text>
      <Text style={styles.subtitle}>Nome: {lista.nome}</Text>

      <TextInput
        placeholder="Nome do produto"
        value={produtoNome}
        onChangeText={setProdutoNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={adicionarProduto}>
        <Text style={styles.buttonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={lista.itens}
        keyExtractor={(item, index) => item.nome + index}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Listas')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#53A7D8',
  },
  botoesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icones: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
  },
  button: {
    backgroundColor: '#005f99',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    alignContent: 'center',
  },
  itemLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textoItem: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
  },
});