import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { ApolloProvider } from '@apollo/client';
import client from '@/app/(api)/graphql/client'; // Adjust the path to where your client is defined
import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    InstrumentSans: require("@/assets/fonts/InstrumentSans/InstrumentSans-Regular.ttf"),
    InstrumentSansSemiBold: require("@/assets/fonts/InstrumentSans/InstrumentSans-SemiBold.ttf"),
    InstrumentSansBold: require("@/assets/fonts/InstrumentSans/InstrumentSans-Bold.ttf"),
    SourceSansPro: require("@/assets/fonts/SourceSansPro/SourceCodePro-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* Main tabs (index.tsx) */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(client)" options={{ headerShown: false }} />
          <Stack.Screen name="(business)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        {/* Set status bar styling */}
        <StatusBar style={colorScheme === "dark" ? "dark" : "light"} />
      </ThemeProvider>
    </ApolloProvider>

  );
}
