import React from "react";
import { Center, Text, Box, HStack, Spacer } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Details({ key, author, quote }) {
  return (
    <Center flex={1}>
      <Box
        bg={{
          linearGradient: {
            colors: ["lightBlue.500", "violet.800"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        m="2"
        p="5"
        rounded="8"
        key={key}
      >
        <Center>
          <MaterialCommunityIcons
            name="comment-quote"
            size={34}
            color="white"
          />
        </Center>
        <Text color="amber.50" mt="3" fontWeight="medium" fontSize={20} italic>
          {'"' + quote + '"'}
        </Text>
        <HStack alignItems="flex-start">
          <Text fontSize={12} color="amber.50" mt="4" bold fontWeight="medium">
            {"~ " + author}
          </Text>
          <Spacer />
        </HStack>
      </Box>
    </Center>
  );
}
