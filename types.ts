export type Category =
  | 'meat'
  | 'appetizer'
  | 'sides'
  | 'ensaladas'
  | 'acompanamientos'
  | 'wine'
  | 'pisco'
  | 'drink'
  | 'ice'
  | 'beer';

export type IconType =
  | 'beef'
  | 'pork'
  | 'chicken'
  | 'sausage'
  | 'bread'
  | 'salad'
  | 'cheese'
  | 'fire'
  | 'chorizo'
  | 'wine'
  | 'soda'
  | 'pisco'
  | 'ice'
  | 'beer';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  description_en?: string;
  category: Category;
  subcategory?: 'red' | 'white' | 'sparkling';
  iconType: IconType;
  selected?: boolean;
}

export interface GuestCounts {
  men: number;
  women: number;
  children: number;
}

export type HungerLevel = 'normal' | 'feroz';

export interface CalculationResult {
  totalMeatKg: number;
  totalBeefKg: number;
  totalPorkKg: number;
  totalChickenKg: number;
  coalBags: number;
  drinksLiters: number;
  totalBeerUnits: number;
  breadUnits: number;
  meatDetails: { name: string; amount: string }[];
}
