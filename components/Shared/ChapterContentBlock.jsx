import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function ChapterContentBlock({ title, content = '', children }) {
  const blocks = content.split('\n\n');

  const isTable = (block) =>
    block.includes('|') || block.includes(';') || (block.match(/\n/g) || []).length >= 2;

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

        return (
          <Text key={idx} style={styles.paragraph}>
            {block}
          </Text>
        );
      })}

      {children}
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
  paragraph: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
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
