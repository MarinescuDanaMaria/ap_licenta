import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Button from '../../components/Shared/Button';
import ChapterContentBlock from '../../components/Shared/ChapterContentBlock';
import { db } from '../../config/firebaseConfig';
import Colors from '../../constants/Colors';
import { UserDetailContext } from '../../context/UserDetailContext';


import { useRef } from 'react';


export default function ChapterView() {
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
  const chapter = JSON.parse(chapterParams);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const scrollRef = useRef(null); 
  const [currentPage, setCurrentPage] = useState(0); 

  const goToNextPage = () => {
    setCurrentPage(prev => prev + 1);
    scrollRef.current?.scrollTo({ y: 0, animated: true }); 
  };

  const GetProgress = () => {
    const total = chapter?.subsections?.length || 1;
    return currentPage / total;
  };


  const onChapterComplete = async () => {
  setLoader(true);
  try {
    const currentChapters = userDetail.startedCourses[docId]?.completedChapters || [];

    // Convertim la string toate valorile pentru a evita duplicate cauzate de tipuri diferite (ex: "0" vs 0)
    const stringified = currentChapters.map(String);

    if (stringified.includes(String(chapterIndex))) {
      router.replace('/courseView/' + docId);
      return;
    }

    const updatedCompleted = [...stringified, String(chapterIndex)];

    const userRef = doc(db, 'users', userDetail.uid);
    const updatedStartedCourses = {
      ...userDetail.startedCourses,
      [docId]: {
        completedChapters: updatedCompleted,
      },
    };

    await updateDoc(userRef, {
      startedCourses: updatedStartedCourses,
    });

    setUserDetail({
      ...userDetail,
      startedCourses: updatedStartedCourses,
    });

    router.replace('/courseView/' + docId);
  } catch (error) {
    console.error('Error updating chapter completion:', error);
  } finally {
    setLoader(false);
  }
};


  const subsection = chapter?.subsections?.[currentPage];

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <Progress.Bar
        progress={GetProgress()}
        width={Dimensions.get('screen').width * 0.85}
      />

      <View style={styles.content}>
        {/* <Text style={styles.topic}>{subsection?.name}</Text>
        <Text style={styles.explain}>{subsection?.content}</Text> */}

        <ChapterContentBlock
  title={subsection?.name}
  content={subsection?.content}
/>

        {/* {subsection?.content && (
  <Markdown>{subsection.content}</Markdown>
)} */}

{/* După markdown – tabel custom */}   
<View style={styles.table}>
  <View style={styles.tableRow}>
    <Text style={styles.tableHeader}>Tip atac</Text>
    <Text style={styles.tableHeader}>Țintă</Text>
    <Text style={styles.tableHeader}>Descriere</Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>PoS</Text>
    <Text style={styles.tableCell}>Magazine</Text>
    <Text style={styles.tableCell}>Fură date carduri</Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Sănătate</Text>
    <Text style={styles.tableCell}>Spitale</Text>
    <Text style={styles.tableCell}>Furt identitate/fraudă</Text>
  </View>
  {/* și celelalte */}
</View>
<View style={styles.table}>
  <View style={styles.tableRow}>
    <Text style={styles.tableHeader}>Organizație</Text>
    <Text style={styles.tableHeader}> Breșă de securitate </Text>
    <Text style={styles.tableHeader}>Identități expuse</Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Oficiul Management Personal</Text>
    <Text style={styles.tableCell}>Date angajați și performanță expuse; posibil și date financiare </Text>
    <Text style={styles.tableCell}>4.000.000</Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>CareFirst BlueCross </Text>
    <Text style={styles.tableCell}> Expunere nume, naștere, email, ID-uri asigurare</Text>
    <Text style={styles.tableCell}>1.100.000</Text>
  </View>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Penn State - Inginerie</Text>
    <Text style={styles.tableCell}> Atacatori au accesat date sensibile ale studenților și personalului </Text>
    <Text style={styles.tableCell}>18.000</Text>
  </View>
   <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Salley Beauty </Text>
    <Text style={styles.tableCell}>Atac asupra cardurilor de plată în magazine</Text>
    <Text style={styles.tableCell}>Necunoscut</Text>
  </View>
   <View style={styles.tableRow}>
    <Text style={styles.tableCell}>AT&T</Text>
    <Text style={styles.tableCell}> Date clienți furate de angajați și revândute</Text>
    <Text style={styles.tableCell}> 280.000</Text>
  </View>
    <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Anthem BlueCross</Text>
    <Text style={styles.tableCell}>Furt date medicale și financiare nedetectat 10 luni </Text>
    <Text style={styles.tableCell}>80.000.000</Text>
  </View>
  {/* și celelalte */}
</View>

        {/* {subsection?.code && (
          <Text style={[styles.codeExampleText, styles.codeDark]}>
            {subsection.code}
          </Text>
        )}
        {subsection?.example && (
          <Text style={styles.codeExampleText}>{subsection.example}</Text>
        )} */}

        <View style={{ marginTop: 25 }}>
          {currentPage < (chapter?.subsections?.length || 0) - 1 ? (
            <Button text="Înainte" onPress={goToNextPage}/>
          ) : (
            <Button text="Finalizează" onPress={onChapterComplete} loading={loader} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: Platform.OS === 'ios' ? 55 : 25,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  content: {
    marginTop: 20,
  },
  topic: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    color: 'black',
  },
  explain: {
    fontFamily: 'outfit',
    fontSize: 20,
    marginTop: 7,
    color: 'black',
  },
  codeExampleText: {
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: 'outfit',
    fontSize: 18,
    marginTop: 15,
    color: 'black',
  },
  codeDark: {
    backgroundColor: '#1D1D1D',
    color: Colors.WHITE,
  },
  table: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  marginTop: 20,
},
tableRow: {
  flexDirection: 'row',
},
tableHeader: {
  flex: 1,
  padding: 8,
  fontWeight: 'bold',
  backgroundColor: '#f0f0f0',
  borderRightWidth: 1,
  borderColor: '#ccc',
},
tableCell: {
  flex: 1,
  padding: 8,
  borderRightWidth: 1,
  borderColor: '#ccc',
},

});