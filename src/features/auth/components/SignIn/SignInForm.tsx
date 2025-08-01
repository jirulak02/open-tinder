import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { Text } from "@/components/Text";
import { COLORS } from "@/styles";
import { useAuthActions } from "@convex-dev/auth/react";

type FormValues = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const { signIn } = useAuthActions();

  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await signIn("password", { ...data, flow });
      reset();
    } catch (error) {
      console.error(error);
      Alert.alert(
        `Could not ${flow === "signIn" ? "sign in" : "sign up"}`,
        "Incorrect email or password"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting || !isValid}
      >
        <Text style={styles.buttonText}>
          {flow === "signIn"
            ? isSubmitting
              ? "Signing in..."
              : "Sign in"
            : isSubmitting
              ? "Signing up..."
              : "Sign up"}
        </Text>
      </TouchableOpacity>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {flow === "signIn" ? "Don't have an account? " : "Already have an account? "}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setFlow(flow === "signIn" ? "signUp" : "signIn");
            reset();
          }}
        >
          <Text style={styles.switchLink}>
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  errorText: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  switchText: {
    fontSize: 14,
    color: COLORS.white,
  },
  switchLink: {
    fontSize: 14,
    color: COLORS.blue,
    fontWeight: "500",
  },
});
