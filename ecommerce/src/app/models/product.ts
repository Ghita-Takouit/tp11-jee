export interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
  category?: {
    id: number;
    name: string;
    description?: string;
  };
}
