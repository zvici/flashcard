import { use, useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { IconButton, Text } from "@/components";
import { useCards } from "@/hooks/useCards";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

export default function StudyDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const { cards, loading, reload } = useCards(id as string);
  const [index, setIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const rotation = useSharedValue(0);
  const isFront = useSharedValue(true);

  const flipCard = () => {
    isFront.value = !isFront.value;
    rotation.value = withTiming(isFront.value ? 0 : 180, { duration: 300 });
  };

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
    backfaceVisibility: "hidden",
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value + 180}deg` }],
    backfaceVisibility: "hidden",
  }));

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
    isFront.value = true;
    rotation.value = withTiming(0, { duration: 100 });
  };

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, cards.length - 1));
    isFront.value = true;
    rotation.value = withTiming(0, { duration: 100 });
  };
  const handleGoBack = () => navigation.goBack();
  const handleAddCard = () => {
    router.push({ pathname: "/modals/add-card", params: { categoryId: id } });
  };
  const currentCard = cards[index];

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <IconButton name="arrow-left" onPress={handleGoBack} color="#fff" />
        <Text style={styles.title}>Flashcards</Text>
        <IconButton name="plus" onPress={handleAddCard} color="#fff" />
      </View>
      {loading ? (
        <ActivityIndicator color="#fff" style={{ marginTop: 20 }} />
      ) : cards.length === 0 ? (
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Không có thẻ nào</Text>
        </View>
      ) : (
        <>
          <TouchableWithoutFeedback onPress={flipCard}>
            <View style={styles.cardContainer}>
              <Animated.View style={[styles.card, frontStyle]}>
                <Text style={styles.word}>{currentCard.word}</Text>
              </Animated.View>
              <Animated.View style={[styles.card, styles.backCard, backStyle]}>
                <Text style={styles.word}>{currentCard.meaning}</Text>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
            <IconButton
              name="arrow-left"
              onPress={handlePrev}
              disabled={index === 0}
              color="#fff"
            />
            <Text style={styles.progress} weight="bold">
              {index + 1} / {cards.length}
            </Text>
            <IconButton
              name="arrow-right"
              onPress={handleNext}
              disabled={index === cards.length - 1}
              color="#fff"
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  backCard: {
    backgroundColor: "#fafafa",
    position: "absolute",
  },
  word: {
    fontSize: 28,
    color: "#1d3557",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  progress: {
    fontSize: 18,
    color: "#fff",
  },
});
