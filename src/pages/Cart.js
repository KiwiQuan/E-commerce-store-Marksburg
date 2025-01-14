import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/common/EmptyState';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // You can modify this based on your needs
  const total = subtotal + shipping;

  return (
    <CartWrapper>
      <h1>Your Cart</h1>
      <CartContent>
        <CartItems>
          {cartItems.length === 0 ? (
            <EmptyCartContainer>
              <EmptyState
                icon="🛒"
                title="Your Cart is Empty"
                message="Looks like you haven't added anything to your cart yet."
                actionText="Start Shopping"
                actionLink="/products"
              />
            </EmptyCartContainer>
          ) : (
            <>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
              <ContinueShoppingWrapper>
                <ContinueShoppingLink to="/products">
                  ← Continue Shopping
                </ContinueShoppingLink>
              </ContinueShoppingWrapper>
            </>
          )}
        </CartItems>
        {cartItems.length > 0 && (
          <CartSummary>
            <h2>Order Summary</h2>
            <SummaryItem>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </SummaryItem>
            <Total>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </Total>
            <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
          </CartSummary>
        )}
      </CartContent>
    </CartWrapper>
  );
};

const CartWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
`;

const CartItems = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const EmptyCart = styled.p`
  text-align: center;
  color: #666;
`;

const CartSummary = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  color: #666;
`;

const Total = styled(SummaryItem)`
  font-weight: bold;
  color: #333;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  background: #4CAF50;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 2rem;
  
  &:hover {
    background: #45a049;
  }
`;

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  if (!item) return null;

  return (
    <CartItemWrapper>
      <ItemImage>
        <img src={item.image} alt={item.name} />
      </ItemImage>
      <ItemInfo>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
        <QuantityControls>
          <QuantityButton 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </QuantityButton>
          <QuantityDisplay>{item.quantity}</QuantityDisplay>
          <QuantityButton 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </QuantityButton>
        </QuantityControls>
      </ItemInfo>
      <RemoveButton onClick={() => removeFromCart(item.id)}>
        Remove
      </RemoveButton>
    </CartItemWrapper>
  );
};

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
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

const ItemName = styled.h3`
  margin: 0 0 0.5rem;
`;

const ItemPrice = styled.span`
  color: #4CAF50;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  padding: 0.5rem 1rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #cc0000;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  padding: 0.25rem 0.5rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background: #e0e0e0;
  }
`;

const QuantityDisplay = styled.span`
  padding: 0.25rem 0.5rem;
  min-width: 2rem;
  text-align: center;
`;

const EmptyCartContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ContinueShoppingWrapper = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const ContinueShoppingLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  color: #4CAF50;
  text-decoration: none;
  border: 1px solid #4CAF50;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #4CAF50;
    color: white;
  }
`;

export default Cart;
