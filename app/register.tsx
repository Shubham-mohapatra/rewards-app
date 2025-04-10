import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { supabase } from '../supabaseClient';

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useColorScheme() ?? "light";

  const handleRegister = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (user) {
        console.log('User registered successfully:', user);
        // Optionally, navigate to another screen or show a success message
        
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error signing up:', error.message);
      } else {
        console.error('Error signing up:', String(error));
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logoContainer}>
        <IconSymbol
          name="star.fill"
          size={80}
          color={theme === "light" ? Colors.light.tint : Colors.dark.tint}
        />
        <ThemedText type="title">Create Account</ThemedText>
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { color: theme === "light" ? Colors.light.text : Colors.dark.text },
          ]}
          placeholder="Full Name"
          placeholderTextColor={theme === "light" ? "#888" : "#aaa"}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[
            styles.input,
            { color: theme === "light" ? Colors.light.text : Colors.dark.text },
          ]}
          placeholder="Email"
          placeholderTextColor={theme === "light" ? "#888" : "#aaa"}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={[
            styles.input,
            { color: theme === "light" ? Colors.light.text : Colors.dark.text },
          ]}
          placeholder="Password"
          placeholderTextColor={theme === "light" ? "#888" : "#aaa"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                theme === "light" ? Colors.light.tint : Colors.dark.tint,
            },
          ]}
          onPress={handleRegister}
        >
          <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.loginContainer}>
        <ThemedText style={styles.loginText}>
          Already have an account?{" "}
        </ThemedText>
        <TouchableOpacity onPress={() => router.push('/')}>
          <ThemedText
            style={[
              styles.loginLink,
              {
                color:
                  theme === "light" ? Colors.light.tint : Colors.dark.tint,
              },
            ]}
          >
            Login
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  inputContainer: {
    width: "100%",
    gap: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "700",
  },
});
