import { useState } from "react";
import { StyleSheet, TextInput, Alert } from "react-native";
import { View } from "@/components/Themed";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button, Text } from "@/components";
import { saveCard } from "@/libs/storage";

export default function AddCardModal() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const router = useRouter();
  const { categoryId } = useLocalSearchParams();

  const handleAdd = async () => {
    if (!word.trim() || !meaning.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ từ và nghĩa.");
      return;
    }

    try {
      await saveCard({
        id: Date.now().toString(),
        word: word.trim(),
        meaning: meaning.trim(),
        categoryId: categoryId as string,
      });
      router.back();
    } catch (err) {
      console.error("❌ Lỗi khi thêm card:", err);
      Alert.alert("Lỗi", "Không thể thêm thẻ");
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} color="white">
        Thêm thẻ mới
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Từ vựng"
        value={word}
        onChangeText={setWord}
        autoFocus
      />
      <TextInput
        style={styles.input}
        placeholder="Nghĩa"
        value={meaning}
        onChangeText={setMeaning}
      />
      <View style={styles.row}>
        <Button title="Thêm" onPress={handleAdd} />
        <Button title="Đóng" onPress={handleClose} variant="secondary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
