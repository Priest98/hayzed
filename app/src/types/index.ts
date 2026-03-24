export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'hz-collection' | 'agbada' | 'kaftan' | 'casual' | 'new-collection';
  description: string;
  fabric: string;
  fit: string;
  care: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  caption: string;
}
