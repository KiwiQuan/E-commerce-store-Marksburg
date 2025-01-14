import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import MiniCart from './MiniCart';
import { BsCart3 } from 'react-icons/bs';

const Header = () => {
  const { cartItems, cartCount } = useCart();
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const handleCartClick = (e) => {
    if (cartItems.length === 0) {
      e.preventDefault();
    }
    setIsMiniCartOpen(!isMiniCartOpen);
  };

  return (
    <HeaderWrapper>
      <Logo to="/">Kiwiverse</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <CartContainer>
          <CartLink 
            to="/cart" 
            onClick={handleCartClick}
            onMouseEnter={() => setIsMiniCartOpen(true)}
            $isEmpty={cartItems.length === 0}
          >
            <BsCart3 size={24} />
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
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

const CartLink = styled(Link)`
  position: relative;
  color: #333;
  text-decoration: none;
  cursor: ${props => props.$isEmpty ? 'default' : 'pointer'};
  opacity: ${props => props.$isEmpty ? 0.6 : 1};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.$isEmpty ? '#333' : '#4CAF50'};
  }
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