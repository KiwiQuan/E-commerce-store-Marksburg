import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const MiniCart = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <MiniCartWrapper onMouseLeave={onClose}>
      <CartHeader>
        <h3>Cart ({cartItems.length})</h3>
      </CartHeader>
      <CartItems>
        {cartItems.length === 0 ? (
          <EmptyCart>Your cart is empty</EmptyCart>
        ) : (
          cartItems.map(item => (
            <CartItem key={item.id}>
              <ItemImage>
                <img src={item.image} alt={item.name} />
              </ItemImage>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemQuantity>{item.quantity} × ${item.price}</ItemQuantity>
              </ItemInfo>
            </CartItem>
          ))
        )}
      </CartItems>
      {cartItems.length > 0 && (
        <CartFooter>
          <Total>
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </Total>
          <Actions>
            <ViewCartButton to="/cart" onClick={onClose}>
              View Cart
            </ViewCartButton>
            <CheckoutButton to="/checkout" onClick={onClose}>
              Checkout
            </CheckoutButton>
          </Actions>
        </CartFooter>
      )}
    </MiniCartWrapper>
  );
};

const MiniCartWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 0.5rem;
`;

const CartHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  h3 {
    margin: 0;
    font-size: 1rem;
  }
`;

const CartItems = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const EmptyCart = styled.div`
  padding: 1rem;
  text-align: center;
  color: #666;
`;

const CartItem = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const ItemImage = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const ItemQuantity = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const CartFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

const Button = styled(Link)`
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
`;

const ViewCartButton = styled(Button)`
  background: #f5f5f5;
  color: #333;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const CheckoutButton = styled(Button)`
  background: #4CAF50;
  color: white;
  
  &:hover {
    background: #45a049;
  }
`;

export default MiniCart;
