import React, { useState, useEffect } from "react";
import {
  NativeBaseProvider,
  Center,
  Box,
  Image,
  Pressable,
  Divider,
  Text,
} from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import character from "../database/character.json";

export default function DetailScreen({ route }) {
  const { name, quote } = route.params;
  //const [url, setUrl] = useState();
  let uri;
  character.map((m) => {
    if (name == m.name) {
      uri = m.image;
    }
  });
  console.log(uri.toString());

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Box p="5">
          <Center>
            <Image
              rounded="2"
              size="xl"
              source={{
                uri: uri,
              }}
              resizeMode="cover"
              fallbackSource={{
                uri: "https://static.tvtropes.org/pmwiki/pub/images/straw_hat_pirates_jolly_roger.png",
              }}
              alt={name}
              mb="4"
            />
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
    </NativeBaseProvider>
  );
}
