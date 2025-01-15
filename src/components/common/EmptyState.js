import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const EmptyState = ({ 
  title, 
  message, 
  actionText, 
  onAction, 
  icon = "🛍️" 
}) => {
  return (
    <EmptyStateWrapper>
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
      <Message>{message}</Message>
      {actionText && onAction && (
        <ActionButton onClick={onAction}>
          {actionText}
        </ActionButton>
      )}
    </EmptyStateWrapper>
  );
};

const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #45a049;
  }
`;

export default EmptyState;
