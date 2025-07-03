import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { View } from "@/components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton, Text } from "@/components";
import { useFocusEffect, useRouter } from "expo-router";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/models";
import { useCallback } from "react";
import { deleteCategory } from "@/libs/storage";
import Colors from "@/constants/Colors";

export default function StudyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { categories, loading, reloadCategories } = useCategories();

  const handleOnPress = (item: Category) => {
    router.push(`/study/detail/${item.id}`);
  };

  const handleOnAddCategory = () => {
    router.push({
      pathname: "/modals/add-category",
    });
  };

  const renderItem: ListRenderItem<Category> = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleOnPress(item)}
      onLongPress={() => {
        Alert.alert(
          "Xác nhận",
          `Xoá danh mục "${item.name}"?`,
          [
            { text: "Huỷ", style: "cancel" },
            {
              text: "Xoá",
              style: "destructive",
              onPress: async () => {
                await deleteCategory(item.id);
                await reloadCategories();
              },
            },
          ],
          { cancelable: true }
        );
      }}
      delayLongPress={400}
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  useFocusEffect(
    useCallback(() => {
      reloadCategories();
    }, [])
  );

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Study Screen</Text>
        <IconButton
          name="plus"
          size={24}
          color="#fff"
          onPress={handleOnAddCategory}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(category) => category.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  row: {
    justifyContent: "space-between",
  },
  item: {
    backgroundColor: Colors.dark.secondary,
    flex: 1,
    margin: 10,
    padding: 20,
    height: 100,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    color: "#1d3557",
  },
});
