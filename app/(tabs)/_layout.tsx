import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import { useSegments } from 'expo-router';

export default function TabLayout() {

  const segment = useSegments();
  const hideTabBar =
  segment[1] === "practice" && segment[2] === "detail" ||
  segment[1] === "study" && segment[2] === "detail";

  return (
    <Tabs tabBar={(props) => <TabBar {...props} visible={!hideTabBar} />}>
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, tabBarLabel: "Home" }}
      />
      <Tabs.Screen
        name="study"
        options={{ headerShown: false, tabBarLabel: "Study" }}
      />
      <Tabs.Screen
        name="practice"
        options={{ headerShown: false, tabBarLabel: "Practice" }}
      />
    </Tabs>
  );
}
