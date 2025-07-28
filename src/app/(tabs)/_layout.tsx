import { Tabs } from "expo-router";

import { TabBarIcon } from "@/components/TabBarIcon";
import { COLOR_BLACK, COLOR_GRAY, COLOR_PINK, COLOR_WHITE } from "@/styles";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "none",
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLOR_PINK,
        tabBarInactiveTintColor: COLOR_GRAY,
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: "uppercase",
          paddingTop: 10,
        },
        tabBarStyle: {
          backgroundColor: COLOR_WHITE,
          borderTopWidth: 0,
          marginBottom: 0,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowColor: COLOR_BLACK,
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
          href: {
            pathname: "/(tabs)/matches",
          },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="heart" text="Matches" />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          href: {
            pathname: "/(tabs)/chats",
          },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName="chatbubble" text="Chats" />
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
