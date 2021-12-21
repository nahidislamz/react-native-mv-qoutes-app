import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import AboutScreen from "./screens/AboutScreen";
import QuoteListScreen from "./screens/QuoteListScreen";
import CharacterListScreen from "./screens/CharacterListScreen";
import React from "react";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
LogBox.ignoreLogs(["Setting a timer"]);

const NavStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackHomeScreen = () => {
  return (
    <NavStack.Navigator>
      <NavStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Random Quotes",
          headerTintColor: "#fef08a",
          headerTitleAlign: "center",

          headerRight: () => {
            <Ionicons name="shuffle" size={24} color="#fef08a" />;
          },
        }}
      />
      <NavStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={({ route }) => ({
          title: "Quotes By " + route.params.name,
        })}
      />
    </NavStack.Navigator>
  );
};
const StackCharacterScreen = () => {
  return (
    <NavStack.Navigator>
      <NavStack.Screen
        name="CharacterListScreen"
        component={CharacterListScreen}
        options={() => ({
          title: "Browse By Characters ",
          headerTintColor: "#fef08a",
        })}
      />
      <NavStack.Screen
        name="QuoteListScreen"
        component={QuoteListScreen}
        options={({ navigation }) => ({
          title: "",
          headerTransparent: true,
        })}
      />
      <NavStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={({ route }) => ({
          title: "Quotes By " + route.params.name,
        })}
      />
    </NavStack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "shuffle-sharp" : "shuffle-outline";
            } else if (route.name === "Characters") {
              iconName = focused
                ? "people-circle-sharp"
                : "people-circle-outline";
            } else if (route.name === "About") {
              iconName = focused
                ? "ios-information-circle-sharp"
                : "ios-information-circle-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffbf17",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={StackHomeScreen} />
        <Tab.Screen name="Characters" component={StackCharacterScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
