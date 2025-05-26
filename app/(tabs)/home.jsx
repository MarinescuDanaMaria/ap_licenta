// import { SafeAreaView, StyleSheet } from 'react-native';
// import Header from '../../components/Home/Header';
// import NoCourse from '../../components/Home/NoCourse';

// export default function Home() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />
//       <NoCourse />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20, // ajustează aici cât de jos vrei să înceapă
//     backgroundColor: '#f9f9f9' // sau ce culoare folosești în aplicație
//   }
// });

import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Animated, FlatList, ImageBackground, Platform, Text, View } from 'react-native';
import CourseList from '../../components/Home/CourseList';
import CourseProgress from '../../components/Home/CourseProgress';
import Header from '../../components/Home/Header';
import PracticeSection from '../../components/Home/PracticeSection';
import { UserDetailContext } from '../../context/UserDetailContext';
import { db } from './../../config/firebaseConfig';
import Colors from './../../constants/Colors';

export default function Home() {
  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const router = useRouter();

  // useEffect(() => {
  //   if (userDetail === null) {
  //     router.replace('/auth/signIn');
  //   }
  // }, [userDetail]);

  useEffect(() => {
  if (userDetail) {
    const oldLevel = userDetail?.level || 0;
    const newLevel = Math.floor((userDetail.points || 0) / 100) + 1;

    if (newLevel > oldLevel) {
      setShowLevelUp(true);
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => setShowLevelUp(false));
    }
  }
}, [userDetail]);


  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      GetCourseList();
    }
  }, []);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);

    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const courses = querySnapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
      setCourseList(courses);
    } catch (err) {
      console.log('Eroare la GetCourseList:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || initialLoad) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.BABY_BLUE }}>
        <ActivityIndicator size="large" color={Colors.GRAY} />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/gradient.png')}
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <FlatList
        data={[]} // dacă folosești doar ListHeaderComponent
        onRefresh={GetCourseList}
        refreshing={loading}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListHeaderComponent={
          <View style={{ padding: 25, paddingTop: Platform.OS === 'ios' ? 55 : 25 }}>
            <Header />
            {showLevelUp && (
  <Animated.View style={{
    opacity: fadeAnim,
    backgroundColor: Colors.SUCCESS,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
  }}>
    <Text style={{
      color: Colors.WHITE,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'outfit-bold',
    }}>
      Felicitări! Ai avansat la nivelul {Math.floor((userDetail?.points || 0) / 100) + 1}!
    </Text>
  </Animated.View>
)}
              <View>
                <CourseProgress courseList={courseList} /> 
                <PracticeSection />
                <CourseList courseList={courseList} /> 
              </View>
          </View>
        }
      />
    </ImageBackground>
  );
}
