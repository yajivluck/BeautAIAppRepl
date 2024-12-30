import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 56,
          elevation: 0,
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
        },

        tabBarBackground: () => (
          <BlurView
            style={{
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            intensity={100} // Adjust blur intensity as needed
            tint="light" // Options: "light", "dark", or "default"
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "black" : "gray"}
                size={24}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Ionicons
                name={focused ? "calendar-sharp" : "calendar-outline"}
                color={focused ? "black" : "gray"}
                size={24}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="allclients"
        options={{
          title: "All Clients",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Ionicons
                name={focused ? "people" : "people-outline"}
                color={focused ? "black" : "gray"}
                size={24}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="leads"
        options={{
          title: "Leads",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Ionicons
                name={focused ? "person-add" : "person-add-outline"}
                color={focused ? "black" : "gray"}
                size={24}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Ionicons
                name={focused ? "analytics" : "analytics-outline"}
                color={focused ? "black" : "gray"}
                size={24}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
