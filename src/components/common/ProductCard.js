import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { useState } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import QuickView from './QuickView';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const ProductCard = ({ id, name, price, image, rating, description, category }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  
  const product = { id, name, price, image, rating, description, category };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ id, name, price, image });
    showNotification(`${name} added to cart!`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" />);
    }
    
    // Add empty stars
    while (stars.length < 5) {
      stars.push(<BsStar key={`empty-${stars.length}`} />);
    }

    return stars;
  };

  return (
    <CardWrapper>
      <Card>
        <ImageWrapper>
          {!imageLoaded && !imageError && <ImagePlaceholder />}
          {imageError ? (
            <FallbackImage>
              <span>🖼️</span>
              <small>Image not available</small>
            </FallbackImage>
          ) : (
            <ProductImage
              src={image}
              alt={name}
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
          )}
        </ImageWrapper>
        <Content>
          <Title>{name}</Title>
          <RatingWrapper>
            {renderStars(rating)}
            <RatingText>({rating})</RatingText>
          </RatingWrapper>
          <Price>${price}</Price>
          <Actions>
            <ViewButton to={`/product/${id}`}>View Details</ViewButton>
            <AddButton onClick={handleAddToCart}>Add to Cart</AddButton>
          </Actions>
        </Content>
      </Card>

      <QuickViewButton 
        onClick={(e) => {
          e.preventDefault();
          setShowQuickView(true);
        }}
      >
        Quick View
      </QuickViewButton>

      {showQuickView && (
        <QuickView 
          product={product} 
          onClose={() => setShowQuickView(false)} 
        />
      )}
    </CardWrapper>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  z-index: 2;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Price = styled.span`
  display: block;
  font-size: 1.25rem;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled(Link)`
  flex: 1;
  padding: 0.5rem;
  text-align: center;
  background: #f5f5f5;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const AddButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #45a049;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
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
  height: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease;
`;

const FallbackImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #666;
  
  span {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  small {
    font-size: 0.8rem;
  }
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0.5rem 0;
  color: #ffc107; /* Star color */
`;

const RatingText = styled.span`
  color: #666;
  margin-left: 0.5rem;
  font-size: 0.9rem;
`;

const QuickViewButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem 1.5rem;
  background: rgba(76, 175, 80, 0.9);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 3;
  
  &:hover {
    background: rgba(76, 175, 80, 1);
    transform: scale(1.05);
  }
`;

const CardWrapper = styled.div`
  position: relative;
  
  &:hover {
    ${Card} {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        pointer-events: none;
        z-index: 1;
      }
    }
    
    ${QuickViewButton} {
      opacity: 1;
    }
  }
`;

export default ProductCard;
