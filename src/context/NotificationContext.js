import { createContext, useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <NotificationWrapper type={notification.type}>
          {notification.message}
        </NotificationWrapper>
      )}
    </NotificationContext.Provider>
  );
}

const NotificationWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 2rem;
  background: ${props => props.type === 'success' ? '#4CAF50' : '#ff4444'};
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1000;
  animation: ${slideIn} 0.3s ease forwards;
  
  &.closing {
    animation: ${slideOut} 0.3s ease forwards;
  }
`;

export function useNotification() {
  return useContext(NotificationContext);
}
