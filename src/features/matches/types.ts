import type { SwipeDirection } from "react-native-swipeable-card-stack";

import type { Id } from "@convex/_generated/dataModel";
import type { Profile } from "@convex/profiles";

export type PreviousSwipeData = {
  profile: Profile;
  direction: SwipeDirection;
  swipeId: Id<"swipes">;
  matchId?: Id<"matches">;
};
