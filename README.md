# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter, type Href } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import {
KeyboardAvoidingView,
Platform,
Pressable,
ScrollView,
Text,
TextInput,
View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const SignUp = () => {
const { signUp, errors, fetchStatus } = useSignUp();
const { isSignedIn } = useAuth();
const router = useRouter();

// ✅ NEW: name state
const [firstName, setFirstName] = useState("");

const [emailAddress, setEmailAddress] = useState("");
const [password, setPassword] = useState("");
const [code, setCode] = useState("");

const [emailTouched, setEmailTouched] = useState(false);
const [passwordTouched, setPasswordTouched] = useState(false);

const emailValid =
emailAddress.length === 0 ||
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);

const passwordValid = password.length === 0 || password.length >= 8;

const formValid =
firstName.length > 0 &&
emailAddress.length > 0 &&
password.length >= 8 &&
emailValid;

// ✅ UPDATED SIGNUP
const handleSubmit = async () => {
if (!formValid) return;

    const { error } = await signUp.create({
      emailAddress,
      password,
      firstName, // 🔥 important
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    await signUp.verifications.sendEmailCode();

};

const handleVerify = async () => {
await signUp.verifications.verifyEmailCode({
code,
});

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return;

          const url = decorateUrl("/(tabs)");
          router.replace(url as Href);
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }

};

if (signUp.status === "complete" || isSignedIn) {
return null;
}

// ✅ VERIFY SCREEN
if (
signUp.status === "missing_requirements" &&
signUp.unverifiedFields.includes("email_address") &&
signUp.missingFields.length === 0
) {
return (
<SafeAreaView className="auth-safe-area">
<KeyboardAvoidingView
behavior={Platform.OS === "ios" ? "padding" : "height"}
className="auth-screen" >
<ScrollView className="auth-scroll">
<View className="auth-content">
{/_ Branding _/}
<View className="auth-brand-block">
<View className="auth-logo-wrap">
<View className="auth-logo-mark">
<Text className="auth-logo-mark-text">S</Text>
</View>
<View>
<Text className="auth-wordmark">SpendFlow</Text>
<Text className="auth-wordmark-sub">SUBSCRIPTIONS</Text>
</View>
</View>

                <Text className="auth-title">Verify your email</Text>
                <Text className="auth-subtitle">
                  We sent a code to {emailAddress}
                </Text>
              </View>

              {/* Form */}
              <View className="auth-card">
                <TextInput
                  className="auth-input"
                  value={code}
                  placeholder="Enter code"
                  onChangeText={setCode}
                  keyboardType="number-pad"
                />

                <Pressable className="auth-button" onPress={handleVerify}>
                  <Text className="auth-button-text">Verify</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );

}

// ✅ MAIN SIGNUP
return (
<SafeAreaView className="auth-safe-area">
<KeyboardAvoidingView
behavior={Platform.OS === "ios" ? "padding" : "height"}
className="auth-screen" >
<ScrollView className="auth-scroll">
<View className="auth-content">
{/_ Branding _/}
<View className="auth-brand-block">
<Text className="auth-title">Create your account</Text>
<Text className="auth-subtitle">
Track your subscriptions easily
</Text>
</View>

            {/* Form */}
            <View className="auth-card">
              {/* ✅ NAME FIELD */}
              <Text className="auth-label">Full Name</Text>
              <TextInput
                className="auth-input"
                value={firstName}
                placeholder="Enter your name"
                onChangeText={setFirstName}
              />

              {/* EMAIL */}
              <Text className="auth-label">Email</Text>
              <TextInput
                className="auth-input"
                value={emailAddress}
                onChangeText={setEmailAddress}
                keyboardType="email-address"
              />

              {/* PASSWORD */}
              <Text className="auth-label">Password</Text>
              <TextInput
                className="auth-input"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
              />

              <Pressable className="auth-button" onPress={handleSubmit}>
                <Text className="auth-button-text">Create Account</Text>
              </Pressable>
            </View>

            <Link href="/(auth)/sign-in">
              <Text>Already have an account? Sign in</Text>
            </Link>

            <View nativeID="clerk-captcha" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

);
};

export default SignUp;
