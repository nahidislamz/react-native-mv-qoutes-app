import React, { useState, useEffect } from "react";
import { NativeBaseProvider, FlatList, Spinner, Center } from "native-base";
import Card from "../components/Card";
import config from "../Common/Config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import app from "../Firebase";

const db = getFirestore(app);

export default function HomeScreen({ navigation }) {
  const [getQuote, setQuotes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getQuotesData = async () => {
    const data = [];
    const querySnapshot = await getDocs(collection(db, "quotes"));
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        quotes: doc.data().quotes,
        author: doc.data().author,
      });
    });
    setQuotes(data);
    setLoading(false);
  };

  useEffect(() => {
    getQuotesData();
  });

  return (
    <NativeBaseProvider config={config}>
      {isLoading ? (
        <Center flex={1} alignItems="center">
          <Spinner color="blue.800" size="lg" />
        </Center>
      ) : (
        <FlatList
          data={getQuote}
          renderItem={({ item: { id, quotes, author }, key }) => (
            <Card
              id={id}
              key={key}
              navigation={navigation}
              screen="DetailScreen"
              authors={author}
              quotes={quotes}
              color="violet.50"
            />
          )}
          keyExtractor={(item) => item.key}
        />
      )}
    </NativeBaseProvider>
  );
}
