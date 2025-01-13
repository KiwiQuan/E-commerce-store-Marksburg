import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        // Transform the data to match your product structure
        const transformedData = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          image: item.image,
          description: item.description
        }));
        setProducts(transformedData);
        setLoading(false);
      });
  }, []);

  return { products, loading };
};


