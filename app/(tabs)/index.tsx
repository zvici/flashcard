import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Hello!</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
