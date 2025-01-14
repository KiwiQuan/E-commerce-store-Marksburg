import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then(data => {
        const transformedData = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          image: item.image,
          description: item.description
        }));
        
        setProducts(transformedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  return { products, loading };
};


