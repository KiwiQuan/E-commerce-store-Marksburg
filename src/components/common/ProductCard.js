import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

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

const ProductCard = ({ id, name, price, image, description }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  
  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    showNotification(`${name} added to cart!`);
  };

  return (
    <Card>
      <ImageWrapper>
        <img src={image} alt={name} />
      </ImageWrapper>
      <Content>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <Price>${price}</Price>
        <Actions>
          <ViewButton to={`/product/${id}`}>View Details</ViewButton>
          <AddButton onClick={handleAddToCart}>Add to Cart</AddButton>
        </Actions>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${fadeIn} 0.3s ease forwards;
  
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

export default ProductCard;
