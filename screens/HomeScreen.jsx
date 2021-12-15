import React, { useState, useEffect, useMemo } from "react";
import {
  NativeBaseProvider,
  FlatList,
  Box,
  Text,
  Pressable,
  Center,
} from "native-base";
import config from "../Common/Config";
import quotes from "../database/quotes.json";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        navigation.push("DetailScreen", { quote: item.quote, name: item.name });
      }}
    >
      {({ isHovered, isPressed }) => {
        return (
          <Box
            bg={
              isPressed
                ? "yellow.500"
                : isHovered
                ? "yellow.200:alpha.70"
                : "gray.700"
            }
            p="5"
            rounded="8"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.99 : 1,
                },
              ],
            }}
            borderRadius="8"
            p="5"
            m="2"
            bg="gray.800"
            shadow="3"
          >
            <Center>
              <MaterialCommunityIcons
                name="comment-quote"
                size={34}
                color="#ffbf17"
              />
            </Center>
            <Text
              color="yellow.100"
              mt="3"
              fontWeight="bold"
              fontSize={20}
              italic
            >
              {'"' + item.quote + '"'}
            </Text>
            <Text
              fontSize={14}
              color="yellow.100"
              mt="4"
              mx="4"
              bold
              fontWeight="medium"
              alignItems="flex-end"
              textAlign="right"
            >
              {"~ " + item.name}
            </Text>
          </Box>
        );
      }}
    </Pressable>
  );
  const memoizedValue = useMemo(() => renderItem, [data]);

  useEffect(() => {
    setData(quotes);
  }, []);

  return (
    <NativeBaseProvider config={config}>
      <FlatList
        numColumns={Platform.OS == "web" ? 1 : 1}
        data={data}
        renderItem={memoizedValue}
        keyExtractor={(item, index) => index}
      />
    </NativeBaseProvider>
  );
}
