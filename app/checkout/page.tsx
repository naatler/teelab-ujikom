'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/app/lib/axios';
import Navbar from '@/app/components/Navbar';
import { useAuthStore } from '@/app/store/authStore';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
  };
}

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

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [cart, setCart] = useState<{ items: CartItem[] } | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [cartRes, addressRes] = await Promise.all([
        axios.get('/cart'),
        axios.get('/addresses'),
      ]);

      setCart(cartRes.data);
      setAddresses(addressRes.data);

      // Auto-select default address
      const defaultAddress = addressRes.data.find((addr: Address) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      }
    } catch (error) {
      toast.error('Failed to load checkout data');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (!cart || cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setProcessing(true);

    try {
      const { data } = await axios.post('/orders', {
        addressId: selectedAddress,
        notes,
      });

      toast.success('Order placed successfully!');
      router.push(`/orders/${data.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-xl">Loading checkout...</div>
        </div>
      </>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <button
                onClick={() => router.push('/products')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Delivery Address</h2>
                  <button
                    onClick={() => router.push('/profile/addresses')}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    + Add New Address
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No addresses found</p>
                    <button
                      onClick={() => router.push('/profile/addresses')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Add Address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={`block p-4 border-2 rounded-lg cursor-pointer transition ${
                          selectedAddress === address.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={selectedAddress === address.id}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          className="mr-3"
                        />
                        <div className="inline-block">
                          <p className="font-semibold">
                            {address.label}{' '}
                            {address.isDefault && (
                              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded ml-2">
                                Default
                              </span>
                            )}
                          </p>
                          <p className="text-sm font-medium mt-1">
                            {address.recipientName} - {address.phone}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.address}, {address.city}, {address.province}{' '}
                            {address.postalCode}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.product.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-3xl">📦</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          Rp{' '}
                          {(
                            Number(item.product.price) * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Order Notes (Optional)</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Any special instructions for your order..."
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({cart.items.length})</span>
                    <span className="font-semibold">
                      Rp {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        Rp {calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={processing || !selectedAddress}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By placing an order, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}