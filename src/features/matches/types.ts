import type { SwipeDirection } from "react-native-swipeable-card-stack";

import type { Id } from "@convex/_generated/dataModel";
import type { Profile } from "@convex/profiles";

export type PreviousSwipeData = {
  profile: Profile & { tempId: string };
  direction: SwipeDirection;
  swipeId: Id<"swipes">;
  matchId?: Id<"matches">;
};
