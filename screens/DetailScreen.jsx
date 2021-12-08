import React from "react";
import { NativeBaseProvider } from "native-base";
import Details from "../components/Details";
import config from "../Common/Config";

export default function DetailScreen({ route }) {
  const { author, quote } = route.params;
  return (
    <NativeBaseProvider config={config}>
      <Details author={author} quote={quote} />
    </NativeBaseProvider>
  );
}
