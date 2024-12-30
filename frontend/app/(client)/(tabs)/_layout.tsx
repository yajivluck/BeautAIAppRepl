import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { TAB_BAR_HEIGHT } from "@/constants/Layout";

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
          height: TAB_BAR_HEIGHT,
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
            tint="light"
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
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={focused ? "black" : "gray"}
                size={24}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="beautyconsultation"
        options={{
          title: "Beauty Consultation",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 56,
                width: 56,
                borderRadius: 999,
                backgroundColor: "black",
                marginBottom: 26,
              }}
            >
              <Image source={require("@/assets/images/face_cam_btn.png")} />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent default navigation behavior
            router.replace("/beautyconsultation"); // Reset the stack and navigate to the root screen of the Profile tab
          },
        }}
      />

      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <MaterialIcons
                name="list-alt"
                size={24}
                color={focused ? "black" : "gray"}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent default navigation behavior
            router.replace("/community"); // Reset the stack and navigate to the root screen of the Profile tab
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? "black" : "gray"}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/profile");
          },
        }}
      />
    </Tabs>
  );
}
