import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import AboutScreen from "./screens/AboutScreen";
import React from "react";
import { LogBox } from "react-native";

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
          title: "Quotes",
          headerStyle: {
            backgroundColor: "tomato",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Ionicons
              onPress={() => alert("This is a button!")}
              name="add"
              color="#fff"
              size={30}
            />
          ),
        }}
      />
      <NavStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={({ route }) => ({ title: "Quotes By " + route.params.author })}
      />
    </NavStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: "absolute",
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 16,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Favorite") {
              iconName = focused ? "heart-sharp" : "heart-outline";
            } else if (route.name === "About") {
              iconName = focused
                ? "ios-information-circle-sharp"
                : "ios-information-circle-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={StackHomeScreen} />
        <Tab.Screen name="Favorite" component={FavoriteScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
