import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PlayerSelectModalProps = {
  continueLabel: string;
  selectedPlayers: number;
  selectPlayersLabel: string;
  visible: boolean;
  onConfirm: () => void;
  onSelectPlayers: (numPlayers: number) => void;
};

const PlayerSelectModal = ({
  continueLabel,
  selectedPlayers,
  selectPlayersLabel,
  visible,
  onConfirm,
  onSelectPlayers,
}: PlayerSelectModalProps) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{selectPlayersLabel}</Text>

        <View style={styles.playerOptions}>
          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
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
      </View>
    </View>
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
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
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
