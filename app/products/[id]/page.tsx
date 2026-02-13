'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from '@/app/lib/axios';
import Navbar from '@/app/components/Navbar';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/authStore';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category: {
    id: string;
    name: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${params.id}`);
      setProduct(data);
    } catch (error) {
      toast.error('Product not found');
      router.push('/products');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!user) {
      toast.error('Please login first');
      router.push('/login');
      return;
    }

    try {
      await axios.post('/cart/items', {
        productId: product?.id,
        quantity,
      });
      toast.success('Added to cart!');
      router.push('/cart');
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

  if (!product) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="mb-6 text-blue-600 hover:underline"
          >
            ← Back to Products
          </button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400 text-9xl">📦</span>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  {product.category.name}
                </p>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-4xl font-bold text-blue-600 mb-6">
                  Rp {product.price.toLocaleString()}
                </p>

                <div className="mb-6">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Stock:</span> {product.stock}{' '}
                    units
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description || 'No description available'}
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={addToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>

                {user?.role === 'ADMIN' && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() =>
                        router.push(`/admin/products/${product.id}/edit`)
                      }
                      className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Edit Product
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}