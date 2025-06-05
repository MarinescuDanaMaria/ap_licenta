
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { UserDetailContext } from './../../context/UserDetailContext';

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserDetail(null);
        router.replace('/');
      })
      .catch((err) => console.error('Eroare delogare:', err));
  };

  return (
    <View style={styles.headerContainer}>
     <View style={styles.userInfoContainer}>
  <Ionicons name="person-circle-outline" size={42} color="#6b6b6b" style={{ marginRight: 8 }} />
  <View>
    <Text style={styles.greeting}>
      <Text style={styles.hello}>Bună, </Text>
      <Text style={styles.name}>{userDetail?.name}</Text>
    </Text>
    <Text style={styles.subtitle}>Hai să începem!</Text>
  </View>
</View>


      <View style={{ position: 'relative' }}>
        <TouchableOpacity onPress={() => setShowMenu(prev => !prev)}>
          <Ionicons name="settings-outline" size={28} color="black" />
        </TouchableOpacity>

        {showMenu && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItemWrapper}
              onPress={() => {
                setShowMenu(false);
                router.push('/profile');
              }}
            >
              <Ionicons name="person-outline" size={18} color="black" />
              <Text style={styles.dropdownItem}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItemWrapper}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={18} color="black" />
              <Text style={styles.dropdownItem}>Delogare</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginTop: 0,
//     marginBottom: 15,
//   },
//   greeting: {
//     fontSize: 26,
//     fontFamily: 'outfit',
//     color: '#1a1a1a',
//   },
//   hello: {
//     fontFamily: 'outfit',
//     fontSize: 27,
//     color: '#333',
//   },
//   name: {
//     fontFamily: 'outfit-bold',
//     fontSize: 28,
//     color: '#0a0a0a',
//   },
//   subtitle: {
//     fontFamily: 'outfit',
//     fontSize: 20,
//     color: '#555',
//     marginTop: 4,
//   },
//   dropdown: {
//     position: 'absolute',
//     top: 40,
//     right: 0,
//     backgroundColor: 'white',
//     borderRadius: 12,
//     paddingVertical: 8,
//     width: 150,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     elevation: 5,
//     zIndex: 100,
//   },
//   dropdownItemWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   dropdownItem: {
//     marginLeft: 8,
//     fontFamily: 'outfit',
//     fontSize: 16,
//     color: 'black',
//   },
// });

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8, // Mai puțin spațiu sus-jos
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 5, // mai aproape de marginile ecranului
    marginTop: 10,
    marginBottom: 10, // mai puțină înălțime totală
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  greeting: {
    fontSize: 20, // mai mic
    fontFamily: 'outfit',
    color: '#1a1a1a',
  },
  hello: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: '#333',
  },
  name: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: '#0a0a0a',
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 14, // mai mic
    color: '#555',
    marginTop: 2,
  },
  dropdown: {
    position: 'absolute',
    top: 35, // ajustat pentru header mai plat
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 8,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 100,
  },
  dropdownItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  dropdownItem: {
    marginLeft: 8,
    fontFamily: 'outfit',
    fontSize: 15,
    color: 'black',
  },
  userInfoContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
});
