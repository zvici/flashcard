import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton, Text } from "@/components";

export default function PracticeDetail() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const answers = ["Con gà", "Con chó", "Con mèo", "Con cá"];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.topBar}>
          <IconButton name="arrow-left" onPress={handleGoBack} />
          <Text weight={"700"} size={20}>
            5/10
          </Text>
          <IconButton name="arrow-left" onPress={handleGoBack} />
        </View>
        <View style={styles.question}>
          <Text weight={"700"} size={32}>
            Dog
          </Text>
        </View>
      </View>
      <View style={styles.answerContainer}>
        {answers.map((answer, index) => (
          <TouchableOpacity key={index} style={styles.answer}>
            <Text weight={"500"} size={20} color="#FFFFFF">
              {answer}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
        <Text weight={"500"} size={16} color="#FFFFFF">
          Practice ID: {id}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23252D",
  },
  header: {
    width: "100%",
    height: 400,
    backgroundColor: "#FFE3C3",
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
  },
  topBar: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  answerContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    padding: 20,
  },
  answer: {
    width: "48%",
    height: "48%",
    backgroundColor: "#2D2F3A",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
  },
});
