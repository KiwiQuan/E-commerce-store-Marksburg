import styled from 'styled-components';
import ProductCard from '../components/common/ProductCard';
import ProductSkeleton from '../components/common/ProductSkeleton';
import { useProducts } from '../data/products';

const Home = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <HomeWrapper>
      <Hero>
        <h1>Welcome to Marksburg</h1>
        <p>Your one-stop shop for everything</p>
      </Hero>
      <FeaturedSection>
        <h2>Featured Products</h2>
        <ProductGrid>
          {loading ? (
            // Show 4 skeleton cards while loading
            [...Array(4)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </ProductGrid>
      </FeaturedSection>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: #f5f5f5;
  margin-bottom: 2rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const FeaturedSection = styled.section`
  padding: 2rem;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

export default Home;
