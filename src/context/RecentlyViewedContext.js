import { createContext, useState, useContext, useEffect } from 'react';

const RecentlyViewedContext = createContext();

const RECENTLY_VIEWED_LIMIT = 3;

export function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prevItems => {
      // Remove the product if it already exists
      const filteredItems = prevItems.filter(item => item.id !== product.id);
      
      // Add the new product at the beginning
      const newItems = [product, ...filteredItems];
      
      // Limit to 3 items
      return newItems.slice(0, RECENTLY_VIEWED_LIMIT);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return (
    <RecentlyViewedContext.Provider value={{ 
      recentlyViewed, 
      addToRecentlyViewed,
      clearRecentlyViewed
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext);
}
