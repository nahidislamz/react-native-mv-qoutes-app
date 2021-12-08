import React from "react";
import { Pressable, Text, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import app from "../Firebase";

const db = getFirestore(app);

export default function Card({
  id,
  navigation,
  screen,
  quotes,
  authors,
  color,
}) {
  const onPress = () => {
    if (!screen == "")
      navigation.navigate(screen, {
        quote: quotes,
        author: authors,
      });
  };
  const deleteQuote = async () => {
    console.log(id + " --deleted");
    await deleteDoc(doc(db, "quotes", id));
  };

  return (
    <Pressable onPress={onPress}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        m="2"
        p="5"
        rounded="8"
        bg={{
          linearGradient: {
            colors: ["lightBlue.500", "violet.800"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        <Text color={color} fontWeight="bold" fontSize={20}>
          {quotes}
        </Text>

        <Pressable onPress={deleteQuote}>
          <Ionicons size={24} name="trash-bin" color="white" />
        </Pressable>
      </Box>
    </Pressable>
  );
}
