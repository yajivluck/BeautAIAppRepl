import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the user is authenticated by checking the token in SecureStore
    const checkAuth = async () => {
      let token;
      if (Platform.OS === "web") {
        token = localStorage.getItem("access_token");
      } else {
        token = await SecureStore.getItemAsync("access_token");
      }

      // Check if token exists, then set the authentication state
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null; // You can return a loading spinner or similar while checking
  }

  return (
    <Redirect href={isAuthenticated ? "/(client)/(tabs)" : "/(auth)/welcome"} />
  );
};

export default App;
