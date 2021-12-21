import React, { useState, useEffect } from "react";
import {
  NativeBaseProvider,
  FlatList,
  Box,
  Image,
  Text,
  Center,
} from "native-base";
import { Platform } from "react-native";
import Details from "../components/Details";
import config from "../Common/Config";
import animeQuotes from "../database/quotes.json";
import { BANNER_ID } from "../Common/Config";
import { AdMobBanner } from "expo-ads-admob";

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
          <Box
            pt="5"
            rounded="8"
            bg={{
              linearGradient: {
                colors: ["#ffbf17", "yellow.300"],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            alignItems="center"
          >
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
            <Text mb="5" p="2" color="yellow.100" bold fontSize="22">
              {name}
            </Text>
          </Box>
        )}
        stickyHeaderIndices={[0]}
        ListFooterComponent={
          <Center>
            <AdMobBanner bannerSize="mediumRectangle" adUnitID={BANNER_ID} />
          </Center>
        }
      />
    </NativeBaseProvider>
  );
}
