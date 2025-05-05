import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      {}
      <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Listas')}>
          <Text style={styles.tabText}>Listas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Scanner')}>
          <Text style={styles.tabText}>Scanner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.tabText}>Perfil</Text>
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
  tabText: {
    fontSize: 18,
    color: '#005f99', 
    fontWeight: '600',
  },
});