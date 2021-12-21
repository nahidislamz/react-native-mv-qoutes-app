import React from "react";
import { Center, Text, Box, Divider, Button, useToast } from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Clipboard from "@react-native-community/clipboard";
import { Share } from "react-native";
import { AdMobInterstitial } from "expo-ads-admob";
import { INTERSTITIAL_ID } from "../Common/Config";
export default function Details({ name, quote }) {
  const toast = useToast();
  Platform.OS == "android"
    ? AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID)
    : null;

  const _openInterstitial = async () => {
    try {
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.error(error);
    }
  };
  const onShare = async () => {
    _openInterstitial();
    try {
      const result = await Share.share({
        message: '"' + quote + '"' + "\n\n ~" + name,
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
    <Center flex={1}>
      <Box p="5" borderTopLeftRadius="2xl" borderTopRightRadius="2xl">
        <Center>
          <MaterialCommunityIcons
            name="comment-quote"
            size={34}
            color="#ffbf17"
          />
        </Center>
        <Text color="yellow.100" mt="3" fontWeight="bold" fontSize={20} italic>
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
          <Button
            size="sm"
            variant="subtle"
            mx="2"
            p="2"
            rounded="8"
            bg="yellow.50:alpha.70"
            onPress={() => {
              _openInterstitial();
              Clipboard.setString('"' + quote + '"' + "\n\n ~" + name);
              toast.show({
                description: "Text Copied",
              });
            }}
          >
            <Ionicons name="copy" size={20} />
          </Button>
          <Button
            size="sm"
            variant="subtle"
            mx="2"
            p="2"
            rounded="8"
            bg="yellow.50:alpha.70"
            onPress={() => {
              onShare();
            }}
          >
            <Ionicons name="share-outline" size={20} />
          </Button>
        </Center>
        <Divider />
      </Box>
    </Center>
  );
}
