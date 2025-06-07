import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getOpenAiKey } from '../../config/openaiKey';
import AnalogyModal from './AnalogyModal';

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

  const renderParagraphCard = (paragraph, index) => {
    const words = paragraph.split(' ');
    return (
      <View key={index} style={styles.paragraphCard}>
        <View style={styles.paragraphContainer}>
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
      </View>
    );
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

        // Render each paragraph as a separate card
        return renderParagraphCard(block.trim(), idx);
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
    marginBottom: 15,
    color: '#000',
  },
  paragraphCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#344CB7',
  },
  paragraphContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordContainer: {
    marginRight: 2,
  },
  word: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  tableCell: {
    flex: 1,
    padding: 12,
    borderRightWidth: 1,
    borderColor: '#ddd',
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'outfit',
  },
  noBorderRight: {
    borderRightWidth: 0,
  },
  tableHeader: {
    backgroundColor: '#344CB7',
    color: '#fff',
    fontFamily: 'outfit-bold',
    fontWeight: 'bold',
  },
  tableData: {
    backgroundColor: '#fff',
    color: '#333',
  },
});