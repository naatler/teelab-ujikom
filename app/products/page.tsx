'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from '../lib/axios';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category: {
    name: string;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/products', {
        params: { search },
      });
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    try {
      await axios.post('/cart/items', {
        productId,
        quantity: 1,
      });
      toast.success('Added to cart!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Products</h1>
            {user?.role === 'ADMIN' && (
              <Link
                href="/admin/products/create"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                + Add Product
              </Link>
            )}
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-4xl">📦</span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">
                    {product.category.name}
                  </p>
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold text-xl mb-2">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Stock: {product.stock}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 bg-gray-200 text-center py-2 rounded hover:bg-gray-300"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl">No products found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}