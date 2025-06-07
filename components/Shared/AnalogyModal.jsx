import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function AnalogyModal({ visible, onClose, analogy, loading }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Analogia generată</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Colors.GRAY} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.analogyContainer}>
            {loading ? (
              <Text style={styles.loadingText}>Se generează analogia...</Text>
            ) : (
              <Text style={styles.analogyText}>{analogy}</Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 500,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: Colors.DARK_BLUE,
  },
  closeButton: {
    padding: 5,
  },
  analogyContainer: {
    backgroundColor: Colors.BG_GRAY,
    padding: 15,
    borderRadius: 10,
    minHeight: 100,
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: 'center',
  },
  analogyText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.DARK_BLUE,
    lineHeight: 24,
  },
}); 