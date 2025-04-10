import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { supabase } from '../supabaseClient';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const theme = useColorScheme() ?? "light";

  const fadeAnim = useState(new Animated.Value(0))[0];

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (user) {
        // Navigate to the home screen or dashboard
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error logging in:', error.message);
      } else {
        console.error('Error logging in:', error);
      }
      // Optionally, display an alert or message to the user
      if (error instanceof Error) {
        alert('Login failed: ' + error.message);
      } else {
        alert('Login failed: An unexpected error occurred');
      }
    }
  };

  const getBorderColor = (isFocused :boolean) => {
    if (isFocused) {
      return theme === "light" ? Colors.light.tint : Colors.dark.tint;
    }
    return theme === "light" ? "#e0e0e0" : "#333";
  };

  // Text colors based on theme
  const textColor = theme === "light" ? Colors.light.text : Colors.dark.text;
  const placeholderColor = theme === "light" ? "#aaa" : "#888";
  const inputBgColor = theme === "light" ? "#f8f8f8" : "#2a2a2a";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidView}
    >
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <ThemedView style={styles.content}>
          <ThemedView style={styles.logoContainer}>
            <IconSymbol
              name="star.fill"
              size={60}
              color={theme === "light" ? Colors.light.tint : Colors.dark.tint}
            />
            <ThemedText style={styles.appTitle} type="title">
              Rewards Hub
            </ThemedText>
          </ThemedView>

          <ThemedText style={styles.welcomeText} type="title">
            Welcome back
          </ThemedText>
          <ThemedText style={styles.subtitleText}>
            Sign in to continue
          </ThemedText>

          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Email</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  color: textColor,
                  borderColor: getBorderColor(isEmailFocused),
                  backgroundColor: inputBgColor,
                },
              ]}
              placeholder="Enter your email"
              placeholderTextColor={placeholderColor}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />

            <ThemedText style={[styles.inputLabel, { marginTop: 16 }]}>
              Password
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  color: textColor,
                  borderColor: getBorderColor(isPasswordFocused),
                  backgroundColor: inputBgColor,
                },
              ]}
              placeholder="Enter your password"
              placeholderTextColor={placeholderColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <ThemedText
                style={[
                  styles.forgotPasswordText,
                  {
                    color:
                      theme === "light" ? Colors.light.tint : Colors.dark.tint,
                  },
                ]}
              >
                Forgot password?
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    theme === "light" ? Colors.light.tint : Colors.dark.tint,
                },
              ]}
              onPress={handleLogin}
            >
              <ThemedText style={styles.buttonText}>Sign In</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={styles.signupContainer}>
            <ThemedText style={styles.signupText}>
              Don't have an account?{" "}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <ThemedText
                style={[
                  styles.signupLink,
                  {
                    color:
                      theme === "light" ? Colors.light.tint : Colors.dark.tint,
                  },
                ]}
              >
                Sign up
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  appTitle: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "700",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    opacity: 0.6,
    marginBottom: 36,
  },
  inputContainer: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: 12,
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "700",
  },
});
