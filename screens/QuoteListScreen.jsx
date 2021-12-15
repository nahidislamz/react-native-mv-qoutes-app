import React, { useState, useEffect } from "react";
import { NativeBaseProvider, FlatList, Box, Image, Text } from "native-base";
import { Platform } from "react-native";
import Details from "../components/Details";
import config from "../Common/Config";
import animeQuotes from "../database/quotes.json";

export default function QuoteListScreen({ route }) {
  const [data, setData] = useState();
  const { name, uri } = route.params;
  const d = [];
  animeQuotes.map((q) => {
    if (name == q.name) {
      d.push(q);
    }
  });

  useEffect(() => {
    setData(d);
  }, []);

  return (
    <NativeBaseProvider config={config}>
      <FlatList
        numColumns={Platform.OS == "web" ? 1 : 1}
        data={data}
        renderItem={({ item: { quote, name } }) => (
          <Details name={name} quote={quote} />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <Box bg="#ffbf17" alignItems="center">
            <Image
              mt="5"
              size="md"
              resizeMode="cover"
              rounded="100"
              source={{
                uri: uri,
              }}
              alt={name}
            />
            <Text mb="5" p="2" color="yellow.100" bold fontSize="18">
              {name}
            </Text>
          </Box>
        )}
        stickyHeaderIndices={[0]}
      />
    </NativeBaseProvider>
  );
}
