import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const QuickView = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const handleAddToCart = () => {
    addToCart(product);
    showNotification('Added to cart!');
    onClose();
  };

  if (!product) return null;

  return (
    <QuickViewOverlay onClick={onClose}>
      <QuickViewContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <QuickViewGrid>
          <ImageSection>
            <ProductImage src={product.image} alt={product.name} />
          </ImageSection>
          
          <ContentSection>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>${product.price}</ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>
            
            <AddToCartButton onClick={handleAddToCart}>
              Add to Cart
            </AddToCartButton>
            
            <ViewDetailsButton to={`/product/${product.id}`}>
              View Full Details
            </ViewDetailsButton>
          </ContentSection>
        </QuickViewGrid>
      </QuickViewContent>
    </QuickViewOverlay>
  );
};

const QuickViewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const QuickViewContent = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const QuickViewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const ProductPrice = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #4CAF50;
`;

const ProductDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const AddToCartButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background: #45a049;
  }
`;

const ViewDetailsButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  display: block;
  
  &:hover {
    background: #e0e0e0;
    color: #333;
  }
`;

export default QuickView;