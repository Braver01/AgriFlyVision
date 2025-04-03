import { View, Text , StyleSheet, Image, TextInput, TouchableOpacity} from "react-native";
import { useState , useEffect } from "react";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from "react-native";
import { ImageBackground } from "react-native";
import WebView from "react-native-webview";
export default function Main(){
  
    return(
      <View>
        <Text>花期地图</Text>
        <WebView
      source={{
        uri: `https://uri.amap.com/marker?position=116.473168,39.993015&name=北京&src=yourAppName&callnative=0`,
      }}
      style={{ flex: 1 }}
    />
      </View>
    )
}
