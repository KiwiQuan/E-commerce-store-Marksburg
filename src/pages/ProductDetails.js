import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Wrapper>
      <ImageSection>
        <img src={product.image} alt={product.name} />
      </ImageSection>
      <ContentSection>
        <h1>{product.name}</h1>
        <Price>${product.price}</Price>
        <Description>{product.description}</Description>
        <AddToCartButton onClick={handleAddToCart}>
          Add to Cart
        </AddToCartButton>
      </ContentSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const ContentSection = styled.div`
  h1 {
    margin-bottom: 1rem;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
  margin: 1rem 0;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const AddToCartButton = styled.button`
  padding: 1rem 2rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  
  &:hover {
    background: #45a049;
  }
`;

export default ProductDetails;
