import { useConvexAuth } from "convex/react";
import { TouchableOpacity } from "react-native";

import { GradientIcon } from "@/components/GradientIcon";
import { useAuthActions } from "@convex-dev/auth/react";
import { Entypo } from "@expo/vector-icons";

export const SignOutButton = () => {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <TouchableOpacity onPress={signOut}>
      <GradientIcon icon={Entypo} name="log-out" size={20} />
    </TouchableOpacity>
  );
};
