import { Stack } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "login",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "register",
        }}
      />
      <Stack.Screen
        name="getfamily"
        options={{
          title: "get family",
        }}
      />
    </Stack>
  );
}
