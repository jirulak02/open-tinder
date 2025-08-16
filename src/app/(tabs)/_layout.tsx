import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import { TabBarIcon } from "@/components/TabBarIcon";
import { TabProvider, useTabContext } from "@/contexts/TabContext";
import { COLORS } from "@/styles";
import Fontisto from "@expo/vector-icons/Fontisto";

const TabLayoutContent = () => {
  const { activeParentTab, isOnUserProfile } = useTabContext();

  const getIsFocused = (tab: string, focused: boolean) =>
    isOnUserProfile ? activeParentTab === tab : focused;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "none",
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        sceneStyle: styles.scene,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={getIsFocused("index", focused)}
              text="Home"
              iconName="tinder"
              icon={Fontisto}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={getIsFocused("matches", focused)}
              iconName="heart"
              text="Matches"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={getIsFocused("chats", focused)}
              iconName="chatbubble"
              text="Chats"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={getIsFocused("profile", focused)}
              iconName="person"
              text="Profile"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user/[userId]"
        options={{
          href: null, // Hide from the tab bar
        }}
      />
    </Tabs>
  );
};

const TabLayout = () => {
  return (
    <TabProvider>
      <TabLayoutContent />
    </TabProvider>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    marginBottom: 0,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: COLORS.subtleGray,
    shadowOffset: { height: 0, width: 0 },
  },
  scene: {
    backgroundColor: COLORS.white,
  },
});
