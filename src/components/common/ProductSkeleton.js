import styled, { keyframes } from 'styled-components';

const ProductSkeleton = () => {
  return (
    <SkeletonWrapper>
      <ImageSkeleton />
      <ContentSkeleton>
        <TitleSkeleton />
        <PriceSkeleton />
        <ButtonSkeleton />
      </ContentSkeleton>
    </SkeletonWrapper>
  );
};

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonWrapper = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const ImageSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 200px;
`;

const ContentSkeleton = styled.div`
  padding: 1rem;
`;

const TitleSkeleton = styled(SkeletonBase)`
  height: 24px;
  width: 80%;
  margin-bottom: 0.5rem;
  border-radius: 4px;
`;

const PriceSkeleton = styled(SkeletonBase)`
  height: 20px;
  width: 40%;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

const ButtonSkeleton = styled(SkeletonBase)`
  height: 40px;
  width: 100%;
  border-radius: 4px;
`;

export default ProductSkeleton;
