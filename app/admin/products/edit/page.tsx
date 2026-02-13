'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from '@/app/lib/axios';
import Navbar from '@/app/components/Navbar';
import AdminRoute from '@/app/components/AdminRoute';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categoryId: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [params.id]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setCategories(data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${params.id}`);
      setFormData({
        name: data.name,
        slug: data.slug,
        categoryId: data.categoryId,
        description: data.description || '',
        price: data.price.toString(),
        stock: data.stock.toString(),
        imageUrl: data.imageUrl || '',
        isActive: data.isActive,
      });
    } catch (error) {
      toast.error('Product not found');
      router.push('/products');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(`/products/${params.id}`, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      toast.success('Product updated successfully!');
      router.push('/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`/products/${params.id}`);
      toast.success('Product deleted!');
      router.push('/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <AdminRoute>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => router.back()}
              className="mb-6 text-blue-600 hover:underline"
            >
              ← Back
            </button>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Edit Product</h1>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete Product
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/\s+/g, '-');
                      setFormData({ ...formData, name, slug });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (Rp)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Product is active
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Updating...' : 'Update Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}