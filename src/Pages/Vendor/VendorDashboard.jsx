import { useState, useMemo } from "react";
import Navbar from "../../Components/Home/Navbar/Navbar";
import Footer from "../../Components/Home/Footer/Footer";
import { useVendor } from "../../Context/VendorProvider";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const PRODUCTS_PER_PAGE = 12;
const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A–Z" },
];

const ProductModal = ({ product, onClose, onSave, isEdit }) => {
  const [form, setForm] = useState({
    description: product?.description || "",
    price: product?.price?.toString() || "",
    rating: product?.rating?.toString() || "4.5",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim()) {
      toast.error("Product name is required");
      return;
    }
    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) {
      toast.error("Enter a valid price");
      return;
    }
    onSave({
      description: form.description.trim(),
      price,
      rating: parseFloat(form.rating) || 4.5,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slideUp">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-poppins font-bold text-[#224F34]">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h3>
          <p className="text-sm text-[#6F6F6F] font-poppins mt-1">
            {isEdit ? "Update product details" : "Add a new product to your catalog"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-poppins font-medium text-[#224F34] mb-2">Product Name</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="e.g. Summer Dress"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-poppins focus:border-[#224F34] outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium text-[#224F34] mb-2">Price ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              placeholder="0.00"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-poppins focus:border-[#224F34] outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium text-[#224F34] mb-2">Rating (1–5)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={form.rating}
              onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg font-poppins focus:border-[#224F34] outline-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-[#224F34] text-[#224F34] rounded-lg font-poppins hover:bg-[#F8FFF9] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#224F34] text-white rounded-lg font-poppins hover:bg-[#1a3d28] transition-all"
            >
              {isEdit ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ productName, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-slideUp">
      <h3 className="text-lg font-poppins font-bold text-[#224F34] mb-2">Remove Product?</h3>
      <p className="font-poppins text-[#6F6F6F] mb-6">
        &quot;{productName}&quot; will be removed from your catalog. This cannot be undone.
      </p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg font-poppins hover:bg-gray-50">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-poppins hover:bg-red-700">
          Remove
        </button>
      </div>
    </div>
  </div>
);

const VendorDashboard = () => {
  const {
    currentVendor,
    getVendorProducts,
    getVendorAnalytics,
    addVendorProduct,
    updateVendorProduct,
    deleteVendorProduct,
    logoutVendor,
  } = useVendor();
  const [activeTab, setActiveTab] = useState("overview");
  const [productSearch, setProductSearch] = useState("");
  const [productSort, setProductSort] = useState("default");
  const [productPage, setProductPage] = useState(1);
  const [productModal, setProductModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  if (!currentVendor) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8FFF9]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <h1 className="text-2xl font-poppins font-bold text-[#224F34] mb-4">Vendor Dashboard</h1>
            <p className="font-poppins text-[#267D49] mb-4">You need to login as a vendor to access the dashboard.</p>
            <Link to="/vendor/login" className="inline-block bg-[#224F34] text-white font-poppins font-semibold px-8 py-3 rounded-full hover:bg-[#1a3d28] transition-all">
              Go to Vendor Login
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const products = getVendorProducts(currentVendor.id);
  const analytics = getVendorAnalytics(currentVendor.id);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    if (productSearch) {
      const q = productSearch.toLowerCase();
      result = result.filter((p) => p.description?.toLowerCase().includes(q));
    }
    switch (productSort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "name":
        result.sort((a, b) => (a.description || "").localeCompare(b.description || ""));
        break;
      default:
        break;
    }
    return result;
  }, [products, productSearch, productSort]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE) || 1;
  const paginatedProducts = filteredAndSortedProducts.slice(
    (productPage - 1) * PRODUCTS_PER_PAGE,
    productPage * PRODUCTS_PER_PAGE
  );

  const handleAddProduct = (data) => {
    addVendorProduct(currentVendor.id, data);
    setProductModal(null);
  };

  const handleEditProduct = (data) => {
    if (productModal?.id) {
      updateVendorProduct(currentVendor.id, productModal.id, data);
      setProductModal(null);
    }
  };

  const handleDeleteProduct = () => {
    if (deleteTarget) {
      deleteVendorProduct(currentVendor.id, deleteTarget.id);
      setDeleteTarget(null);
      setProductPage(1);
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "products", label: "Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { id: "analytics", label: "Sales Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { id: "subscribers", label: "Subscribers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { id: "ai-insights", label: "AI Insights", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FFF9]">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row">
        <aside className="lg:w-64 bg-[#224F34] text-white p-6 lg:min-h-[calc(100vh-5rem)]">
          <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-poppins transition-all whitespace-nowrap ${
                  activeTab === item.id ? "bg-[#C5F5D6] text-[#224F34] font-semibold" : "text-[#C2EFD4] hover:bg-white/10"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <button onClick={logoutVendor} className="flex items-center gap-3 px-4 py-3 rounded-lg font-poppins text-[#C2EFD4] hover:bg-white/10 transition-all w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#224F34] font-poppins">
              {activeTab === "overview" && "Overview"}
              {activeTab === "products" && "Your Products"}
              {activeTab === "analytics" && "Sales Analytics"}
              {activeTab === "subscribers" && "Subscribers"}
              {activeTab === "ai-insights" && "AI Insights"}
            </h1>
            <p className="font-poppins text-[#267D49] mt-1">Welcome back, {currentVendor.name}</p>
          </div>

          {/* Overview tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#224F34]">
                  <p className="font-poppins text-sm text-[#6F6F6F] mb-1">Total Products</p>
                  <p className="font-poppins text-3xl font-bold text-[#224F34]">{analytics.totalProducts}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#6BC785]">
                  <p className="font-poppins text-sm text-[#6F6F6F] mb-1">Avg. Price</p>
                  <p className="font-poppins text-3xl font-bold text-[#224F34]">${analytics.avgPrice.toFixed(2)}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#A3F3BE]">
                  <p className="font-poppins text-sm text-[#6F6F6F] mb-1">Avg. Rating</p>
                  <p className="font-poppins text-3xl font-bold text-[#224F34]">{analytics.avgRating.toFixed(1)} ⭐</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#267D49]">
                  <p className="font-poppins text-sm text-[#6F6F6F] mb-1">Est. Monthly Income</p>
                  <p className="font-poppins text-3xl font-bold text-[#224F34]">${analytics.estimatedMonthlyIncome.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-poppins font-bold text-[#224F34] mb-4">Business Health</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-[#F8FFF9] rounded-lg">
                      <span className="font-poppins text-[#224F34]">Catalog size</span>
                      <span className={`font-poppins font-semibold ${analytics.totalProducts >= 5 ? "text-green-600" : "text-amber-600"}`}>
                        {analytics.totalProducts >= 5 ? "Good" : "Add more products"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#F8FFF9] rounded-lg">
                      <span className="font-poppins text-[#224F34]">Avg. rating</span>
                      <span className={`font-poppins font-semibold ${analytics.avgRating >= 4 ? "text-green-600" : "text-amber-600"}`}>
                        {analytics.avgRating >= 4 ? "Strong" : "Room to improve"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-poppins font-bold text-[#224F34] mb-4">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => { setActiveTab("products"); setProductModal({}); }} className="px-4 py-2 bg-[#224F34] text-white rounded-lg font-poppins hover:bg-[#1a3d28] transition-all text-sm">
                      + Add Product
                    </button>
                    <Link to="/shop" className="px-4 py-2 border-2 border-[#224F34] text-[#224F34] rounded-lg font-poppins hover:bg-[#F8FFF9] transition-all text-sm">
                      View in Shop
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-poppins font-bold text-[#224F34] mb-2">Top Products (by rating)</h3>
                <p className="font-poppins text-sm text-[#6F6F6F] mb-4">Your best-performing items</p>
                {products.length === 0 ? (
                  <p className="font-poppins text-[#6F6F6F] text-sm">No products yet. Add your first product!</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {[...products]
                      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                      .slice(0, 5)
                      .map((p) => (
                        <span key={p.id} className="px-3 py-1.5 bg-[#F8FFF9] rounded-lg font-poppins text-sm text-[#224F34]">
                          {p.description} ({p.rating} ⭐)
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Products tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => { setProductSearch(e.target.value); setProductPage(1); }}
                    className="px-4 py-2 border-2 border-[#224F34] rounded-lg font-poppins outline-none focus:ring-2 focus:ring-[#6BC785]"
                  />
                  <select
                    value={productSort}
                    onChange={(e) => { setProductSort(e.target.value); setProductPage(1); }}
                    className="px-4 py-2 border-2 border-[#224F34] rounded-lg font-poppins outline-none bg-white"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setProductModal({})}
                  className="px-6 py-2 bg-[#224F34] text-white rounded-lg font-poppins hover:bg-[#1a3d28] transition-all flex items-center gap-2 shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Product
                </button>
              </div>

              <p className="font-poppins text-sm text-[#6F6F6F]">
                {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? "s" : ""} • Page {productPage} of {totalPages}
              </p>

              {filteredAndSortedProducts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <p className="font-poppins text-[#6F6F6F] mb-4">
                    {productSearch ? "No products match your search." : "No products yet. Add your first product!"}
                  </p>
                  {!productSearch && (
                    <button onClick={() => setProductModal({})} className="px-6 py-2 bg-[#224F34] text-white rounded-lg font-poppins hover:bg-[#1a3d28]">
                      Add Product
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedProducts.map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                        <div className="bg-[#F2F2F2] p-4 flex justify-center items-center h-40">
                          <img src={p.imgSource} alt={p.description} className="h-full object-contain" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-poppins font-semibold text-[#224F34] mb-1 line-clamp-2">{p.description}</h3>
                          <p className="font-poppins text-sm text-[#267D49] mb-3">${p.price.toFixed(2)} • {p.rating} ⭐</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setProductModal(p)}
                              className="flex-1 px-3 py-1.5 text-sm border-2 border-[#224F34] text-[#224F34] rounded-lg font-poppins hover:bg-[#F8FFF9] transition-all"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteTarget(p)}
                              className="px-3 py-1.5 text-sm border-2 border-red-600 text-red-600 rounded-lg font-poppins hover:bg-red-50 transition-all"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 pt-4">
                      <button
                        onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                        disabled={productPage === 1}
                        className="px-4 py-2 border-2 border-[#224F34] rounded-lg font-poppins disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F8FFF9]"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 font-poppins text-[#224F34]">
                        {productPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => setProductPage((p) => Math.min(totalPages, p + 1))}
                        disabled={productPage === totalPages}
                        className="px-4 py-2 border-2 border-[#224F34] rounded-lg font-poppins disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F8FFF9]"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Analytics tab */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-poppins font-bold text-[#224F34] mb-4">Sales Overview</h3>
                <div className="h-48 bg-[#F8FFF9] rounded-lg flex items-center justify-center border-2 border-dashed border-[#C5F5D6]">
                  <p className="font-poppins text-[#6F6F6F] text-sm">Chart placeholder — connect backend for sales data</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-poppins font-bold text-[#224F34] mb-4">Revenue by Period</h3>
                <div className="h-48 bg-[#F8FFF9] rounded-lg flex items-center justify-center border-2 border-dashed border-[#C5F5D6]">
                  <p className="font-poppins text-[#6F6F6F] text-sm">Revenue chart — connect backend</p>
                </div>
              </div>
            </div>
          )}

          {/* Subscribers tab */}
          {activeTab === "subscribers" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-poppins font-bold text-[#224F34] mb-4">Subscriber Insights</h3>
              <p className="font-poppins text-[#267D49] text-sm mb-6">Customer subscription data will appear here when connected to your backend.</p>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-4 bg-[#F8FFF9] rounded-lg">
                  <span className="font-poppins text-[#224F34]">Total Subscribers</span>
                  <span className="font-poppins font-bold text-[#224F34]">—</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#F8FFF9] rounded-lg">
                  <span className="font-poppins text-[#224F34]">New Subscribers (This Month)</span>
                  <span className="font-poppins font-bold text-[#224F34]">—</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Insights tab */}
          {activeTab === "ai-insights" && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-poppins font-bold text-[#224F34] mb-4">AI Advice</h3>
                <p className="font-poppins text-[#267D49] text-sm mb-6">Connect Hugging Face or your AI model to get personalized insights here.</p>
                <div className="space-y-4">
                  <div className="p-4 bg-[#F8FFF9] rounded-lg border-l-4 border-[#224F34]">
                    <p className="font-poppins font-semibold text-[#224F34]">Pricing suggestion</p>
                    <p className="font-poppins text-sm text-[#6F6F6F]">AI will analyze your products and suggest optimal pricing.</p>
                  </div>
                  <div className="p-4 bg-[#F8FFF9] rounded-lg border-l-4 border-[#224F34]">
                    <p className="font-poppins font-semibold text-[#224F34]">Promotion timing</p>
                    <p className="font-poppins text-sm text-[#6F6F6F]">AI will recommend the best time to run promotions.</p>
                  </div>
                  <div className="p-4 bg-[#F8FFF9] rounded-lg border-l-4 border-[#224F34]">
                    <p className="font-poppins font-semibold text-[#224F34]">Inventory insights</p>
                    <p className="font-poppins text-sm text-[#6F6F6F]">AI will analyze trends and suggest stock levels.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {productModal && (
        <ProductModal
          product={productModal.id ? productModal : null}
          onClose={() => setProductModal(null)}
          onSave={productModal.id ? handleEditProduct : handleAddProduct}
          isEdit={!!productModal.id}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          productName={deleteTarget.description}
          onConfirm={handleDeleteProduct}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default VendorDashboard;
