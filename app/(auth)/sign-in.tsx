import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SigIn = () => {
  return (
    <View>
      <Text>SigIn</Text>
      <Link href="/(auth)/sign-up">Signup</Link>
    </View>
  );
};

export default SigIn;
