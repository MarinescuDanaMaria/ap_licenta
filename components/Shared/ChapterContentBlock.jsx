// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { useState } from 'react';
// import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { getGeminiApiKey } from '../../config/apiKeys';
// import AnalogyModal from './AnalogyModal';

// // Inițializăm API-ul Gemini cu cheia din configurare
// const genAI = new GoogleGenerativeAI(getGeminiApiKey());

// export default function ChapterContentBlock({ title, content = '', children }) {
//   const [selectedText, setSelectedText] = useState('');
//   const [showAnalogyModal, setShowAnalogyModal] = useState(false);
//   const [analogy, setAnalogy] = useState('');
//   const [loading, setLoading] = useState(false);

//   const blocks = content.split('\n\n');

//   const isTable = (block) =>
//     block.includes('|') || block.includes(';') || (block.match(/\n/g) || []).length >= 2;

//   const handleTextSelection = (text) => {
//     if (text.trim()) {
//       setSelectedText(text.trim());
//       generateAnalogy(text.trim());
//     }
//   };

//   const generateAnalogy = async (text) => {
//     setShowAnalogyModal(true);
//     setLoading(true);
//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      
//       const prompt = `Generează o analogie simplă și ușor de înțeles pentru următorul concept din domeniul securității cibernetice: "${text}". 
//       Analogia ar trebui să fie relevantă și să ajute la înțelegerea conceptului. 
//       Răspunsul trebuie să fie scurt și concis, maxim 2-3 propoziții.`;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       setAnalogy(response.text());
//     } catch (error) {
//       console.error('Eroare la generarea analogiei:', error);
//       setAnalogy('Ne pare rău, nu am putut genera o analogie în acest moment. Vă rugăm să încercați din nou.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.block}>
//       {title && <Text style={styles.title}>{title}</Text>}

//       {blocks.map((block, idx) => {
//         if (isTable(block)) {
//           const rows = block.trim().split('\n');
//           const columns = rows.map((row) =>
//             row.includes('|') ? row.split('|') : row.split(';')
//           );

//           return (
//             <View key={idx} style={styles.tableContainer}>
//               {columns.map((cols, rowIndex) => (
//                 <View key={rowIndex} style={styles.tableRow}>
//                   {cols.map((cell, colIndex) => (
//                     <Text
//                       key={colIndex}
//                       style={[
//                         styles.tableCell,
//                         rowIndex === 0 ? styles.tableHeader : styles.tableData,
//                         colIndex === cols.length - 1 ? styles.noBorderRight : null,
//                       ]}
//                     >
//                       {cell.trim()}
//                     </Text>
//                   ))}
//                 </View>
//               ))}
//             </View>
//           );
//         }

//         // Împărțim textul în cuvinte pentru a permite selecția
//         const words = block.split(' ');
//         return (
//           <View key={idx} style={styles.paragraphContainer}>
//             {words.map((word, wordIndex) => (
//               <TouchableOpacity
//                 key={wordIndex}
//                 onPress={() => handleTextSelection(word)}
//                 style={styles.wordContainer}
//               >
//                 <Text style={styles.word}>{word} </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         );
//       })}

//       {children}

//       <AnalogyModal
//         visible={showAnalogyModal}
//         onClose={() => setShowAnalogyModal(false)}
//         analogy={analogy}
//         loading={loading}
//       />
//     </View>
//   );
// }

// const screenWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//   block: {
//     marginBottom: 20,
//   },
//   title: {
//     fontFamily: 'outfit-bold',
//     fontSize: 22,
//     marginBottom: 10,
//     color: '#000',
//   },
//   paragraphContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 10,
//   },
//   wordContainer: {
//     marginRight: 2,
//   },
//   word: {
//     fontFamily: 'outfit',
//     fontSize: 18,
//     color: '#333',
//     lineHeight: 26,
//   },
//   tableContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginBottom: 20,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     flexWrap: 'nowrap',
//   },
//   tableCell: {
//     flex: 1,
//     padding: 10,
//     borderRightWidth: 1,
//     borderColor: '#ccc',
//     textAlign: 'left',
//     fontSize: 14,
//   },
//   noBorderRight: {
//     borderRightWidth: 0,
//   },
//   tableHeader: {
//     backgroundColor: '#f0f0f0',
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   tableData: {
//     backgroundColor: '#fff',
//     color: '#000',
//   },
// });


//import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getOpenAiKey } from '../../config/openaiKey';
import AnalogyModal from './AnalogyModal';

// const configuration = new Configuration({
//   apiKey: getOpenAiKey(),
// });
// const openai = new OpenAIApi(configuration);

export default function ChapterContentBlock({ title, content = '', children }) {
  const [selectedText, setSelectedText] = useState('');
  const [showAnalogyModal, setShowAnalogyModal] = useState(false);
  const [analogy, setAnalogy] = useState('');
  const [loading, setLoading] = useState(false);

  const blocks = content.split('\n\n');

  const isTable = (block) =>
    block.includes('|') || block.includes(';') || (block.match(/\n/g) || []).length >= 2;

  const handleTextSelection = (text) => {
    if (text.trim()) {
      setSelectedText(text.trim());
      generateAnalogy(text.trim());
    }
  };

  // const generateAnalogy = async (text) => {  VARIANTA 1
  //   setShowAnalogyModal(true);
  //   setLoading(true);
  //   try {
  //     const prompt = `Generează o analogie simplă și ușor de înțeles pentru următorul concept din domeniul securității cibernetice: "${text}". 
  //     Analogia ar trebui să fie relevantă și să ajute la înțelegerea conceptului. 
  //     Răspunsul trebuie să fie scurt și concis, maxim 2-3 propoziții.`;

  //     const response = await openai.createChatCompletion({
  //       model: "gpt-3.5-turbo",
  //       messages: [{ role: "user", content: prompt }],
  //       temperature: 0.7,
  //     });

  //     const analogyText = response.data.choices[0].message.content.trim();
  //     setAnalogy(analogyText);
  //   } catch (error) {
  //     console.error('Eroare la generarea analogiei (OpenAI):', error);
  //     setAnalogy('Ne pare rău, nu am putut genera o analogie în acest moment. Încearcă din nou mai târziu.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };



//   const generateAnalogy = async (text) => {  VARIANTA 2 
//   setShowAnalogyModal(true);
//   setLoading(true);

//   try {
//     const prompt = `Generează o analogie simplă și ușor de înțeles pentru următorul concept din domeniul securității cibernetice: "${text}". 
//     Analogia ar trebui să fie relevantă și să ajute la înțelegerea conceptului. 
//     Răspunsul trebuie să fie scurt și concis, maxim 2-3 propoziții.`;

//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${getOpenAiKey()}`,
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: prompt }],
//         temperature: 0.7,
//       }),
//     });

//     const data = await response.json();
//     const analogyText = data.choices?.[0]?.message?.content?.trim() || 'Răspuns invalid de la AI.';
//     setAnalogy(analogyText);
//   } catch (error) {
//     console.error('Eroare la generarea analogiei (OpenAI):', error);
//     setAnalogy('Ne pare rău, nu am putut genera o analogie în acest moment.');
//   } finally {
//     setLoading(false);
//   }
// };

const generateAnalogy = async (text) => {
  setShowAnalogyModal(true);
  setLoading(true);

  try {
    const prompt = `Generează o analogie simplă și ușor de înțeles pentru următorul concept din domeniul securității cibernetice: "${text}". 
    Analogia ar trebui să fie relevantă și să ajute la înțelegerea conceptului. 
    Răspunsul trebuie să fie scurt și concis, maxim 2-3 propoziții.`;

    console.log('[generateAnalogy] Prompt trimis către OpenAI:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getOpenAiKey()}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('[generateAnalogy] Răspuns complet de la OpenAI:', data);

    const analogyText = data.choices?.[0]?.message?.content?.trim() || 'Răspuns invalid de la AI.';
    console.log('[generateAnalogy] Text extras:', analogyText);

    setAnalogy(analogyText);
  } catch (error) {
    console.error('[generateAnalogy] Eroare în fetch:', error);
    setAnalogy('Ne pare rău, nu am putut genera o analogie în acest moment.');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.block}>
      {title && <Text style={styles.title}>{title}</Text>}

      {blocks.map((block, idx) => {
        if (isTable(block)) {
          const rows = block.trim().split('\n');
          const columns = rows.map((row) =>
            row.includes('|') ? row.split('|') : row.split(';')
          );

          return (
            <View key={idx} style={styles.tableContainer}>
              {columns.map((cols, rowIndex) => (
                <View key={rowIndex} style={styles.tableRow}>
                  {cols.map((cell, colIndex) => (
                    <Text
                      key={colIndex}
                      style={[
                        styles.tableCell,
                        rowIndex === 0 ? styles.tableHeader : styles.tableData,
                        colIndex === cols.length - 1 ? styles.noBorderRight : null,
                      ]}
                    >
                      {cell.trim()}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          );
        }

        const words = block.split(' ');
        return (
          <View key={idx} style={styles.paragraphContainer}>
            {words.map((word, wordIndex) => (
              <TouchableOpacity
                key={wordIndex}
                onPress={() => handleTextSelection(word)}
                style={styles.wordContainer}
              >
                <Text style={styles.word}>{word} </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}

      {children}

      <AnalogyModal
        visible={showAnalogyModal}
        onClose={() => setShowAnalogyModal(false)}
        analogy={analogy}
        loading={loading}
      />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    marginBottom: 10,
    color: '#000',
  },
  paragraphContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  wordContainer: {
    marginRight: 2,
  },
  word: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: '#333',
    lineHeight: 26,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
    textAlign: 'left',
    fontSize: 14,
  },
  noBorderRight: {
    borderRightWidth: 0,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    color: '#000',
    fontWeight: 'bold',
  },
  tableData: {
    backgroundColor: '#fff',
    color: '#000',
  },
});

