import { Tabs } from "expo-router";

import { TabBarIcon } from "@/components/TabBarIcon";
import { BLACK, DARK_GRAY, PRIMARY_COLOR, WHITE } from "@/styles";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "none",
        tabBarShowLabel: false,
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: DARK_GRAY,
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: "uppercase",
          paddingTop: 10,
        },
        tabBarStyle: {
          backgroundColor: WHITE,
          borderTopWidth: 0,
          marginBottom: 0,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowColor: BLACK,
          shadowOffset: { height: 0, width: 0 },
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="search" text="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="heart" text="Matches" />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="chatbubble" text="Chat" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="person" text="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
