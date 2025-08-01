import { useConvexAuth } from "convex/react";
import { TouchableOpacity } from "react-native";

import { Text } from "@/components/Text";
import { useAuthActions } from "@convex-dev/auth/react";

export const SignOutButton = () => {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <TouchableOpacity onPress={signOut}>
      <Text>Sign out</Text>
    </TouchableOpacity>
  );
};
