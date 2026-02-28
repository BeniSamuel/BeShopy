import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import vendorsData from "../Data/Vendors/vendors";
import productData from "../Data/OurProduct/sale";

const VendorContext = createContext();

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error("useVendor must be used within VendorProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
const VendorProvider = ({ children }) => {
  const [vendors] = useState(() => {
    const saved = localStorage.getItem("beshopy_vendors");
    return saved ? JSON.parse(saved) : vendorsData;
  });

  const [currentVendor, setCurrentVendor] = useState(() => {
    const saved = localStorage.getItem("beshopy_current_vendor");
    return saved ? JSON.parse(saved) : null;
  });

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem("beshopy_vendor_subscriptions");
    return saved ? JSON.parse(saved) : [];
  });

  const [vendorProductState, setVendorProductState] = useState(() => {
    const saved = localStorage.getItem("beshopy_vendor_product_state");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("beshopy_vendors", JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem(
      "beshopy_current_vendor",
      JSON.stringify(currentVendor)
    );
  }, [currentVendor]);

  useEffect(() => {
    localStorage.setItem(
      "beshopy_vendor_subscriptions",
      JSON.stringify(subscriptions)
    );
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem("beshopy_vendor_product_state", JSON.stringify(vendorProductState));
  }, [vendorProductState]);

  const loginVendor = (email) => {
    const vendor = vendors.find((v) => v.email === email);
    if (!vendor) {
      toast.error("Vendor not found");
      return false;
    }
    setCurrentVendor(vendor);
    toast.success(`Welcome back, ${vendor.name}`);
    return true;
  };

  const logoutVendor = () => {
    setCurrentVendor(null);
    toast.success("Logged out of vendor dashboard");
  };

  const subscribeToVendor = (vendorId) => {
    setSubscriptions((prev) => {
      if (prev.includes(vendorId)) {
        toast("Already subscribed to this vendor");
        return prev;
      }
      toast.success("Subscribed to vendor");
      return [...prev, vendorId];
    });
  };

  const unsubscribeFromVendor = (vendorId) => {
    setSubscriptions((prev) => {
      const next = prev.filter((id) => id !== vendorId);
      toast.success("Unsubscribed from vendor");
      return next;
    });
  };

  const isSubscribedToVendor = (vendorId) => {
    return subscriptions.includes(vendorId);
  };

  const getVendorById = (vendorId) =>
    vendors.find((v) => v.id === vendorId) || null;

  const getVendorProducts = (vendorId) => {
    const state = vendorProductState[vendorId] || { added: [], deletedIds: [], edits: {} };
    const fromData = productData
      .filter((p) => p.vendorId === vendorId && !state.deletedIds.includes(p.id))
      .map((p) => (state.edits[p.id] ? { ...p, ...state.edits[p.id] } : p));
    return [...fromData, ...state.added];
  };

  const getAllProducts = () => {
    const allAdded = Object.values(vendorProductState).flatMap((s) => s.added || []);
    const allDeleted = new Set(Object.values(vendorProductState).flatMap((s) => s.deletedIds || []));
    const fromData = productData.filter((p) => !allDeleted.has(p.id));
    const editsMap = {};
    Object.values(vendorProductState).forEach((s) => {
      Object.entries(s.edits || {}).forEach(([id, ed]) => {
        editsMap[id] = { ...editsMap[id], ...ed };
      });
    });
    const mergedData = fromData.map((p) => (editsMap[p.id] ? { ...p, ...editsMap[p.id] } : p));
    return [...mergedData, ...allAdded];
  };

  const addVendorProduct = (vendorId, product) => {
    const id = `vp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const newProduct = {
      id,
      vendorId,
      vendorName: vendors.find((v) => v.id === vendorId)?.name || "",
      imgSource: product.imgSource || productData[0]?.imgSource,
      description: product.description || "New Product",
      price: Number(product.price) || 0,
      rating: Number(product.rating) || 4.5,
    };
    setVendorProductState((prev) => ({
      ...prev,
      [vendorId]: {
        ...(prev[vendorId] || { added: [], deletedIds: [], edits: {} }),
        added: [...(prev[vendorId]?.added || []), newProduct],
      },
    }));
    toast.success("Product added successfully");
    return newProduct;
  };

  const updateVendorProduct = (vendorId, productId, updates) => {
    const state = vendorProductState[vendorId] || { added: [], deletedIds: [], edits: {} };
    const inAdded = state.added.find((p) => p.id === productId);
    if (inAdded) {
      setVendorProductState((prev) => ({
        ...prev,
        [vendorId]: {
          ...(prev[vendorId] || { added: [], deletedIds: [], edits: {} }),
          added: (prev[vendorId]?.added || []).map((p) =>
            p.id === productId ? { ...p, ...updates } : p
          ),
        },
      }));
    } else {
      setVendorProductState((prev) => ({
        ...prev,
        [vendorId]: {
          ...(prev[vendorId] || { added: [], deletedIds: [], edits: {} }),
          edits: { ...(prev[vendorId]?.edits || {}), [productId]: { ...(prev[vendorId]?.edits?.[productId] || {}), ...updates } },
        },
      }));
    }
    toast.success("Product updated");
  };

  const deleteVendorProduct = (vendorId, productId) => {
    const state = vendorProductState[vendorId] || { added: [], deletedIds: [], edits: {} };
    const inAdded = state.added.find((p) => p.id === productId);
    if (inAdded) {
      setVendorProductState((prev) => ({
        ...prev,
        [vendorId]: {
          ...(prev[vendorId] || { added: [], deletedIds: [], edits: {} }),
          added: (prev[vendorId]?.added || []).filter((p) => p.id !== productId),
        },
      }));
    } else {
      setVendorProductState((prev) => ({
        ...prev,
        [vendorId]: {
          ...(prev[vendorId] || { added: [], deletedIds: [], edits: {} }),
          deletedIds: [...(prev[vendorId]?.deletedIds || []), productId],
        },
      }));
    }
    toast.success("Product removed");
  };

  const getSubscribedVendors = () =>
    subscriptions
      .map((id) => vendors.find((v) => v.id === id))
      .filter(Boolean);

  const getVendorAnalytics = (vendorId) => {
    const products = getVendorProducts(vendorId);
    const totalProducts = products.length;
    const avgPrice =
      products.reduce((sum, p) => sum + p.price, 0) / (totalProducts || 1);
    const avgRating =
      products.reduce((sum, p) => sum + (p.rating || 0), 0) /
      (totalProducts || 1);

    const subscriberCount = subscriptions.filter((id) => id === vendorId).length;

    const estimatedMonthlyIncome = subscriberCount * avgPrice * 1.5;

    return {
      totalProducts,
      avgPrice,
      avgRating,
      subscriberCount,
      estimatedMonthlyIncome,
    };
  };

  return (
    <VendorContext.Provider
      value={{
        vendors,
        currentVendor,
        loginVendor,
        logoutVendor,
        subscriptions,
        subscribeToVendor,
        unsubscribeFromVendor,
        isSubscribedToVendor,
        getVendorById,
        getVendorProducts,
        getAllProducts,
        addVendorProduct,
        updateVendorProduct,
        deleteVendorProduct,
        getSubscribedVendors,
        getVendorAnalytics,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export default VendorProvider;

