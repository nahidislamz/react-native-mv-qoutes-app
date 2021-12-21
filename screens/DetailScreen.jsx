import React from "react";
import {
  NativeBaseProvider,
  Center,
  Box,
  Image,
  Button,
  Divider,
  Text,
  ScrollView,
  useToast,
} from "native-base";
import { BANNER_ID, INTERSTITIAL_ID } from "../Common/Config";
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import { Share } from "react-native";
import Clipboard from "@react-native-community/clipboard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import character from "../database/character.json";

export default function DetailScreen({ route }) {
  const { name, quote } = route.params;
  let uri;
  character.map((m) => {
    if (name == m.name) {
      uri = m.image;
    }
  });
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
  const toast = useToast();
  return (
    <NativeBaseProvider>
      <ScrollView flex={1}>
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
            <Button
              size="sm"
              variant="subtle"
              mx="2"
              p="2"
              rounded="8"
              bg="yellow.300:alpha.70"
              onPress={() => {
                _openInterstitial();
                Clipboard.setString('"' + quote + '"' + "\n\n ~" + name);
                toast.show({
                  description: "Text Copied",
                });
              }}
            >
              <Ionicons name="copy" size={24} />
            </Button>
            <Button
              size="sm"
              variant="subtle"
              mx="2"
              p="2"
              rounded="8"
              bg="yellow.300:alpha.70"
              onPress={() => {
                onShare();
              }}
            >
              <Ionicons name="share-outline" size={24} />
            </Button>
          </Center>
          <Divider />
        </Box>
        <Center>
          <AdMobBanner bannerSize="mediumRectangle" adUnitID={BANNER_ID} />
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}
