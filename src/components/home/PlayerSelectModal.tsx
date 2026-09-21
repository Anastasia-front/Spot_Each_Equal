import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PlayerSelectModalProps = {
  continueLabel: string;
  playerOptions: number[];
  selectedPlayers: number;
  selectPlayersLabel: string;
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onSelectPlayers: (numPlayers: number) => void;
};

const PlayerSelectModal = ({
  continueLabel,
  playerOptions,
  selectedPlayers,
  selectPlayersLabel,
  visible,
  onClose,
  onConfirm,
  onSelectPlayers,
}: PlayerSelectModalProps) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity
      activeOpacity={1}
      style={styles.modalOverlay}
      onPress={onClose}
    >
      <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
        <TouchableOpacity
          accessibilityLabel="Close"
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>

        <Text style={styles.modalTitle}>{selectPlayersLabel}</Text>

        <View style={styles.playerOptions}>
          {playerOptions?.map((n) => (
            <TouchableOpacity
              key={n}
              style={[
                styles.playerButton,
                selectedPlayers === n && styles.selectedPlayerButton,
              ]}
              onPress={() => onSelectPlayers(n)}
            >
              <Text
                style={[
                  styles.playerButtonText,
                  selectedPlayers === n && styles.selectedPlayerText,
                ]}
              >
                {n}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.confirmButtonText}>{continueLabel}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 24,
    paddingTop: 54,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
  },
  closeButtonText: {
    color: "#667eea",
    fontSize: 24,
    fontFamily: "Inter-Bold",
    lineHeight: 28,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  playerOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  playerButton: {
    backgroundColor: "#667eea",
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
  selectedPlayerButton: {
    backgroundColor: "#764ba2",
  },
  playerButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
  selectedPlayerText: {
    color: "#FFD700",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
});

export default PlayerSelectModal;
