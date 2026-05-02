import { styled } from "nativewind";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { usePostHog } from "posthog-react-native";

import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);
const Settings = () => {
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture("settings_viewed");
  }, [posthog]);

  return (
    <SafeAreaView>
      <Text>settings</Text>
    </SafeAreaView>
  );
};

export default Settings;
