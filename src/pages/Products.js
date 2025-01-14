import styled from 'styled-components';
import ProductCard from '../components/common/ProductCard';
import ProductSkeleton from '../components/common/ProductSkeleton';
import { useProducts } from '../data/products';

const Products = () => {
  const { products, loading } = useProducts();

  return (
    <ProductsWrapper>
      <h1>Our Products</h1>
      <ProductGrid>
        {loading ? (
          // Show 8 skeleton cards while loading
          [...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          products.map(product => (
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
