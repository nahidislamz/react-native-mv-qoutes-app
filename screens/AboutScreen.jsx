import React from "react";
import { Center, Text, NativeBaseProvider } from "native-base";

export default function AboutScreen(props) {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Text fontSize="3xl" bold>
          About Screen
        </Text>
      </Center>
    </NativeBaseProvider>
  );
}
