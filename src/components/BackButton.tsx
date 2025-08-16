import { Href, Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";

import { GradientIcon } from "./GradientIcon";
import { Ionicons } from "@expo/vector-icons";

// Validate href to prevent open redirects and malicious deep links
const isValidHref = (href: unknown): href is Href => {
  if (!href) {
    return false;
  }

  // Handle string paths
  if (typeof href === "string") {
    return /^\/[^\/]/.test(href);
  }

  // Handle HrefObject format: {pathname: string, params?: object}
  if (typeof href === "object" && href !== null) {
    if (!("pathname" in href) || typeof href.pathname !== "string") return false;

    return /^\/[^\/]/.test(href.pathname);
  }

  return false;
};

// Safe JSON parsing with validation
const safeParseHref = (jsonString: string): Href | null => {
  try {
    const parsed = JSON.parse(jsonString, (key, value) => {
      // Reject any attempts to modify prototype
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        return undefined;
      }

      return value;
    });

    if (isValidHref(parsed)) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
};

type Props = {
  fromHref?: string | Href;
};

export const BackButton = ({ fromHref }: Props) => {
  let href: Href | null = null;

  if (isValidHref(fromHref)) {
    href = fromHref;
  } else if (typeof fromHref === "string") {
    href = safeParseHref(fromHref);
  }

  if (href) {
    return (
      <Link href={href} asChild>
        <TouchableOpacity>
          <GradientIcon icon={Ionicons} name="chevron-back" size={28} />
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity onPress={() => router.back()}>
      <GradientIcon icon={Ionicons} name="chevron-back" size={28} />
    </TouchableOpacity>
  );
};
