import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { useState, useRef } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import ProductCard from '../components/common/ProductCard';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  
  if (loading) {
    return <LoadingWrapper>Loading product details...</LoadingWrapper>;
  }

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <ErrorWrapper>Product not found</ErrorWrapper>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    showNotification(`${product.name} added to cart!`);
  };

  const renderStars = (rating) => {
    // Same renderStars function as in ProductCard
  };

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4); // Show up to 4 related products

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <Wrapper>
      <ImageSection>
        {!imageLoaded && !imageError && <ImagePlaceholder />}
        {imageError ? (
          <FallbackImage>
            <span>🖼️</span>
            <small>Image not available</small>
          </FallbackImage>
        ) : (
          <ZoomWrapper>
            <ProductImage
              ref={imageRef}
              src={product.image}
              alt={product.name}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
            <ZoomLens
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomPosition({ x: 0, y: 0 })}
            />
            <ZoomedImage
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
              }}
            />
          </ZoomWrapper>
        )}
      </ImageSection>
      <ContentSection>
        <h1>{product.name}</h1>
        <Price>${product.price}</Price>
        <Description>{product.description}</Description>
        <AddToCartButton onClick={handleAddToCart}>
          Add to Cart
        </AddToCartButton>
      </ContentSection>
      
      {/* Add Related Products Section */}
      <RelatedProductsSection>
        <h2>Related Products</h2>
        <RelatedProductsGrid>
          {relatedProducts.length > 0 ? (
            relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} {...relatedProduct} />
            ))
          ) : (
            <EmptyRelated>No related products found</EmptyRelated>
          )}
        </RelatedProductsGrid>
      </RelatedProductsSection>

      <ReviewsSection>
        <h2>Reviews</h2>
        <RatingOverview>
          <AverageRating>
            <h3>{product.rating}</h3>
            <RatingStars>{renderStars(product.rating)}</RatingStars>
            <RatingCount>Based on customer reviews</RatingCount>
          </AverageRating>
        </RatingOverview>
        {/* Placeholder for future customer reviews */}
        <ReviewsList>
          <EmptyReviews>
            Be the first to review this product!
          </EmptyReviews>
        </ReviewsList>
      </ReviewsSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorWrapper = styled(LoadingWrapper)`
  color: #ff4444;
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    max-height: 500px;
    object-fit: contain;
  }
`;

const ContentSection = styled.div`
  h1 {
    margin-bottom: 1rem;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
  margin: 1rem 0;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const AddToCartButton = styled.button`
  padding: 1rem 2rem;
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

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
  transition: opacity 0.3s ease;
`;

const FallbackImage = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #666;
  border-radius: 8px;
  
  span {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  small {
    font-size: 1rem;
  }
`;

const ReviewsSection = styled.section`
  grid-column: 1 / -1;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const RatingOverview = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
`;

const AverageRating = styled.div`
  text-align: center;
  
  h3 {
    font-size: 2.5rem;
    margin: 0;
    color: #333;
  }
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #ffc107;
  margin: 0.5rem 0;
`;

const RatingCount = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ReviewsList = styled.div`
  margin-top: 2rem;
`;

const EmptyReviews = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  background: #f9f9f9;
  border-radius: 8px;
`;

const RelatedProductsSection = styled.section`
  grid-column: 1 / -1;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;

  h2 {
    margin-bottom: 2rem;
  }
`;

const RelatedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const EmptyRelated = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  background: #f9f9f9;
  border-radius: 8px;
  grid-column: 1 / -1;
`;

const ZoomWrapper = styled.div`
  position: relative;
  width: 100%;
  cursor: zoom-in;
`;

const ZoomLens = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const ZoomedImage = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 200%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  margin-left: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  ${ZoomWrapper}:hover & {
    opacity: 1;
  }
`;

export default ProductDetails;
