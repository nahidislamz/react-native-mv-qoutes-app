import React from "react";
import { Box, Text, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
export default function Button({ icon, text, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Box px="3" flexDirection="row" py="4">
        <MaterialIcons name={icon} size={24} color="white" />
        <Text bold fontSize="16" pl="2" color="gray.50">
          {text}
        </Text>
      </Box>
    </Pressable>
  );
}
