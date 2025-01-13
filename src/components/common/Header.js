import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import MiniCart from './MiniCart';

const Header = () => {
  const { cartCount } = useCart();
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  return (
    <HeaderWrapper>
      <Logo to="/">Kiwiverse</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <CartContainer>
          <CartLink 
            to="#" 
            onClick={(e) => {
              e.preventDefault();
              setIsMiniCartOpen(!isMiniCartOpen);
            }}
            onMouseEnter={() => setIsMiniCartOpen(true)}
          >
            Cart {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </CartLink>
          <MiniCart 
            isOpen={isMiniCartOpen} 
            onClose={() => setIsMiniCartOpen(false)} 
          />
        </CartContainer>
      </Nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  &:hover {
    color: #4CAF50;
  }
`;

const CartLink = styled(NavLink)`
  position: relative;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -12px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
`;

const CartContainer = styled.div`
  position: relative;
`;

export default Header;