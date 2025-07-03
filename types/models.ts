export type Category = {
  id: string;
  name: string;
};

export type Card = {
  id: string;
  word: string;
  meaning: string;
  categoryId: string;
};
