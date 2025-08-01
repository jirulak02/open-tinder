import { useMutation } from "convex/react";
import { Image } from "expo-image";
import { ImagePickerAsset } from "expo-image-picker";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, TextInput, View } from "react-native";

import { GradientButton } from "@/components/GradientButton";
import { ImagePicker } from "@/components/ImagePicker";
import { Text } from "@/components/Text";
import { COLORS } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

type FormValues = {
  name: string;
  age: string;
  description: string;
  images: ImagePickerAsset[];
};

export const ProfileSetup = () => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createProfile = useMutation(api.profiles.createProfile);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      age: "",
      description: "",
      images: [],
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const uploadUrl = await generateUploadUrl();

      const storageIds: Id<"_storage">[] = await Promise.all(
        data.images.map(async (image) => {
          const imageResponse = await fetch(image.uri);
          const imageBlob = await imageResponse.blob();
          const uploadResponse = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": "image/*" },
            body: imageBlob,
          });
          const { storageId } = await uploadResponse.json();

          return storageId;
        })
      );

      await createProfile({
        name: data.name,
        age: parseInt(data.age, 10),
        description: data.description,
        images: storageIds,
      });

      Alert.alert("Success", "Profile created successfully!");
      reset();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create profile. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
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
            <View>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Your name"
                placeholderTextColor={COLORS.lightGray}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
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
            <View>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={[styles.input, errors.age && styles.inputError]}
                placeholder="Your age"
                placeholderTextColor={COLORS.lightGray}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                autoCorrect={false}
              />
            </View>
          )}
        />
        {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}
        <Controller
          control={control}
          name="description"
          rules={{
            required: "This section is required",
            minLength: {
              value: 10,
              message: "This section must be at least 10 characters",
            },
            maxLength: {
              value: 500,
              message: "This section must be less than 500 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.label}>About you</Text>
              <TextInput
                style={[styles.input, styles.textArea, errors.description && styles.inputError]}
                placeholder="Tell us about yourself..."
                placeholderTextColor={COLORS.lightGray}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                autoCapitalize="sentences"
              />
            </View>
          )}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
        <Controller
          control={control}
          name="images"
          rules={{
            required: "Upload at least one image",
            minLength: {
              value: 1,
              message: "Upload at least one image",
            },
            maxLength: {
              value: 4,
              message: "You can upload up to 4 images",
            },
          }}
          render={({ field: { value, onChange } }) => (
            <View>
              <Text style={styles.label}>Profile images</Text>
              <View style={styles.imagePickerContainer}>
                <ImagePicker onChange={onChange}>Upload</ImagePicker>
                {errors.images && <Text style={styles.errorText}>{errors.images.message}</Text>}
                <View style={styles.imagesContainer}>
                  {value.map((image) => (
                    <Image key={image.uri} source={{ uri: image.uri }} style={styles.image} />
                  ))}
                  {Array.from({ length: 4 - value.length }).map((_, index) => (
                    <View key={index} style={styles.imagePlaceholder} />
                  ))}
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <GradientButton disabled={isSubmitting || !isValid} onPress={handleSubmit(onSubmit)}>
        {isSubmitting ? "Setting up profile..." : "Set up profile"}
      </GradientButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "space-between",
  },
  inputContainer: {
    gap: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
  },
  inputError: {
    borderColor: COLORS.red,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 4,
  },
  imagePickerContainer: {
    gap: 16,
  },
  imagesContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 16,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
  },
  imagePlaceholder: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderStyle: "dashed",
  },
});
