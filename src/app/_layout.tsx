import { GameProvider } from "@/context/GameContext";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import i18n from "@/localization/i18n";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isReady = useFrameworkReady();

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <GameProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GameProvider>
    </I18nextProvider>
  );
}
