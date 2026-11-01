import React, { useState } from 'react';
import { 
  Store, Code, Settings, Download, Copy, Check, ShoppingBag, 
  Search, User, MessageCircle, ChevronRight, Sparkles, HelpCircle, 
  ExternalLink, FileCode, FolderTree, Smartphone, Monitor, ArrowRight,
  Package, Truck, ShieldCheck, Heart, Star, X, Plus, Minus, Menu
} from 'lucide-react';

const THEME_FILES = [
  { path: 'assets/base.css', type: 'css', label: 'base.css' },
  { path: 'assets/global.js', type: 'js', label: 'global.js' },
  { path: 'config/settings_data.json', type: 'json', label: 'settings_data.json' },
  { path: 'config/settings_schema.json', type: 'json', label: 'settings_schema.json' },
  { path: 'layout/password.liquid', type: 'liquid', label: 'password.liquid' },
  { path: 'layout/theme.liquid', type: 'liquid', label: 'theme.liquid' },
  { path: 'locales/en.default.json', type: 'json', label: 'en.default.json' },
  { path: 'sections/announcement-bar.liquid', type: 'liquid', label: 'announcement-bar.liquid' },
  { path: 'sections/header.liquid', type: 'liquid', label: 'header.liquid' },
  { path: 'sections/featured-collection.liquid', type: 'liquid', label: 'featured-collection.liquid' },
  { path: 'sections/collection-list.liquid', type: 'liquid', label: 'collection-list.liquid' },
  { path: 'sections/collapsible-faq.liquid', type: 'liquid', label: 'collapsible-faq.liquid' },
  { path: 'sections/main-product.liquid', type: 'liquid', label: 'main-product.liquid' },
  { path: 'sections/main-collection.liquid', type: 'liquid', label: 'main-collection.liquid' },
  { path: 'sections/related-products.liquid', type: 'liquid', label: 'related-products.liquid' },
  { path: 'sections/footer.liquid', type: 'liquid', label: 'footer.liquid' },
  { path: 'snippets/card-product.liquid', type: 'liquid', label: 'card-product.liquid' },
  { path: 'snippets/icon-search.liquid', type: 'liquid', label: 'icon-search.liquid' },
  { path: 'snippets/icon-cart.liquid', type: 'liquid', label: 'icon-cart.liquid' },
  { path: 'snippets/icon-account.liquid', type: 'liquid', label: 'icon-account.liquid' },
  { path: 'snippets/icon-whatsapp.liquid', type: 'liquid', label: 'icon-whatsapp.liquid' },
  { path: 'snippets/price.liquid', type: 'liquid', label: 'price.liquid' },
  { path: 'templates/404.json', type: 'json', label: '404.json' },
  { path: 'templates/cart.json', type: 'json', label: 'cart.json' },
  { path: 'templates/collection.json', type: 'json', label: 'collection.json' },
  { path: 'templates/index.json', type: 'json', label: 'index.json' },
  { path: 'templates/page.contact.json', type: 'json', label: 'page.contact.json' },
  { path: 'templates/page.json', type: 'json', label: 'page.json' },
  { path: 'templates/password.json', type: 'json', label: 'password.json' },
  { path: 'templates/product.json', type: 'json', label: 'product.json' },
  { path: 'templates/search.json', type: 'json', label: 'search.json' }
];

export default function App() {
  const [storeView, setStoreView] = useState<'home' | 'product' | 'collection'>('home');
  const [showInspectorModal, setShowInspectorModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'code' | 'guide'>('code');
  const [selectedFile, setSelectedFile] = useState<string>('assets/base.css');
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  React.useEffect(() => {
    const loadFiles = async () => {
      const contents: Record<string, string> = {};
      for (const file of THEME_FILES) {
        try {
          const res = await fetch(`/${file.path}`);
          if (res.ok) {
            contents[file.path] = await res.text();
          } else {
            contents[file.path] = `// File content for ${file.path}`;
          }
        } catch {
          contents[file.path] = `// File content for ${file.path}`;
        }
      }
      setFileContents(contents);
    };
    loadFiles();
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const triggerAddToCart = () => {
    setCartCount(prev => prev + 1);
    setCartOpen(true);
    showToast('✨ Added to cart successfully!');
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#1B1B1B] flex flex-col font-sans selection:bg-[#D4B07B] selection:text-[#0C1626]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#D4B07B] text-[#0C1626] px-6 py-3 rounded-full shadow-2xl font-bold flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}



      {/* Header */}
      <header className="bg-[#0C1626] text-[#F5F0EB] sticky top-0 z-40 border-b border-[#D4B07B]/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#D4B07B] p-2" aria-label="Toggle menu">
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <button onClick={() => setStoreView('home')} className="text-2xl font-serif font-bold text-[#D4B07B] tracking-wide focus:outline-none">
              Gifty.in
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <button onClick={() => setStoreView('home')} className={`hover:text-[#D4B07B] transition ${storeView === 'home' ? 'text-[#D4B07B] border-b-2 border-[#D4B07B] pb-1' : ''}`}>Home</button>
            <button onClick={() => setStoreView('collection')} className={`hover:text-[#D4B07B] transition ${storeView === 'collection' ? 'text-[#D4B07B] border-b-2 border-[#D4B07B] pb-1' : ''}`}>Bangles & Sets</button>
            <button onClick={() => setStoreView('collection')} className="hover:text-[#D4B07B] transition">Gift Hampers</button>
            <button onClick={() => setStoreView('product')} className={`hover:text-[#D4B07B] transition ${storeView === 'product' ? 'text-[#D4B07B] border-b-2 border-[#D4B07B] pb-1' : ''}`}>Viral Collection</button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-5">
            <button onClick={() => showToast('🔍 Opening search...')} className="text-[#F5F0EB] hover:text-[#D4B07B] transition" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => showToast('👤 Customer account login')} className="hidden sm:block text-[#F5F0EB] hover:text-[#D4B07B] transition" aria-label="Account">
              <User className="w-5 h-5" />
            </button>
            <button onClick={() => setCartOpen(true)} className="relative text-[#F5F0EB] hover:text-[#D4B07B] transition flex items-center" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#D4B07B] text-[#0C1626] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C1626] text-[#F5F0EB] p-6 space-y-4 border-b border-[#D4B07B]/30">
          <button onClick={() => { setStoreView('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Home</button>
          <button onClick={() => { setStoreView('collection'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Bangles & Sets</button>
          <button onClick={() => { setStoreView('collection'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Gift Hampers</button>
          <button onClick={() => { setStoreView('product'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 font-medium">Viral Collection</button>
        </div>
      )}

      {/* Main Content View */}
      <main className="flex-1">
        {storeView === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="bg-[#0C1626] text-[#F5F0EB] py-20 px-6 sm:px-8 text-center relative overflow-hidden">
              <div className="max-w-3xl mx-auto relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full border border-[#D4B07B] text-[#D4B07B] text-xs font-bold uppercase tracking-widest mb-4 bg-[#D4B07B]/10">
                  India's #1 Gifting Brand
                </span>
                <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#D4B07B] mb-6">
                  Celebrate Every Bond with Gifty.in
                </h1>
                <p className="text-[#F5F0EB]/80 text-base sm:text-lg mb-8 leading-relaxed">
                  Exquisite kundan bangles, luxury gift hampers, and personalized accessories dispatched within 24 hours across India.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => setStoreView('collection')} className="btn-secondary text-base px-8 py-4">
                    Shop Viral Collection &rarr;
                  </button>
                  <button onClick={() => setStoreView('product')} className="btn-primary text-base px-8 py-4 border border-[#D4B07B]/50">
                    View Bestseller Set
                  </button>
                </div>
              </div>
            </div>

            {/* Collection List ("Shop by Category") */}
            <div className="py-16 bg-white border-b border-[#E5E0D8]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#D4B07B]/10 border border-[#D4B07B] text-[#8C6D3B] text-xs font-bold uppercase tracking-wider mb-3">Explore Categories</span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#0C1626] font-bold">Shop by Category</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { title: "Bangles", img: "https://images.unsplash.com/photo-1611591475571-124b616b6c4b?w=500&auto=format&fit=crop&q=80" },
                    { title: "Earrings", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=80" },
                    { title: "Hampers", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80" },
                    { title: "Personalized", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80" }
                  ].map((cat, idx) => (
                    <div key={idx} onClick={() => setStoreView('collection')} className="group bg-white rounded-[16px] p-4 shadow-sm hover:shadow-xl transition cursor-pointer border border-gray-100 text-center">
                      <div className="aspect-square rounded-[12px] overflow-hidden mb-4 bg-gray-100">
                        <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#0C1626] group-hover:text-[#D4B07B] transition flex items-center justify-center space-x-2">
                        <span>{cat.title}</span>
                        <span className="text-[#D4B07B]">&rarr;</span>
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Collection ("Our Viral Collection") */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-[#D4B07B]/10 border border-[#D4B07B] text-[#8C6D3B] text-xs font-bold uppercase tracking-wider mb-3">Trending in India</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#0C1626] font-bold">Our Viral Collection</h2>
                <p className="mt-3 text-gray-600">Handcrafted luxury gifts and stunning accessories loved by 50,000+ happy customers.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { title: "Royal Kundan Bangles Set", price: "₹1,499", compare: "₹2,999", img: "https://images.unsplash.com/photo-1611591475571-124b616b6c4b?w=600&auto=format&fit=crop&q=80", badge: "Dispatch within 24h" },
                  { title: "Personalized Rose Gold Couple Watch", price: "₹2,299", compare: "₹4,599", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80", badge: "Best Seller" },
                  { title: "Luxury Velvet Gift Hamper Box", price: "₹1,899", compare: "₹3,499", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80", badge: "Free Gift" },
                  { title: "Zircon Diamond Solitaire Necklace", price: "₹1,199", compare: "₹2,499", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80", badge: "Dispatch within 24h" }
                ].map((prod, idx) => (
                  <div key={idx} className="bg-white rounded-[16px] shadow-sm hover:shadow-xl transition border border-gray-100 flex flex-col justify-between overflow-hidden group">
                    <div onClick={() => setStoreView('product')} className="aspect-square bg-gray-100 relative cursor-pointer overflow-hidden">
                      <span className="absolute top-3 left-3 z-10 bg-[#0C1626] text-[#D4B07B] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D4B07B]">
                        {prod.badge}
                      </span>
                      <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[11px] text-gray-400 uppercase font-semibold">Gifty.in Exclusive</span>
                        <h3 onClick={() => setStoreView('product')} className="font-serif font-bold text-sm text-[#0C1626] mt-1 mb-2 cursor-pointer hover:text-[#D4B07B] transition line-clamp-2">
                          {prod.title}
                        </h3>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="font-bold text-base text-[#0C1626]">{prod.price}</span>
                          <span className="text-xs text-gray-400 line-through">{prod.compare}</span>
                        </div>
                        <button onClick={triggerAddToCart} className="w-full btn-primary text-xs py-2.5">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button onClick={() => setStoreView('collection')} className="btn-primary">View All Collection</button>
              </div>
            </div>

            {/* Collapsible FAQ Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-[#D4B07B]/10 border border-[#D4B07B] text-[#8C6D3B] text-xs font-bold uppercase tracking-wider mb-3">Got Questions?</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#0C1626] font-bold">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {[
                  { q: "Why Choose Gifty.in?", a: "We handcraft and curate premium Indian gifts and luxury accessories with meticulous quality checks, premium packaging, and fast pan-India delivery." },
                  { q: "Why should I choose prepaid orders?", a: "Prepaid orders enjoy priority dispatch within 24 hours, free mystery gift items included in the box, and zero COD handling fees." },
                  { q: "What are the shipping and delivery times?", a: "All orders are dispatched from our warehouse within 24 hours. Standard delivery takes 2 to 5 business days across India." },
                  { q: "What is your return and exchange policy?", a: "We offer 7-day hassle-free replacements for transit damage or defects backed by a clear unboxing video." }
                ].map((faq, idx) => (
                  <details key={idx} className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-200 group">
                    <summary className="font-serif font-bold text-base text-[#0C1626] cursor-pointer flex justify-between items-center list-none">
                      <span>{faq.q}</span>
                      <span className="text-[#D4B07B] transform group-open:rotate-180 transition text-xl">+</span>
                    </summary>
                    <p className="mt-4 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        )}

        {storeView === 'product' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="aspect-square bg-white rounded-[16px] shadow-sm border border-gray-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1611591475571-124b616b6c4b?w=800&auto=format&fit=crop&q=80" alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    "https://images.unsplash.com/photo-1611591475571-124b616b6c4b?w=300&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&auto=format&fit=crop&q=80"
                  ].map((img, i) => (
                    <div key={i} className="aspect-square rounded-[12px] overflow-hidden border-2 border-[#D4B07B] bg-white">
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#0C1626] text-[#D4B07B] text-xs font-bold uppercase tracking-wider mb-3">
                  Dispatch within 24 hours
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0C1626] mb-3">
                  Royal Kundan Bangles Set with Premium Velvet Box
                </h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-[#0C1626]">₹1,499</span>
                  <span className="text-gray-400 line-through text-lg">₹2,999</span>
                  <span className="bg-red-50 text-red-600 font-semibold px-2.5 py-1 rounded-full text-xs border border-red-200">Save 50%</span>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-4 mb-6 text-sm text-amber-900 flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-amber-700 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Fast Dispatch:</span> Order within <span className="underline font-semibold">4 hrs 12 mins</span> for guaranteed dispatch tomorrow.
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Size</label>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 rounded-lg border-2 border-[#0C1626] font-medium text-sm bg-white text-[#0C1626]">2.4 (Small)</button>
                      <button className="px-4 py-2 rounded-lg border border-gray-300 font-medium text-sm bg-white text-gray-700">2.6 (Medium)</button>
                      <button className="px-4 py-2 rounded-lg border border-gray-300 font-medium text-sm bg-white text-gray-700">2.8 (Large)</button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button onClick={triggerAddToCart} className="w-full btn-primary py-4 text-base">Add to Cart</button>
                    <button onClick={triggerAddToCart} className="w-full btn-secondary py-4 text-base">Buy It Now - Express Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {storeView === 'collection' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="bg-[#0C1626] text-[#F5F0EB] rounded-[24px] p-8 sm:p-12 mb-12">
              <span className="text-xs font-bold text-[#D4B07B] uppercase tracking-wider">Gifty.in Collection</span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#D4B07B] mt-2 mb-4">Bangles & Accessories</h1>
              <p className="text-[#F5F0EB]/80 max-w-xl text-sm sm:text-base">Discover handpicked kundan and jadau bangles designed for weddings, festivals, and special celebrations.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: "Royal Kundan Bangles Set", price: "₹1,499", compare: "₹2,999", img: "https://images.unsplash.com/photo-1611591475571-124b616b6c4b?w=600&auto=format&fit=crop&q=80", badge: "Dispatch within 24h" },
                { title: "Traditional Meenakari Jhumka Earrings", price: "₹799", compare: "₹1,599", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80", badge: "Trending" },
                { title: "Zircon Diamond Solitaire Necklace", price: "₹1,199", compare: "₹2,499", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80", badge: "Dispatch within 24h" },
                { title: "Pearl Embellished Bridal Potli Bag", price: "₹899", compare: "₹1,799", img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop&q=80", badge: "Gift Special" },
                { title: "Rose Gold Plated Evil Eye Bracelet", price: "₹699", compare: "₹1,399", img: "https://images.unsplash.com/photo-1611591475571-124b616b6c4b?w=600&auto=format&fit=crop&q=80", badge: "Best Seller" },
                { title: "Customized Photo Frame LED Lamp", price: "₹1,299", compare: "₹2,599", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80", badge: "Dispatch within 24h" }
              ].map((prod, idx) => (
                <div key={idx} className="bg-white rounded-[16px] shadow-sm hover:shadow-xl transition border border-gray-100 flex flex-col justify-between overflow-hidden group">
                  <div onClick={() => setStoreView('product')} className="aspect-square bg-gray-100 relative cursor-pointer overflow-hidden">
                    <span className="absolute top-3 left-3 z-10 bg-[#0C1626] text-[#D4B07B] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D4B07B]">
                      {prod.badge}
                    </span>
                    <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 uppercase font-semibold">Gifty.in Exclusive</span>
                      <h3 onClick={() => setStoreView('product')} className="font-serif font-bold text-sm text-[#0C1626] mt-1 mb-2 cursor-pointer hover:text-[#D4B07B] transition line-clamp-2">
                        {prod.title}
                      </h3>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="font-bold text-base text-[#0C1626]">{prod.price}</span>
                        <span className="text-xs text-gray-400 line-through">{prod.compare}</span>
                      </div>
                      <button onClick={triggerAddToCart} className="w-full btn-primary text-xs py-2.5">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0C1626] text-[#F5F0EB] pt-16 pb-12 border-t border-[#D4B07B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[#D4B07B]">Gifty.in</h3>
            <p className="text-sm text-[#F5F0EB]/80 leading-relaxed">
              India's premier destination for handcrafted luxury gifts, stunning fashion accessories, and personalized hampers. Dispatch within 24 hours.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg text-[#D4B07B] mb-4">Connect With Us</h4>
            <ul className="space-y-2.5 text-sm text-[#F5F0EB]/80">
              <li><a href="https://wa.me/917390802311" target="_blank" rel="noopener" className="hover:text-[#D4B07B] transition">WhatsApp Support</a></li>
              <li><a href="#" className="hover:text-[#D4B07B] transition">Contact Form</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg text-[#D4B07B] mb-4">Order Support</h4>
            <ul className="space-y-2.5 text-sm text-[#F5F0EB]/80">
              <li><a href="#" className="hover:text-[#D4B07B] transition">Track Your Order</a></li>
              <li><a href="#" className="hover:text-[#D4B07B] transition">Return / Exchange Policy</a></li>
              <li><a href="#" className="hover:text-[#D4B07B] transition">Shipping Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg text-[#D4B07B] mb-4">Join Gifty Club</h4>
            <p className="text-sm text-[#F5F0EB]/80 mb-4">Subscribe to receive exclusive festive discounts and secret voucher codes.</p>
            <div className="space-y-2">
              <input type="email" placeholder="Enter your email address" className="w-full px-4 py-3 rounded-full bg-[#172946] border border-[#D4B07B]/40 text-[#F5F0EB] placeholder-[#F5F0EB]/50 text-sm focus:outline-none" />
              <button onClick={() => showToast('✨ Subscribed successfully! Use code GIFT10')} className="w-full btn-secondary py-3 text-sm">Subscribe & Get 10% Off</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#D4B07B]/20 text-center text-xs text-[#F5F0EB]/60">
          <p>&copy; 2026 GIFTY.IN. ALL RIGHTS RESERVED. DESIGNED FOR LUXURY GIFTING ACROSS INDIA.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <a href="https://wa.me/917390802311" target="_blank" rel="noopener" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition flex items-center justify-center" aria-label="Chat on WhatsApp">
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Floating Theme Code / Settings Button */}
      <button 
        onClick={() => setShowInspectorModal(true)} 
        className="fixed bottom-6 left-6 z-50 bg-[#0C1626] text-[#D4B07B] border border-[#D4B07B] p-3 rounded-full shadow-2xl hover:scale-105 transition flex items-center space-x-2 text-xs font-bold px-4"
        title="View Theme Code & Guide"
      >
        <Code className="w-4 h-4" />
        <span className="hidden sm:inline">Theme Code Explorer</span>
      </button>

      {/* Theme Inspector & Code Modal */}
      {showInspectorModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#0C1626] text-[#F5F0EB] w-full max-w-5xl h-[85vh] rounded-[24px] border border-[#D4B07B]/40 flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-[#D4B07B]/30 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-[#D4B07B] text-[#0C1626] p-2 rounded-xl font-bold font-serif text-sm">G.IN</div>
                <h2 className="text-xl font-serif font-bold text-[#D4B07B]">Shopify OS 2.0 Theme Inspector & Code</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex bg-[#172946] p-1 rounded-full border border-[#D4B07B]/30">
                  <button onClick={() => setActiveTab('code')} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${activeTab === 'code' ? 'bg-[#D4B07B] text-[#0C1626]' : 'text-white'}`}>Theme Files</button>
                  <button onClick={() => setActiveTab('guide')} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${activeTab === 'guide' ? 'bg-[#D4B07B] text-[#0C1626]' : 'text-white'}`}>Deploy Guide</button>
                </div>
                <button onClick={() => setShowInspectorModal(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
            </div>

            {activeTab === 'code' ? (
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-72 bg-[#172946] border-r border-[#D4B07B]/30 p-4 overflow-y-auto">
                  <h3 className="text-xs font-bold text-[#D4B07B] uppercase tracking-wider mb-3">Theme Files ({THEME_FILES.length})</h3>
                  <div className="space-y-1">
                    {THEME_FILES.map((file) => (
                      <button
                        key={file.path}
                        onClick={() => setSelectedFile(file.path)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono transition truncate ${selectedFile === file.path ? 'bg-[#D4B07B] text-[#0C1626] font-bold' : 'text-[#F5F0EB]/80 hover:bg-white/10 hover:text-[#D4B07B]'}`}
                      >
                        {file.path}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col p-6 bg-[#060A12] overflow-hidden">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D4B07B]/20">
                    <span className="font-mono text-xs text-[#D4B07B] font-bold">/{selectedFile}</span>
                    <button onClick={() => handleCopyCode(fileContents[selectedFile] || '')} className="btn-secondary text-xs py-1 px-3 flex items-center space-x-1">
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto font-mono text-xs text-[#F5F0EB]">
                    <pre className="whitespace-pre-wrap">{fileContents[selectedFile] || '// Loading...'}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 p-8 overflow-y-auto space-y-6">
                <div className="bg-[#172946] border border-[#D4B07B]/40 rounded-xl p-6">
                  <h3 className="text-xl font-serif font-bold text-[#D4B07B] mb-3">Deploy to Shopify</h3>
                  <p className="text-sm text-[#F5F0EB]/80 mb-4">Push this repository to GitHub and connect via Shopify Admin (&gt; Online Store &gt; Themes &gt; Connect from GitHub), or push via Shopify CLI:</p>
                  <div className="bg-[#060A12] p-4 rounded-lg font-mono text-xs text-amber-300 space-y-1">
                    <p>shopify login --store your-store.myshopify.com</p>
                    <p>shopify theme push</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                <h3 className="font-serif font-bold text-xl text-[#0C1626]">Your Cart ({cartCount})</h3>
                <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-black"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <img src="https://images.unsplash.com/photo-1611591475571-124b616b6c4b?w=200&auto=format&fit=crop&q=80" alt="Item" className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-sm text-[#0C1626]">Royal Kundan Bangles Set</h4>
                    <p className="text-xs text-gray-500">Size: 2.4 (Small)</p>
                    <p className="text-sm font-bold text-[#0C1626] mt-1">₹1,499</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between font-bold text-lg text-[#0C1626]">
                <span>Subtotal</span>
                <span>₹1,499</span>
              </div>
              <p className="text-xs text-emerald-600 font-medium">✨ Free surprise luxury gift unlocked with prepaid order!</p>
              <button onClick={() => { setCartOpen(false); showToast('🚀 Redirecting to Shopify Secure Checkout...'); }} className="w-full btn-primary py-3.5 text-base">
                Proceed to Secure Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
