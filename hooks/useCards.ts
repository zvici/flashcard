import { useEffect, useState } from "react";
import { Card } from "@/types/models";
import { getCards } from "@/libs/storage";

export function useCards(categoryId: string) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCards = async () => {
    setLoading(true);
    const allCards = await getCards();
    const filtered = allCards.filter((card) => card.categoryId === categoryId);
    setCards(filtered);
    setLoading(false);
  };
  

  useEffect(() => {
    loadCards();
  }, [categoryId]);

  return { cards, loading, reload: loadCards };
}
