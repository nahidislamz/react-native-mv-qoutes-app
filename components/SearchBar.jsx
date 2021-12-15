import React from "react";
import { Input, Icon, Center } from "native-base";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function SearchBar({ text }) {
  return (
    <Center
      mx="2"
      mt={Platform.OS == "web" ? 4 : Constants.statusBarHeight - 1}
    >
      <Input
        value={search}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction("")}
        placeholder="Search"
        variant="filled"
        width="100%"
        bg="yellow.200"
        borderRadius="10"
        py="2"
        px="2"
        placeholderTextColor="gray.500"
        _hover={{ bg: "yellow.300", borderWidth: 0 }}
        borderWidth="0"
        _web={{
          _focus: { style: { boxShadow: "none" } },
        }}
        InputLeftElement={
          <Icon
            ml="2"
            size="5"
            color="gray.500"
            as={<Ionicons name="ios-search" />}
          />
        }
      />
    </Center>
  );
}
