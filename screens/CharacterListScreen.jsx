import React, { useState, useEffect, useMemo } from "react";
import {
  NativeBaseProvider,
  FlatList,
  Box,
  Text,
  Pressable,
  Image,
  Center,
  Input,
  Icon,
} from "native-base";
import config from "../Common/Config";
import character from "../database/character.json";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import ExpoFastImage from "expo-fast-image";

export default function CharacterListScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState();
  const searchFilter = (text) => {
    if (text) {
      const newData = character.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(data);
      setSearch(text);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        navigation.navigate("QuoteListScreen", {
          name: item.name,
          uri: item.image,
        });
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
            flexDirection="row"
            alignItems="center"
            borderRadius="8"
            p="5"
            m="2"
            shadow="3"
          >
            {Platform.OS == "web" ? (
              <Image
                mt="5"
                size="lg"
                borderRadius="100"
                resizeMode="cover"
                source={{
                  uri: item.image,
                }}
                alt={item.name}
              />
            ) : (
              <ExpoFastImage
                uri={item.image}
                cacheKey={item.id}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
              />
            )}
            <Text ml="4" color="yellow.100" fontWeight="bold" fontSize={18}>
              {item.name}
            </Text>
          </Box>
        );
      }}
    </Pressable>
  );
  const memoizedValue = useMemo(() => renderItem, [data]);
  const filter = character.filter((obj, pos, character) => {
    return character.map((q) => q.name).indexOf(obj.name) == pos;
  });

  const d = [];

  useEffect(() => {
    filter.map((q) => {
      d.push(q);
    });
    setData(d);
    setFilteredData(d);
  }, []);

  return (
    <NativeBaseProvider config={config}>
      <FlatList
        numColumns="1"
        data={filteredData}
        renderItem={memoizedValue}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={
          <Center
            mx="2"
            mt={Platform.OS == "web" ? 4 : Constants.statusBarHeight - 1}
          >
            <Input
              value={search}
              onChangeText={(text) => searchFilter(text)}
              placeholder="Search By Character Name"
              variant="rounded"
              width="100%"
              bg="transparent"
              color="yellow.100"
              borderRadius="10"
              py="2"
              px="2"
              placeholderTextColor="yellow.100"
              InputLeftElement={
                <Icon
                  ml="2"
                  size="5"
                  color="yellow.100"
                  as={<Ionicons name="ios-search" />}
                />
              }
            />
          </Center>
        }
      />
    </NativeBaseProvider>
  );
}
