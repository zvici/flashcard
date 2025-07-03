import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category, Card } from '@/types/models';

const CATEGORY_KEY = 'categories';
const CARD_KEY = 'cards';

// --- Category ---
export const saveCategory = async (category: Category) => {
  const existing = await getCategories();
  const updated = [...existing, category];
  await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(updated));
};

export const getCategories = async (): Promise<Category[]> => {
  const json = await AsyncStorage.getItem(CATEGORY_KEY);
  return json ? JSON.parse(json) : [];
};

export const deleteCategory = async (categoryId: string) => {
  const existing = await getCategories();
  const updated = existing.filter((c) => c.id !== categoryId);
  await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(updated));

  // Optionally, delete all cards in that category too:
  await deleteCardsByCategory(categoryId);
};

// --- Card ---
export const saveCard = async (card: Card) => {
  const existing = await getCards();
  const updated = [...existing, card];
  await AsyncStorage.setItem(CARD_KEY, JSON.stringify(updated));
};

export const getCards = async (): Promise<Card[]> => {
  const json = await AsyncStorage.getItem(CARD_KEY);
  return json ? JSON.parse(json) : [];
};

export const getCardsByCategory = async (categoryId: string): Promise<Card[]> => {
  const all = await getCards();
  return all.filter(card => card.categoryId === categoryId);
};

export const deleteCard = async (cardId: string) => {
  const existing = await getCards();
  const updated = existing.filter((c) => c.id !== cardId);
  await AsyncStorage.setItem(CARD_KEY, JSON.stringify(updated));
};

export const deleteCardsByCategory = async (categoryId: string) => {
  const existing = await getCards();
  const updated = existing.filter((c) => c.categoryId !== categoryId);
  await AsyncStorage.setItem(CARD_KEY, JSON.stringify(updated));
};
