import { Link } from "expo-router";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import "../global.css";
const SafeAreaView = styled(RNSafeAreaView);
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <Link href="/(tabs)" className="mt-4 rounded bg-primary text-white p-4">
        tabs
      </Link>
    </SafeAreaView>
  );
}
