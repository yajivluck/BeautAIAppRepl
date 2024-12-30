import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="beautyconsultationform"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="beautyconsultationrecommendations"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="providers/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
