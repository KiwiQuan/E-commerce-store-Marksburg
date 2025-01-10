import styled from 'styled-components';
import ProductCard from '../components/common/ProductCard';
import { products } from '../data/products';

const Home = () => {
  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <HomeWrapper>
      <Hero>
        <h1>Welcome to Kiwiverse</h1>
        <p>Your one-stop shop for everything kiwi</p>
      </Hero>
      <FeaturedSection>
        <h2>Featured Products</h2>
        <ProductGrid>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </ProductGrid>
      </FeaturedSection>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Home;
