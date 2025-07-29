import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import { TabBarIcon } from "@/components/TabBarIcon";
import { COLORS } from "@/styles";
import Fontisto from "@expo/vector-icons/Fontisto";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "none",
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.pink,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} text="Home" iconName="tinder" icon={Fontisto} />
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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    marginBottom: 0,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { height: 0, width: 0 },
  },
});
