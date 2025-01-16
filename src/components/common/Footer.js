import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <div>
          <h3>Marksburg</h3>
          <p>Your one-stop shop for everything</p>
        </div>
        <FooterLinks>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </FooterLinks>
      </FooterContent>
      <Copyright>
        © {new Date().getFullYear()} Marksburg. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: #333;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  
  h3 {
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 4rem;
  
  h4 {
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      cursor: pointer;
      
      &:hover {
        color: #4CAF50;
      }
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #444;
`;

export default Footer;
