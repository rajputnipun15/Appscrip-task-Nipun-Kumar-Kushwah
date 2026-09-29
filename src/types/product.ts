export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export type SortOption =
  | "RECOMMENDED"
  | "NEWEST FIRST"
  | "POPULAR"
  | "PRICE : HIGH TO LOW"
  | "PRICE : LOW TO HIGH";
