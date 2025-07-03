import { useEffect, useState, useCallback } from "react";
import { getCategories } from "@/libs/storage";
import { Category } from "@/types/models";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  }, []);

  const reloadCategories = async () => {
    await loadCategories();
  };

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    reloadCategories,
  };
}
