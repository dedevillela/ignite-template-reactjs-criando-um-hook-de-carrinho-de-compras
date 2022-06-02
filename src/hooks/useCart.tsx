import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      // Parse a string into an array, as it is expected in <Product[]> state
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      // Array with all cart values and/or updates
      const updatedCart = [...cart];
      // Variable which checks if product exists on cart
      const productExists = updatedCart.find(product => product.id === productId);
      // Get stock from API
      const stock = await api.get(`/stock/${productId}`);
      // Variable with stock amount
      const stockAmount = stock.data.amount;
      // Variable which checks the amount of products on cart
      const curentAmount = productExists ? productExists.amount : 0;
      // Variable with current amount of products
      const amount = curentAmount + 1;
      // Condition which checks if the amount of products isn't bigger than the current amount
      if (amount > stockAmount) {
        // Shows message error for out of stock
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }
      // Condition which checks if the product exists
      if (productExists) {
        // Updates the amount of products on cart
        productExists.amount = amount;
      } else {
        // Add new product to cart
        const product = await api.get(`/products/${productId}`);
        // Add amount equal to one to cart
        const newProduct = {
          ...product.data,
          amount: 1
        }
        // Updates cart with new product
        updatedCart.push(newProduct);
      }
      // Update the cart
      setCart(updatedCart);
      // Store cart data in localStorage
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
    } catch {
      // Shows message error for adding a product to cart
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
