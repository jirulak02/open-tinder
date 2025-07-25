import { useMutation } from "convex/react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { api } from "@convex/_generated/api";

type FormValues = {
  name: string;
  age: string;
  description: string;
  imageUrl: string;
};

export const ProfileSetup = () => {
  const createProfile = useMutation(api.profiles.createProfile);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      age: "",
      description: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createProfile({
        name: data.name,
        age: parseInt(data.age, 10),
        description: data.description,
        imageUrl: data.imageUrl,
      });

      Alert.alert("Success", "Profile created successfully!");
      reset();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create profile. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Set up your profile</Text>
        <Text style={styles.subtitle}>Tell us about yourself to get started</Text>

        <Controller
          control={control}
          name="name"
          rules={{
            required: "Name is required",
            maxLength: {
              value: 50,
              message: "Name must be less than 50 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Your name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="words"
              autoCorrect={false}
            />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

        <Controller
          control={control}
          name="age"
          rules={{
            required: "Age is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Age must be a valid number",
            },
            validate: (value) => {
              const age = parseInt(value, 10);
              if (age < 18) return "You must be at least 18 years old";
              if (age > 100) return "Please enter a valid age";
              return true;
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.age && styles.inputError]}
              placeholder="Your age"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="numeric"
              autoCorrect={false}
            />
          )}
        />
        {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}

        <Controller
          control={control}
          name="description"
          rules={{
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
            maxLength: {
              value: 500,
              message: "Description must be less than 500 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea, errors.description && styles.inputError]}
              placeholder="Tell us about yourself..."
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              autoCapitalize="sentences"
            />
          )}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}

        <Controller
          control={control}
          name="imageUrl"
          rules={{
            required: "Profile image URL is required",
            pattern: {
              value: /^https?:\/\/.+$/i,
              message: "Please enter a valid image URL",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.imageUrl && styles.inputError]}
              placeholder="Profile image URL (https://...)"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
        />
        {errors.imageUrl && <Text style={styles.errorText}>{errors.imageUrl.message}</Text>}

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Creating Profile..." : "Create Profile"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  formContainer: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: -12,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
