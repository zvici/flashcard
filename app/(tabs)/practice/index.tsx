import { Button, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";

export default function PracticeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Practice Screen</Text>
      <Button
        title="Go to Detail 123"
        onPress={() => router.push("/practice/detail/123")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23252D",
    justifyContent: "center",
    alignItems: "center",
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
  questionContainer: {
    width: "100%",
    padding: 20,
    height: 400,
    backgroundColor: "#FFE3C3",
    justifyContent: "center",
    alignItems: "center",
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
  },
});
