import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CheckoutWrapper>
      <h1>Checkout</h1>
      <CheckoutContent>
        <Form>
          <h2>Shipping Information</h2>
          <FormGroup>
            <Label>Full Name</Label>
            <Input type="text" placeholder="John Doe" />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" placeholder="john@example.com" />
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input type="text" placeholder="123 Main St" />
          </FormGroup>
          <FormGroup>
            <Label>City</Label>
            <Input type="text" placeholder="City" />
          </FormGroup>
          <SubmitButton>Place Order (${total.toFixed(2)})</SubmitButton>
        </Form>
        <OrderSummary>
          <h2>Order Summary</h2>
          {cartItems.map(item => (
            <OrderItem key={item.id}>
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </OrderItem>
          ))}
          <Total>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </Total>
        </OrderSummary>
      </CheckoutContent>
    </CheckoutWrapper>
  );
};

const CheckoutWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CheckoutContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
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

const OrderSummary = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  color: #666;
`;

const Total = styled(OrderItem)`
  font-weight: bold;
  color: #333;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
`;

export default Checkout;
