// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
// import { useContext, useEffect, useState } from 'react';
// import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Svg, { Path } from 'react-native-svg';
// import { db } from '../../config/firebaseConfig';
// import Colors from '../../constants/Colors';
// import { UserDetailContext } from '../../context/UserDetailContext';


// export default function CourseRoadmap() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { userDetail } = useContext(UserDetailContext);
//   const router = useRouter();
//   const screenWidth = Dimensions.get('window').width;

//   useEffect(() => {
//     getCourses();
//   }, []);

//   const getCourses = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'courses'));
//       const coursesData = querySnapshot.docs.map(doc => ({
//         ...doc.data(),
//         docId: doc.id
//       }));
//       setCourses(coursesData.reverse());
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//   if (!loading && courses.length > 0) {
//     courses.forEach(async (course) => {
//       //const userProgress = userDetail?.startedCourses?.[course.docId]?.completedChapters || [];
//       //const userProgress = (userDetail?.startedCourses?.[course.docId]?.completedChapters || []).map(Number);
//       const userProgress = [...new Set((userDetail?.startedCourses?.[course.docId]?.completedChapters || []).map(Number))];
//       const totalChapters = course?.chapters?.length || 0;
//       const hasCompleted = userProgress.length === totalChapters;
//       const alreadyHasBadge = userDetail?.badges?.includes(course.achievementBadge);

//       console.log('📘 Curs:', course.title);
//       console.log('✔️ Completat:', hasCompleted);
//       console.log('🎖️ Are insignă deja:', alreadyHasBadge);

//       if (hasCompleted && course.achievementBadge && !alreadyHasBadge) {
//         console.log('🏅 Atribuire insignă:', course.achievementBadge);
//         try {
//           await updateDoc(doc(db, 'users', userDetail.uid), {
//             badges: arrayUnion(course.achievementBadge)
//           });
//         } catch (err) {
//           console.error('⚠️ Eroare la actualizare insignă:', err);
//         }
//       }
//     });
//   }
// }, [loading, courses]);


//   const isCourseUnlocked = (courseId) => {
//   const started = userDetail?.startedCourses?.[courseId]?.completedChapters;
//   return Array.isArray(started) && started.length > 0;
// };

// // const isCourseCompleted = (course) => {
// //   const userProgress = userDetail?.startedCourses?.[course.docId]?.completedChapters;
// //   return Array.isArray(userProgress) && course?.chapters?.length > 0 && userProgress.length === course.chapters.length;
// // };

// const isCourseCompleted = (course) => {
//   const userProgress = userDetail?.startedCourses?.[course.docId]?.completedChapters || [];
//   const totalChapters = course?.chapters?.length || 0;
//   return userProgress.length === totalChapters;
// };




//   const getBadgeIcon = (courseTitle) => {
//     if (userDetail?.badges?.includes(courseTitle)) {
//       switch (courseTitle) {
//         case "Introducere în securitate":
//           return "shield-checkmark";
//         case "Atacuri comune":
//           return "warning";
//         case "Apărare și prevenție":
//           return "lock-closed";
//         case "Cazuri reale":
//           return "trophy";
//         default:
//           return "ribbon";
//       }
//     }
//     return null;
//   };

//   const handleCoursePress = (course) => {
//     if (isCourseUnlocked(course.docId)) {
//       router.push({
//         pathname: "/courseView/" + course.docId,
//       });
//     } else {
//       alert('Finalizează cursul anterior pentru a debloca acest curs.');
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/images/gradient.png')}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Harta Cursurilor</Text>
//           <Text style={styles.headerSubtitle}>Nivel {userDetail?.level || 1} • {userDetail?.rank}</Text>
//           <View style={styles.progressBar}>
//             <View style={[styles.progressFill, { width: `${(userDetail?.points % 100)}%` }]} />
//           </View>
//           <Text style={styles.pointsText}>
//             {userDetail?.points || 0} puncte • {100 - (userDetail?.points % 100)} până la următorul nivel
//           </Text>
//         </View>

//         <View style={styles.roadmapContainer}>
//           <Svg height={courses.length * 250} width={screenWidth}>
//             <Path
//               d={`M${screenWidth/2} 0 ${courses.map((_, i) => {
//               const y = i * 250;
//               const controlX = i % 2 ? screenWidth/2 + 120 : screenWidth/2 - 120;
//               return `Q${controlX} ${y + 160} ${screenWidth/2} ${y + 250}`;
//               }).join(' ')}`}

//               fill="none"
//               stroke={Colors.PRIMARY}
//               strokeWidth={3}
//               strokeDasharray="8,8"
//               strokeLinecap="round"
//             />
//           </Svg>

//           {courses.map((course, index) => {
//             const isUnlocked = isCourseUnlocked(course.docId);
//             const isCompleted = isCourseCompleted(course);
//             const badgeIcon = getBadgeIcon(course.title);
//             const isLeft = index % 2 === 0;
//             const verticalPosition = index * 250;

//             return (
//               <View
//                 key={course.docId}
//                 style={[
//                   styles.courseNode,
//                   {
//                     top: verticalPosition,
//                     left: isLeft ? 20 : screenWidth - 220,
//                   }
//                 ]}
//               >
//                 <TouchableOpacity
//                   style={[
//                     styles.courseButton,
//                      isCompleted ? styles.completed : isUnlocked ? styles.unlocked : styles.locked
//                   ]}
//                   onPress={() => handleCoursePress(course)}
//                   //disabled={!isUnlocked}
//                 >
//                   <View style={styles.courseContent}>
//                     <View style={styles.courseHeader}>
//                       <Text style={styles.courseTitle}>{course.title}</Text>
//                       {badgeIcon && (
//                         <View style={styles.badgeContainer}>
//                           <Ionicons name={badgeIcon} size={24} color={Colors.WHITE} />
//                         </View>
//                       )}
//                     </View>
//                     <Text style={styles.courseDescription} numberOfLines={2}>
//                       {course.description}
//                     </Text>
//                     <View style={styles.courseStatus}>
//                       <Ionicons
//                         name={isCompleted ? "checkmark-circle" : isUnlocked ? "lock-open" : "lock-closed"}
//                        // name={isUnlocked ? "lock-open" : "lock-closed"}
//                         size={24}
//                         color={Colors.WHITE}
//                       />
//                       <Text style={styles.statusText}>
//                          {isCompleted ? "Completat" : isUnlocked ? "Deblocat" : "Blocat"} 
//                          {/* {isUnlocked ? "Deblocat" : "Blocat"} */}
//                       </Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             );
//           })}
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.WHITE,
//   },
//   scrollContainer: {
//     paddingTop: 50,
//     paddingBottom: 100,
//     minHeight: '100%',
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 20,
//     margin: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   headerTitle: {
//     fontFamily: 'outfit-bold',
//     fontSize: 32,
//     color: Colors.DARK_BLUE,
//     marginBottom: 10,
//   },
//   headerSubtitle: {
//     fontFamily: 'outfit',
//     fontSize: 18,
//     color: Colors.GRAY,
//     marginBottom: 15,
//   },
//   progressBar: {
//     width: '100%',
//     height: 8,
//     backgroundColor: Colors.BG_GRAY,
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: Colors.PRIMARY,
//   },
//   pointsText: {
//     fontFamily: 'outfit',
//     fontSize: 14,
//     color: Colors.GRAY,
//     marginTop: 8,
//   },
//   roadmapContainer: {
//     position: 'relative',
//     paddingBottom: 100,
//   },
//   courseNode: {
//     position: 'absolute',
//     width: 200,
//   },
//   courseButton: {
//     borderRadius: 20,
//     padding: 20,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   completed: {
//     backgroundColor: Colors.SUCCESS,
//     borderColor: '#388E3C',
//     borderWidth: 1,
//   },
//   unlocked: {
//     backgroundColor: Colors.PRIMARY,
//     borderColor: Colors.SECONDARY,
//     borderWidth: 1,
//   },
//   locked: {
//     backgroundColor: Colors.GRAY,
//     borderColor: '#757575',
//     borderWidth: 1,
//   },
//   courseContent: {
//     gap: 12,
//   },
//   courseHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   courseTitle: {
//     fontFamily: 'outfit-bold',
//     fontSize: 18,
//     color: Colors.WHITE,
//     flex: 1,
//     textShadowColor: 'rgba(0, 0, 0, 0.3)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//   },
//   badgeContainer: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderRadius: 20,
//     padding: 8,
//   },
//   courseDescription: {
//     fontFamily: 'outfit',
//     fontSize: 14,
//     color: Colors.WHITE,
//     opacity: 0.9,
//     lineHeight: 20,
//   },
//   courseStatus: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginTop: 8,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     padding: 8,
//     borderRadius: 12,
//   },
//   statusText: {
//     fontFamily: 'outfit-bold',
//     fontSize: 14,
//     color: Colors.WHITE,
//   },
// });











/// VARIANTA 2 BUNA - de rvzt badges , nu cred ca au ce cauta aici 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
// import { useContext, useEffect, useState } from 'react';
// import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Svg, { Path } from 'react-native-svg';
// import { db } from '../../config/firebaseConfig';
// import Colors from '../../constants/Colors';
// import { UserDetailContext } from '../../context/UserDetailContext';

// export default function CourseRoadmap() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { userDetail } = useContext(UserDetailContext);
//   const router = useRouter();
//   const screenWidth = Dimensions.get('window').width;

//   useEffect(() => {
//     getCourses();
//   }, []);

//   const getCourses = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'courses'));
//       const coursesData = querySnapshot.docs.map(doc => ({
//         ...doc.data(),
//         docId: doc.id
//       }));
//       setCourses(coursesData.sort((a, b) => a.id - b.id));
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!loading && courses.length > 0) {
//       courses.forEach(async (course) => {
//         const userProgress = [...new Set((userDetail?.startedCourses?.[course.docId]?.completedChapters || []).map(Number))];
//         const totalChapters = course?.chapters?.length || 0;
//         const hasCompleted = userProgress.length === totalChapters;
//         const alreadyHasBadge = userDetail?.badges?.includes(course.achievementBadge);

//         if (hasCompleted && course.achievementBadge && !alreadyHasBadge) {
//           try {
//             await updateDoc(doc(db, 'users', userDetail.uid), {
//               badges: arrayUnion(course.achievementBadge)
//             });
//           } catch (err) {
//             console.error('⚠️ Eroare la actualizare insignă:', err);
//           }
//         }
//       });
//     }
//   }, [loading, courses]);

//   const isCourseUnlocked = (courseId) => {
//     const started = userDetail?.startedCourses?.[courseId]?.completedChapters;
//     return Array.isArray(started);
//   };

//   const isCourseCompleted = (course) => {
//     const userProgress = userDetail?.startedCourses?.[course.docId]?.completedChapters || [];
//     const totalChapters = course?.chapters?.length || 0;
//     return userProgress.length === totalChapters;
//   };

//   const getBadgeIcon = (courseTitle) => {
//     if (userDetail?.badges?.includes(courseTitle)) {
//       switch (courseTitle) {
//         case "Introducere în securitate":
//           return "shield-checkmark";
//         case "Atacuri comune":
//           return "warning";
//         case "Apărare și prevenție":
//           return "lock-closed";
//         case "Cazuri reale":
//           return "trophy";
//         default:
//           return "ribbon";
//       }
//     }
//     return null;
//   };

//   const handleCoursePress = async (course) => {
//     if (isCourseUnlocked(course.docId)) {
//       router.push({ pathname: "/courseView/" + course.docId });
//     } else {
//       const unlockedCourses = {};
//       courses.forEach(c => {
//         if (c.id < course.id) {
//           unlockedCourses[c.docId] = {
//             completedChapters: userDetail?.startedCourses?.[c.docId]?.completedChapters || []
//           };
//         }
//       });

//       const updatedCourses = {
//         ...userDetail.startedCourses,
//         ...unlockedCourses,
//         [course.docId]: {
//           completedChapters: userDetail?.startedCourses?.[course.docId]?.completedChapters || []
//         }
//       };

//       try {
//         await updateDoc(doc(db, 'users', userDetail.uid), {
//           startedCourses: updatedCourses
//         });
//         router.push({ pathname: "/courseView/" + course.docId });
//       } catch (err) {
//         console.error('⚠️ Eroare la deblocare cursuri anterioare:', err);
//       }
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/images/gradient.png')}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Harta Cursurilor</Text>
//           <Text style={styles.headerSubtitle}>Nivel {userDetail?.level || 1} • {userDetail?.rank}</Text>
//           <View style={styles.progressBar}>
//             <View style={[styles.progressFill, { width: `${(userDetail?.points % 100)}%` }]} />
//           </View>
//           <Text style={styles.pointsText}>
//             {userDetail?.points || 0} puncte • {100 - (userDetail?.points % 100)} până la următorul nivel
//           </Text>
//         </View>

//         <View style={styles.roadmapContainer}>
//           <Svg height={courses.length * 250} width={screenWidth}>
//             <Path
//               d={`M${screenWidth/2} 0 ${courses.map((_, i) => {
//                 const y = i * 250;
//                 const controlX = i % 2 ? screenWidth/2 + 120 : screenWidth/2 - 120;
//                 return `Q${controlX} ${y + 160} ${screenWidth/2} ${y + 250}`;
//               }).join(' ')}`}
//               fill="none"
//               stroke={Colors.PRIMARY}
//               strokeWidth={3}
//               strokeDasharray="8,8"
//               strokeLinecap="round"
//             />
//           </Svg>

//           {courses.map((course, index) => {
//             const isUnlocked = isCourseUnlocked(course.docId);
//             const isCompleted = isCourseCompleted(course);
//             const badgeIcon = getBadgeIcon(course.title);
//             const isLeft = index % 2 === 0;
//             const verticalPosition = index * 250;

//             return (
//               <View
//                 key={course.docId}
//                 style={[
//                   styles.courseNode,
//                   {
//                     top: verticalPosition,
//                     left: isLeft ? 20 : screenWidth - 220,
//                     opacity: isUnlocked || isCompleted ? 1 : 0.6,
//                   }
//                 ]}
//               >
//                 <TouchableOpacity
//                   style={[
//                     styles.courseButton,
//                     isCompleted ? styles.completed : isUnlocked ? styles.unlocked : styles.locked
//                   ]}
//                   onPress={() => handleCoursePress(course)}
//                 >
//                   <View style={styles.courseContent}>
//                     <View style={styles.courseHeader}>
//                       <Text style={styles.courseTitle}>{course.title}</Text>
//                       {badgeIcon && (
//                         <View style={styles.badgeContainer}>
//                           <Ionicons name={badgeIcon} size={24} color={Colors.WHITE} />
//                         </View>
//                       )}
//                     </View>
//                     <Text style={styles.courseDescription} numberOfLines={2}>
//                       {course.description}
//                     </Text>
//                     <View style={styles.courseStatus}>
//                       <Ionicons
//                         name={isCompleted ? "checkmark-circle" : isUnlocked ? "lock-open" : "lock-closed"}
//                         size={24}
//                         color={Colors.WHITE}
//                       />
//                       <Text style={styles.statusText}>
//                         {isCompleted ? "Completat" : isUnlocked ? "Deblocat" : "Blocat"}
//                       </Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             );
//           })}
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.WHITE,
//   },
//   scrollContainer: {
//     paddingTop: 50,
//     paddingBottom: 100,
//     minHeight: '100%',
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 20,
//     margin: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   headerTitle: {
//     fontFamily: 'outfit-bold',
//     fontSize: 32,
//     color: Colors.DARK_BLUE,
//     marginBottom: 10,
//   },
//   headerSubtitle: {
//     fontFamily: 'outfit',
//     fontSize: 18,
//     color: Colors.GRAY,
//     marginBottom: 15,
//   },
//   progressBar: {
//     width: '100%',
//     height: 8,
//     backgroundColor: Colors.BG_GRAY,
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: Colors.PRIMARY,
//   },
//   pointsText: {
//     fontFamily: 'outfit',
//     fontSize: 14,
//     color: Colors.GRAY,
//     marginTop: 8,
//   },
//   roadmapContainer: {
//     position: 'relative',
//     paddingBottom: 100,
//   },
//   courseNode: {
//     position: 'absolute',
//     width: 200,
//   },
//   courseButton: {
//     borderRadius: 20,
//     padding: 20,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   completed: {
//     backgroundColor: Colors.SUCCESS,
//     borderColor: '#388E3C',
//     borderWidth: 1,
//   },
//   unlocked: {
//     backgroundColor: Colors.PRIMARY,
//     borderColor: Colors.SECONDARY,
//     borderWidth: 1,
//   },
//   locked: {
//     backgroundColor: Colors.GRAY,
//     borderColor: '#757575',
//     borderWidth: 1,
//   },
//   courseContent: {
//     gap: 12,
//   },
//   courseHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   courseTitle: {
//     fontFamily: 'outfit-bold',
//     fontSize: 18,
//     color: Colors.WHITE,
//     flex: 1,
//     textShadowColor: 'rgba(0, 0, 0, 0.3)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//   },
//   badgeContainer: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderRadius: 20,
//     padding: 8,
//   },
//   courseDescription: {
//     fontFamily: 'outfit',
//     fontSize: 14,
//     color: Colors.WHITE,
//     opacity: 0.9,
//     lineHeight: 20,
//   },
//   courseStatus: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginTop: 8,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     padding: 8,
//     borderRadius: 12,
//   },
//   statusText: {
//     fontFamily: 'outfit-bold',
//     fontSize: 14,
//     color: Colors.WHITE,
//   },
// });


import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { db } from '../../config/firebaseConfig';
import Colors from '../../constants/Colors';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function CourseRoadmap() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        docId: doc.id
      }));
      setCourses(coursesData.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && courses.length > 0) {
      courses.forEach(async (course) => {
        const userProgress = [...new Set((userDetail?.startedCourses?.[course.docId]?.completedChapters || []).map(Number))];
        const totalChapters = course?.chapters?.length || 0;
        const hasCompleted = userProgress.length === totalChapters;
        const alreadyHasBadge = userDetail?.badges?.includes(course.achievementBadge);

        if (hasCompleted && course.achievementBadge && !alreadyHasBadge) {
          try {
            await updateDoc(doc(db, 'users', userDetail.uid), {
              badges: arrayUnion(course.achievementBadge)
            });
          } catch (err) {
            console.error('⚠️ Eroare la actualizare insignă:', err);
          }
        }
      });
    }
  }, [loading, courses]);

  const isCourseUnlocked = (courseId) => {
    const started = userDetail?.startedCourses?.[courseId]?.completedChapters;
    return Array.isArray(started);
  };

  const isCourseCompleted = (course) => {
    const userProgress = userDetail?.startedCourses?.[course.docId]?.completedChapters || [];
    const totalChapters = course?.chapters?.length || 0;
    return userProgress.length === totalChapters;
  };

  const getBadgeIcon = (courseTitle) => {
    if (userDetail?.badges?.includes(courseTitle)) {
      switch (courseTitle) {
        case "Introducere în securitate":
          return "shield-checkmark";
        case "Atacuri comune":
          return "warning";
        case "Apărare și prevenție":
          return "lock-closed";
        case "Cazuri reale":
          return "trophy";
        default:
          return "ribbon";
      }
    }
    return null;
  };

  const handleCoursePress = async (course) => {
    if (isCourseUnlocked(course.docId)) {
      router.push({ pathname: "/courseView/" + course.docId });
    } else {
      const unlockedCourses = {};
      courses.forEach(c => {
        if (c.id < course.id) {
          unlockedCourses[c.docId] = {
            completedChapters: userDetail?.startedCourses?.[c.docId]?.completedChapters || []
          };
        }
      });

      const updatedCourses = {
        ...userDetail.startedCourses,
        ...unlockedCourses,
        [course.docId]: {
          completedChapters: userDetail?.startedCourses?.[course.docId]?.completedChapters || []
        }
      };

      try {
        await updateDoc(doc(db, 'users', userDetail.uid), {
          startedCourses: updatedCourses
        });
        router.push({ pathname: "/courseView/" + course.docId });
      } catch (err) {
        console.error('⚠️ Eroare la deblocare cursuri anterioare:', err);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/gradient.png')}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Harta Cursurilor</Text>
          <Text style={styles.headerSubtitle}>Nivel {userDetail?.level || 1} • {userDetail?.rank}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(userDetail?.points % 100)}%` }]} />
          </View>
          <Text style={styles.pointsText}>
            {userDetail?.points || 0} puncte • {100 - (userDetail?.points % 100)} până la următorul nivel
          </Text>
        </View>

        <View style={styles.roadmapContainer}>
          <Svg height={courses.length * 250} width={screenWidth} style={{ transform: [{ rotate: '180deg' }] }}>
            <Path
              d={`M${screenWidth/2} 0 ${courses.map((_, i) => {
                const y = i * 250;
                const controlX = i % 2 ? screenWidth/2 + 120 : screenWidth/2 - 120;
                return `Q${controlX} ${y + 160} ${screenWidth/2} ${y + 250}`;
              }).join(' ')}`}
              fill="none"
              stroke={Colors.PRIMARY}
              strokeWidth={3}
              strokeDasharray="8,8"
              strokeLinecap="round"
            />
          </Svg>

          {courses.map((course, index) => {
            const isUnlocked = isCourseUnlocked(course.docId);
            const isCompleted = isCourseCompleted(course);
            const badgeIcon = getBadgeIcon(course.title);
            const isLeft = index % 2 === 0;
            const verticalPosition = (courses.length - 1 - index) * 250;

            return (
              <View
                key={course.docId}
                style={[
                  styles.courseNode,
                  {
                    top: verticalPosition,
                    left: isLeft ? 20 : screenWidth - 220,
                    opacity: isUnlocked || isCompleted ? 1 : 0.6,
                  }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.courseButton,
                    isCompleted ? styles.completed : isUnlocked ? styles.unlocked : styles.locked
                  ]}
                  onPress={() => handleCoursePress(course)}
                >
                  <View style={styles.courseContent}>
                    <View style={styles.courseHeader}>
                      <Text style={styles.courseTitle}>{course.title}</Text>
                      {badgeIcon && (
                        <View style={styles.badgeContainer}>
                          <Ionicons name={badgeIcon} size={24} color={Colors.WHITE} />
                        </View>
                      )}
                    </View>
                    <Text style={styles.courseDescription} numberOfLines={2}>
                      {course.description}
                    </Text>
                    <View style={styles.courseStatus}>
                      <Ionicons
                        name={isCompleted ? "checkmark-circle" : isUnlocked ? "lock-open" : "lock-closed"}
                        size={24}
                        color={Colors.WHITE}
                      />
                      <Text style={styles.statusText}>
                        {isCompleted ? "Completat" : isUnlocked ? "Deblocat" : "Blocat"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollContainer: {
    paddingTop: 50,
    paddingBottom: 100,
    minHeight: '100%',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 32,
    color: Colors.DARK_BLUE,
    marginBottom: 10,
  },
  headerSubtitle: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: Colors.GRAY,
    marginBottom: 15,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.PRIMARY,
  },
  pointsText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 8,
  },
  roadmapContainer: {
    position: 'relative',
    paddingBottom: 100,
  },
  courseNode: {
    position: 'absolute',
    width: 200,
  },
  courseButton: {
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  completed: {
    backgroundColor: Colors.SUCCESS,
    borderColor: '#388E3C',
    borderWidth: 1,
  },
  unlocked: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.SECONDARY,
    borderWidth: 1,
  },
  locked: {
    backgroundColor: Colors.GRAY,
    borderColor: '#757575',
    borderWidth: 1,
  },
  courseContent: {
    gap: 12,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: Colors.WHITE,
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  badgeContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  courseDescription: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.WHITE,
    opacity: 0.9,
    lineHeight: 20,
  },
  courseStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'outfit-bold',
    fontSize: 14,
    color: Colors.WHITE,
  },
});
