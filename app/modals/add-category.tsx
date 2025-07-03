import { useState } from "react";
import { StyleSheet, TextInput, Alert } from "react-native";
import { View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { saveCategory } from "@/libs/storage";
import { Button, IconButton, Text } from "@/components";

export default function AddCategoryModal() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleAdd = async () => {
    if (!name.trim()) {
      Alert.alert("Lỗi", "Tên danh mục không được để trống");
      return;
    }
    try {
      await saveCategory({
        id: new Date().getTime().toString(),
        name: name.trim(),
      });
      router.back();
    } catch (err) {
      console.error("❌ Lỗi khi thêm category:", err);
      Alert.alert("Lỗi", "Không thể thêm danh mục");
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
        <IconButton
          name="close"
          size={24}
          onPress={handleClose}
          color="white"
        />
      </View>
      <Text style={styles.title} color="white">
        Thêm danh mục
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên danh mục"
        value={name}
        onChangeText={setName}
        autoFocus
      />
      <View style={styles.row}>
        <Button title="Thêm" onPress={handleAdd} />
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
