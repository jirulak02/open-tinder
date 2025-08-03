import { useMutation } from "convex/react";
import { Image } from "expo-image";
import { ImagePickerAsset } from "expo-image-picker";
import { Controller, useForm } from "react-hook-form";
import { Alert, Platform, ScrollView, StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { GradientButton } from "@/components/GradientButton";
import { ImagePicker } from "@/components/ImagePicker";
import { Text } from "@/components/Text";
import { TextInput } from "@/components/TextInput";
import { uploadImages } from "@/features/profiles/utils";
import { COLORS } from "@/styles";
import { api } from "@convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";

type FormValues = {
  name: string;
  age: string;
  description: string;
  images: ImagePickerAsset[];
  uploadProvider: "convex" | "uploadthing";
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
      uploadProvider: "convex",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const convexUploadUrl = await generateUploadUrl();
      const images = await uploadImages({
        images: data.images,
        uploadProvider: data.uploadProvider,
        convexUploadUrl,
      });
      console.log("images", images);

      await createProfile({
        name: data.name,
        age: parseInt(data.age, 10),
        description: data.description,
        images: images,
        uploadProvider: data.uploadProvider,
      });

      Alert.alert("Success", "Profile created successfully!");
      reset();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create profile. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
              {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </View>
          )}
        />
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
              {errors.age && <Text style={styles.errorText}>{errors.age.message}</Text>}
            </View>
          )}
        />
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
              {errors.description && (
                <Text style={styles.errorText}>{errors.description.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="uploadProvider"
          rules={{
            required: "Upload provider is required",
            validate: (value) => {
              if (value === "convex") return true;
              if (value === "uploadthing") return true;
              return "Invalid upload provider";
            },
          }}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.label}>Image upload provider</Text>
              <RNPickerSelect
                placeholder={{}}
                value={value}
                onValueChange={onChange}
                items={[
                  { label: "Convex", value: "convex" },
                  { label: "UploadThing", value: "uploadthing" },
                ]}
                Icon={() => <Ionicons name="chevron-down" size={20} color={COLORS.black} />}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputIOS: [
                    styles.input,
                    styles.inputSelect,
                    {
                      pointerEvents: "none",
                    },
                  ],
                  inputAndroid: [styles.input, styles.inputSelect],
                  inputWeb: [
                    styles.input,
                    styles.inputSelect,
                    {
                      // @ts-expect-error - Necessary to hide native arrow on web
                      appearance: "none",
                    },
                  ],
                  iconContainer: styles.inputSelectIcon,
                }}
              />
              {errors.uploadProvider && (
                <Text style={styles.errorText}>{errors.uploadProvider.message}</Text>
              )}
            </View>
          )}
        />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    width: Platform.OS === "web" ? 500 : "100%",
    alignSelf: "center",
    justifyContent: "space-between",
    gap: 16,
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
    marginBottom: 20,
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
  inputSelect: {
    fontFamily: "GothamRounded-Book",
    paddingRight: 40,
  },
  inputSelectIcon: {
    position: "absolute",
    top: "50%",
    right: 12,
    transform: [{ translateY: -10 }],
  },
  inputError: {
    borderColor: COLORS.red,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 4,
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
