import { View, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import TabBarButton from "./TabBarButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Colors from "@/constants/Colors";

interface TabBarProps extends BottomTabBarProps {
  visible?: boolean;
}

const TabBar = (props: TabBarProps) => {
  const { state, navigation, descriptors, visible } = props;
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.tabbar,
        { backgroundColor: Colors[colorScheme ?? "light"].secondary },
        { display: visible === false ? "none" : "flex"}
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        if (
          ["_sitemap", "+not-found"].includes(route.name) ||
          route.name.includes('/') || route.name.includes('modals')
        )
          return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={Colors[colorScheme ?? "light"].background}
            label={typeof label === "string" ? label : route.name}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 50,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});
export default TabBar;
