import { Link } from "expo-router";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
const SafeAreaView = styled(RNSafeAreaView);
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind..!
      </Text>
      <Link
        href="/onboarding"
        className="mt-4 rounded bg-primary text-white p-4"
      >
        Go To onboarding ..|
      </Link>
      <Link
        href="/(auth)/sign-in"
        className="mt-4 rounded bg-primary text-white p-4"
      >
        Go To Sign in ... |
      </Link>
      <Link
        href="/(auth)/sign-up"
        className="mt-4 rounded bg-primary text-white p-4"
      >
        Go To SingUp..
      </Link>

      <Link href={"/subscriptions/jiofy" as any}>jiofy subscription</Link>
      <Link href="/(tabs)" className="mt-4 rounded bg-primary text-white p-4">
        tabs
      </Link>

      <Link
        href={{
          pathname: "/subscriptions/[id]",
          params: { id: "Claude" },
        }}
      >
        calude subscription
      </Link>
    </SafeAreaView>
  );
}
