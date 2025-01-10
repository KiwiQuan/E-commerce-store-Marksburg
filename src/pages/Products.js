import styled from 'styled-components';
import ProductCard from '../components/common/ProductCard';
import { products } from '../data/products';

const Products = () => {
  return (
    <ProductsWrapper>
      <h1>Our Products</h1>
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ProductGrid>
    </ProductsWrapper>
  );
};

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
