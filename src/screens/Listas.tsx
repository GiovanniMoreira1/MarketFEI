import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListasScreen({ navigation }: { navigation: any }) {
  const [nomeLista, setNomeLista] = useState('');
  const [listas, setListas] = useState<any[]>([]);

  useEffect(() => {
    carregarListas();
  }, []);

  const carregarListas = async () => {
    try {
      const data = await AsyncStorage.getItem('listas');
      const listasSalvas = data ? JSON.parse(data) : [];
      setListas(listasSalvas);
    } catch (error) {
      console.error('Erro ao carregar listas:', error);
    }
  };

  const salvarNovaLista = async () => {
    if (!nomeLista.trim()) return;

    const novaLista = { nome: nomeLista, itens: [] };

    try {
      const data = await AsyncStorage.getItem('listas');
      const listasSalvas = data ? JSON.parse(data) : [];

      listasSalvas.push(novaLista);

      await AsyncStorage.setItem('listas', JSON.stringify(listasSalvas));
      setNomeLista('');
      setListas(listasSalvas);
    } catch (error) {
      console.error('Erro ao salvar a lista:', error);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.listaItem}>
      <Text style={styles.listaNome}>{item.nome}</Text>
      <TouchableOpacity style={styles.botaoVer} onPress={() => navigation.navigate('DetalhesLista', { lista: item })}>
        <Text style={styles.textoVer}>Ver</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Listas</Text>

      <TextInput
        style={styles.inputs}
        placeholder="Nome da nova lista"
        placeholderTextColor="#888"
        value={nomeLista}
        onChangeText={setNomeLista}
      />

      <TouchableOpacity style={styles.botaoCriar} onPress={salvarNovaLista}>
        <Text style={styles.textoBotao}>Criar nova lista</Text>
      </TouchableOpacity>

      <FlatList
        data={listas}
        keyExtractor={(item, index) => item.nome + index}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('home')}>
          <Image source={require('../../assets/house-chimney.png')} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Listas')}>
          <Image source={require('../../assets/shopping-cart.png')} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Scanner')}>
          <Image source={require('../../assets/camera-viewfinder.png')} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53A7D8',
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  inputs: {
    backgroundColor: '#FDFEFF',
    width: 250,
    height: 45,
    alignSelf: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000044',
  },
  botaoCriar: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#005f99',
  },
  textoBotao: {
    color: '#005f99',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listaItem: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listaNome: {
    fontSize: 16,
    color: '#005f99',
  },
  botaoVer: {
    backgroundColor: '#005f99',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoVer: {
    color: '#fff',
    fontWeight: '600',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    borderTopWidth: 2,
    borderColor: '#005f99',
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
});