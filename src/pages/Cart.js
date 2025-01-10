import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0; // You can modify this based on your needs
  const total = subtotal + shipping;

  return (
    <CartWrapper>
      <h1>Your Cart</h1>
      <CartContent>
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
                  <ItemPrice>${item.price}</ItemPrice>
                </ItemInfo>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  Remove
                </RemoveButton>
              </CartItem>
            ))
          )}
        </CartItems>
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

const CartItem = styled.div`
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

export default Cart;
