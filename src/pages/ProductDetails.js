import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { useState } from 'react';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  if (loading) {
    return <LoadingWrapper>Loading product details...</LoadingWrapper>;
  }

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <ErrorWrapper>Product not found</ErrorWrapper>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    showNotification(`${product.name} added to cart!`);
  };

  return (
    <Wrapper>
      <ImageSection>
        {!imageLoaded && !imageError && <ImagePlaceholder />}
        {imageError ? (
          <FallbackImage>
            <span>🖼️</span>
            <small>Image not available</small>
          </FallbackImage>
        ) : (
          <ProductImage
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        )}
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

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorWrapper = styled(LoadingWrapper)`
  color: #ff4444;
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    max-height: 500px;
    object-fit: contain;
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

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
  transition: opacity 0.3s ease;
`;

const FallbackImage = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #666;
  border-radius: 8px;
  
  span {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  small {
    font-size: 1rem;
  }
`;

export default ProductDetails;
