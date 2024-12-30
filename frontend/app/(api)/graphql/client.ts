import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { setContext } from "@apollo/client/link/context";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCAL_SYSTEM_IP_ADDRESS = "192.168.0.90"; //check your local IP
const PORT = "3000";

const httpLink = new HttpLink({
  uri: `http://${LOCAL_SYSTEM_IP_ADDRESS || "localhost"}:${PORT}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  let token;
  if (Platform.OS === "web") {
    token = await AsyncStorage.getItem("access_token");
  } else {
    token = await SecureStore.getItemAsync("access_token");
  }
  console.log("Token used for auth:", token);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
