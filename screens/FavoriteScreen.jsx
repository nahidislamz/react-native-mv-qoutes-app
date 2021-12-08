import React, { useState } from "react";
import {
  NativeBaseProvider,
  FormControl,
  Input,
  Stack,
  Text,
  Box,
  Button,
  Center,
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import app from "../Firebase";

const db = getFirestore(app);

export default function FavoriteScreen() {
  const [quotes, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [isLoading, setLoading] = useState(false);

  const addData = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "quotes"), {
        quotes: quotes,
        author: author,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setQuote("");
    setAuthor("");
    setLoading(false);
  };

  return (
    <NativeBaseProvider>
      <KeyboardAwareScrollView
        style={{
          width: "100%",
        }}
      >
        <Stack
          space={2.5}
          alignSelf="center"
          px="4"
          safeArea
          mt="5"
          w={{
            base: "100%",
            md: "25%",
          }}
        >
          <Box>
            <Center>
              <Text bold fontSize="xl" mb="4">
                Add Quotes
              </Text>
            </Center>
            <FormControl mb="5">
              <FormControl.Label>Quotes</FormControl.Label>
              <Input
                size="2xl"
                isRequired
                variant="rounded"
                value={quotes}
                onChangeText={(text) => setQuote(text)}
              />
              <FormControl.HelperText>
                write your quotes here..
              </FormControl.HelperText>
            </FormControl>
            <FormControl mb="5">
              <FormControl.Label>Author</FormControl.Label>
              <Input
                variant="rounded"
                value={author}
                onChangeText={(text) => setAuthor(text)}
              />
              <FormControl.HelperText>
                author name here..
              </FormControl.HelperText>
            </FormControl>
          </Box>
          <Button
            onPress={addData}
            variant="subtle"
            isLoading={isLoading}
            isLoadingText="Saving"
            _loading={{
              bg: "yellow.400:alpha.70",
              _text: {
                color: "coolGray.700",
              },
            }}
            bg="green.400:alpha.70"
            _text={{
              color: "#fff",
            }}
            size="lg"
          >
            Save
          </Button>
        </Stack>
      </KeyboardAwareScrollView>
    </NativeBaseProvider>
  );
}
