import { styled } from "nativewind";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { usePostHog } from "posthog-react-native";

import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);
const Insights = () => {
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture("insights_viewed");
  }, [posthog]);

  return (
    <SafeAreaView>
      <Text>insights</Text>
    </SafeAreaView>
  );
};

export default Insights;
