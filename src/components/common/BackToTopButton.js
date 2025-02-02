import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowCircleUp } from "react-icons/fa";

const Button = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 1000;
  display: block;
 
  transition: all 0.3s ease;


  svg {
    color: #007bff;
    font-size: 3rem;
    
    &:hover {
      color: #0056b3;
      transform: translateY(-3px);
    }
  }
`;


    const BackToTopButton = () => {
    const [showBtn, setShowBtn] = useState("myBtn none");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction();
    };
  
    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setShowBtn("myBtn");
      } else {
        setShowBtn("none");
      }
    }
  
    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
    
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    

  return (
    <Button>
      <FaArrowCircleUp
        onClick={topFunction}
        id="myBtn"
        className={showBtn}
        aria-label="Scroll to top"
      />
    </Button>
  );
};

export default BackToTopButton;