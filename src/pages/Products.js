import styled from 'styled-components';
import ProductCard from '../components/common/ProductCard';
import ProductSkeleton from '../components/common/ProductSkeleton';
import SearchBar from '../components/common/SearchBar';
import { useProducts } from '../data/products';
import EmptyState from '../components/common/EmptyState';
import { useState, useMemo } from 'react';

const Products = () => {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    return products.filter(product => {
      const searchFields = [
        product.name,
        product.description,
        product.category,
      ].map(field => field?.toLowerCase() || '');

      return searchFields.some(field => 
        field.includes(searchTerm.toLowerCase())
      );
    });
  }, [products, searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <ProductsWrapper>
      <h1>Our Products</h1>
      <SearchBar onSearch={setSearchTerm} value={searchTerm} />
      
      {!loading && filteredProducts.length === 0 && (
        <EmptyState
          icon="🔍"
          title="No Products Found"
          message="We couldn't find any products matching your search."
          actionText="Clear Search"
          onAction={handleClearSearch}
        />
      )}

      <ProductGrid>
        {loading ? (
          [...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </ProductGrid>
    </ProductsWrapper>
  );
};

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ProductsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

export default Products;
