import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import MiniCart from './MiniCart';
import { BsCart3 } from 'react-icons/bs';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
  const { cartItems, cartCount } = useCart();
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCartClick = (e) => {
    if (cartItems.length === 0) {
      e.preventDefault();
    }
    setIsMiniCartOpen(!isMiniCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderWrapper>
      <Logo to="/" onClick={closeMobileMenu}>Kiwiverse</Logo>
      
      <MobileMenuButton onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </MobileMenuButton>

      <Nav $isOpen={isMobileMenuOpen}>
        <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
        <NavLink to="/products" onClick={closeMobileMenu}>Products</NavLink>
        <CartContainer>
          <CartLink 
            to="/cart" 
            onClick={(e) => {
              handleCartClick(e);
              closeMobileMenu();
            }}
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
  position: relative;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  z-index: 1001;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #333;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  &:hover {
    color: #4CAF50;
  }
`;

const CartContainer = styled.div`
  position: relative;

  @media (max-width: 768px) {
    margin-top: 1rem;
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

export default Header;