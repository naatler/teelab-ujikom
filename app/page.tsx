import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section 
          className="relative h-[600px] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-6xl font-bold mb-4 leading-tight">
                Performance Meets<br />Everyday Style.
              </h1>
              <div className="w-32 h-1 bg-white mb-6"></div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-6 py-2 border-2 border-gray-300 rounded-full text-sm font-medium mb-8">
                Our Story
              </span>
              <h2 className="text-4xl font-bold mb-6">
                TeeLab was created for a new generation<br />
                of golfers who see the{' '}
                <span className="text-green-600">game as more than just a sport</span>
                —it's a lifestyle !.
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1530028828-25e8270af4bc?w=400" 
                    alt="Golf Club" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1622428051717-dcd8412959de?w=400" 
                    alt="Golf Balls" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md space-y-8 p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="font-semibold">Apparel</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="font-semibold">Balls</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="font-semibold">Course</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Healthy Lifestyle Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <span className="inline-block px-6 py-2 border-2 border-gray-300 rounded-full text-sm font-medium mb-8">
                Healthy
              </span>
              <h2 className="text-4xl font-bold mb-12">
                Because golf isn't just about the <span className="text-green-600">swing</span>.<br />
                It's about how you carry yourself, wherever you go.
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400" 
                    alt="Golf Cart" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1592919505780-303950717480?w=400" 
                    alt="Golfer Swing" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400" 
                    alt="Golf Equipment" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <span className="inline-block px-6 py-2 border-2 border-gray-300 rounded-full text-sm font-medium mb-8">
              Category
            </span>
            <h2 className="text-4xl font-bold mb-2">
              Top-Quality Golf Balls for
            </h2>
            <h3 className="text-4xl font-bold text-green-600 mb-8">
              Every Game!
            </h3>

            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              <button className="px-6 py-2 bg-green-500 text-white rounded-full whitespace-nowrap font-medium">
                All
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full whitespace-nowrap hover:bg-gray-300">
                Golf Clubs
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full whitespace-nowrap hover:bg-gray-300">
                Golf Balls
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full whitespace-nowrap hover:bg-gray-300">
                Apparel
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
              {/* Product Cards */}
              <ProductCard 
                name="Set Balls Golf"
                price="Rp 500,000.00"
                image="https://images.unsplash.com/photo-1622428051717-dcd8412959de?w=400"
              />
              <ProductCard 
                name="Electric Golf Carts"
                price="Rp 400,000.00"
                image="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400"
              />
              <ProductCard 
                name="Cart Golf Bag"
                price="Rp 200,000.00"
                image="https://images.unsplash.com/photo-1530028828-25e8270af4bc?w=400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
              <ProductCard 
                name="Cap Golf"
                price="Rp 300,000.00"
                image="https://images.unsplash.com/photo-1588783948922-78e046f0b909?w=400"
              />
              <ProductCard 
                name="Set Balls Golf"
                price="Rp 500,000.00"
                image="https://images.unsplash.com/photo-1530028828-25e8270af4bc?w=400"
              />
              <ProductCard 
                name="Set Balls Golf"
                price="Rp 500,000.00"
                image="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1592919505780-303950717480?w=400" 
                  alt="Golf Course" 
                  className="rounded-lg w-full"
                />
              </div>
              <div className="md:w-2/3 text-white">
                <span className="inline-block px-6 py-2 border-2 border-gray-600 rounded-full text-sm font-medium mb-6">
                  Course
                </span>
                <h2 className="text-4xl font-bold mb-6">
                  Get Golf Tips & Exclusive Deals -<br />
                  Join Course Now!
                </h2>
                <div className="flex gap-3 max-w-md">
                  <input 
                    type="email" 
                    placeholder="Your join area"
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-white text-xl font-bold mb-6">Contact Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Tlp: +6285161019999</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>teelab@gmail.com</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>
                      Jawa timur, Pasuruan, Jawa timur Kec. Tutur Kab.Pasuruan<br />
                      Jawa timur, Indonesia 65164
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white text-xl font-bold mb-6">Get In Touch</h3>
                <p className="mb-6 leading-relaxed">
                  Have questions, feedback, or collaboration ideas? We'd love to hear from you. Reach out to us, and we'll respond as soon as possible.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-6">
                <Link href="/" className="hover:text-white">Home</Link>
                <Link href="/products" className="hover:text-white">Our Story</Link>
                <Link href="/products" className="hover:text-white">Shop Now</Link>
              </div>
              <p className="text-sm">© 2024 TeeLab. - Where golf meets everyday lifestyle</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

// Product Card Component
function ProductCard({ name, price, image }: { name: string; price: string; image: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{price}</p>
        <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}