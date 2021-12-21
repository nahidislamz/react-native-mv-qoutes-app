import React from "react";
import {
  Text,
  Box,
  VStack,
  Divider,
  Image,
  NativeBaseProvider,
} from "native-base";
import Button from "../components/Button";
import { Linking, Share } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

export default function AboutScreen() {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Download One Piece Quotes\n https://play.google.com/store/apps/details?id=net.nahidislam.onepiecequotes",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <NativeBaseProvider>
      <Box
        mt="6"
        bg="gray.800"
        color="gray.50"
        alignItems="center"
        border="1"
        borderRadius="md"
      >
        <VStack space="4" divider={<Divider />}>
          <Box alignItems="center" p="4">
            <Image
              size="md"
              rounded="100"
              source={require("../assets/icon.png")}
              alt="one_piece_logo"
            />
            <Text bold fontSize="20" textAlign="center" color="gray.50">
              One Piece Quotes
            </Text>
            <Divider />
            <Text textAlign="center" color="yellow.50">
              The only one piece quotes app you can find on play store. More
              than 1k Quotes
            </Text>
          </Box>
        </VStack>
      </Box>
      <Button
        icon="privacy-tip"
        text="Privacy Policy"
        onPress={() => {
          Linking.openURL(
            "https://pages.flycricket.io/one-piece-quotes/privacy.html"
          );
        }}
      />
      <Divider bg="gray.500" />
      <Button
        icon="policy"
        text="Terms and Condition"
        onPress={() => {
          Linking.openURL(
            "https://pages.flycricket.io/one-piece-quotes/terms.html"
          );
        }}
      />
      <Divider bg="gray.500" />
      <Button
        icon="share"
        text="Share"
        onPress={() => {
          onShare();
        }}
      />
      <Divider bg="gray.500" />
      <Box>
        <Text color="gray.50" py="4" px="3" bold>
          Developer Contact
        </Text>
        <Box flexDirection="row" px="3">
          <AntDesign
            size={30}
            color="#fff"
            name="earth"
            style={{ paddingHorizontal: 8 }}
            onPress={() => {
              Linking.openURL("https://nahidislam.net");
            }}
          />
          <AntDesign
            size={30}
            color="#fff"
            name="mail"
            style={{ paddingHorizontal: 8 }}
            onPress={() => {
              Linking.openURL("mailto:nahidislamz@outlook.com");
            }}
          />
          <MaterialIcons
            size={30}
            color="#fff"
            name="facebook"
            style={{ paddingHorizontal: 8 }}
            onPress={() => {
              Linking.openURL("https://facebook.com/nahidislamz");
            }}
          />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
