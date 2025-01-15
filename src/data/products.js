import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        
        // Transform the data to match our app's structure
        const transformedData = data.map(product => ({
          id: product.id,
          name: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          category: product.category, // The API provides this
          rating: product.rating.rate
        }));
        
        setProducts(transformedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};


