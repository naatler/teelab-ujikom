'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/app/lib/axios';
import Navbar from '@/app/components/Navbar';
import { useAuthStore } from '@/app/store/authStore';
import toast from 'react-hot-toast';

interface Address {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    recipientName: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    isDefault: false,
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get('/addresses');
      setAddresses(data);
    } catch (error) {
      toast.error('Failed to fetch addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingAddress) {
        await axios.patch(`/addresses/${editingAddress.id}`, formData);
        toast.success('Address updated!');
      } else {
        await axios.post('/addresses', formData);
        toast.success('Address added!');
      }
      setShowModal(false);
      resetForm();
      fetchAddresses();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this address?')) return;

    try {
      await axios.delete(`/addresses/${id}`);
      toast.success('Address deleted');
      fetchAddresses();
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const setDefaultAddress = async (id: string) => {
    try {
      await axios.patch(`/addresses/${id}/set-default`);
      toast.success('Default address updated');
      fetchAddresses();
    } catch (error) {
      toast.error('Failed to set default address');
    }
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      label: address.label,
      recipientName: address.recipientName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingAddress(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      label: '',
      recipientName: '',
      phone: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      isDefault: false,
    });
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
            <h1 className="text-3xl font-bold">My Addresses</h1>
            <button
              onClick={openCreateModal}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add New Address
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📍</div>
              <h2 className="text-2xl font-semibold mb-2">No addresses yet</h2>
              <p className="text-gray-600 mb-6">Add your delivery address</p>
              <button
                onClick={openCreateModal}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
              >
                Add Address
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`bg-white rounded-lg shadow-md p-6 relative ${
                    address.isDefault ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  {address.isDefault && (
                    <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                      Default
                    </span>
                  )}

                  <h3 className="font-bold text-lg mb-2">{address.label}</h3>
                  <p className="font-semibold mb-1">{address.recipientName}</p>
                  <p className="text-gray-600 text-sm mb-2">{address.phone}</p>
                  <p className="text-gray-700 mb-2">{address.address}</p>
                  <p className="text-gray-600 text-sm">
                    {address.city}, {address.province} {address.postalCode}
                  </p>

                  <div className="mt-4 flex gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(address.id)}
                        className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 text-sm"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => openEditModal(address)}
                      className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label (e.g., Home, Office)
                </label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Home"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.recipientName}
                    onChange={(e) =>
                      setFormData({ ...formData, recipientName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Street address, building, apartment, etc."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Jakarta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.province}
                    onChange={(e) =>
                      setFormData({ ...formData, province: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="DKI Jakarta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="12345"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) =>
                    setFormData({ ...formData, isDefault: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Set as default address
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingAddress ? 'Update' : 'Add'} Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}