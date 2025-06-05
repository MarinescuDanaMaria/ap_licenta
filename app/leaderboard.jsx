import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../config/firebaseConfig';
import Colors from '../constants/Colors';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => doc.data());
      const sorted = usersData.sort((a, b) => b.points - a.points);
      setUsers(sorted);
      setFilteredUsers(sorted);
    } catch (error) {
      console.error('Eroare la obținerea utilizatorilor:', error);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const getMedal = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return null;
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/gradient.png')}
      style={styles.container}
    >
      <Text style={styles.title}>Clasament</Text>
      <TextInput
        placeholder="Caută utilizator..."
        value={search}
        onChangeText={handleSearch}
        style={styles.searchInput}
        placeholderTextColor={Colors.GRAY}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item, index) => item.uid || index.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.userCard, index < 3 && styles.topUser]}>
            <Text style={styles.userName}>
              {getMedal(index)} {item.name}
            </Text>
            <View style={styles.userStats}>
              <Text style={styles.userDetail}>Nivel {Math.floor((item.points || 0) / 100) + 1}</Text>
              <Text style={styles.userDetail}>{item.points} puncte</Text>
            </View>
          </View>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 55 : 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    marginBottom: 20,
    color: Colors.DARK,
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.DARK,
  },
  userCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  topUser: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    backgroundColor: '#fef9e7',
  },
  userName: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    marginBottom: 4,
    color: Colors.DARK,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userDetail: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: Colors.GRAY,
  },
});