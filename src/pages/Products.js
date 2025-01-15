import styled from 'styled-components';
import ProductCard from '../components/common/ProductCard';
import ProductSkeleton from '../components/common/ProductSkeleton';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import { useProducts } from '../data/products';
import EmptyState from '../components/common/EmptyState';
import { useState, useMemo } from 'react';

const Products = () => {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Define categories based on what's available in the API
  const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'popularity':
            return b.rating - a.rating;
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
  };

  return (
    <ProductsWrapper>
      <h1>Our Products</h1>
      <SearchBar onSearch={setSearchTerm} value={searchTerm} />
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      {!loading && filteredProducts.length === 0 && (
        <EmptyState
          icon="🔍"
          title="No Products Found"
          message="Try adjusting your filters or search terms."
          actionText="Clear Filters"
          onAction={handleClearFilters}
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
