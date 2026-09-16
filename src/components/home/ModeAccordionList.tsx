import { GameMode } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronDown } from "lucide-react-native";
import { Dispatch, SetStateAction } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { homeStyles as styles } from "./home.styles";

type ModeAccordionListProps = {
  gameModes: GameMode[];
  openModeKey: string | null;
  playLabel: string;
  playersLabel: string;
  setOpenModeKey: Dispatch<SetStateAction<string | null>>;
  onSelectMode: (mode: GameMode) => void;
};

const ModeAccordionList = ({
  gameModes,
  openModeKey,
  playLabel,
  playersLabel,
  setOpenModeKey,
  onSelectMode,
}: ModeAccordionListProps) => (
  <ScrollView
    style={styles.scrollView}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
  >
    {gameModes.map((mode) => {
      const IconComponent = mode.icon;
      const isOpen = openModeKey === mode.key;

      return (
        <View key={mode.key} style={styles.gameModeCard}>
          <LinearGradient
            colors={mode.color}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity
              style={styles.cardHeader}
              activeOpacity={0.8}
              onPress={() =>
                setOpenModeKey((current) =>
                  current === mode.key ? null : mode.key,
                )
              }
            >
              <View style={styles.titleRow}>
                <IconComponent size={28} color="#FFFFFF" />
                <Text style={styles.cardTitle}>{mode.title}</Text>
              </View>
              <View style={styles.playersTag}>
                <Text style={styles.playersText}>
                  {mode.players} {playersLabel}
                </Text>
              </View>
              <ChevronDown
                size={22}
                color="#FFFFFF"
                style={[styles.dropdownIcon, isOpen && styles.dropdownIconOpen]}
              />
            </TouchableOpacity>

            {isOpen && (
              <View style={styles.dropdownBody}>
                <Text style={styles.cardDescription}>{mode.description}</Text>
                <TouchableOpacity
                  style={styles.selectModeButton}
                  activeOpacity={0.85}
                  onPress={() => onSelectMode(mode)}
                >
                  <Text style={styles.selectModeText}>{playLabel}</Text>
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>
        </View>
      );
    })}
  </ScrollView>
);

export default ModeAccordionList;
