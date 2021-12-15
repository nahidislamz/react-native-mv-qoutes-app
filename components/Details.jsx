import React from "react";
import { Center, Text, Box, Divider, Pressable, Image } from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Details({ name, quote }) {
  return (
    <Center flex={1}>
      <Box p="5" borderTopLeftRadius="2xl" borderTopRightRadius="2xl">
        <Center>
          <MaterialCommunityIcons
            name="comment-quote"
            size={34}
            color="#ffbf17"
          />
        </Center>
        <Text color="yellow.100" mt="3" fontWeight="bold" fontSize={20} italic>
          {'"' + quote + '"'}
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
          {"~ " + name}
        </Text>
        <Center p="4" flexDirection="row">
          <Pressable
            mx="2"
            p="2"
            rounded="8"
            bg="yellow.50:alpha.70"
            onPress={() => {
              alert("text copied");
            }}
          >
            <Ionicons name="copy" size={24} />
          </Pressable>
          <Pressable
            mx="2"
            p="2"
            rounded="8"
            bg="yellow.50:alpha.70"
            onPress={() => {
              alert("text copied");
            }}
          >
            <Ionicons name="share-outline" size={24} />
          </Pressable>
        </Center>
        <Divider />
      </Box>
    </Center>
  );
}
