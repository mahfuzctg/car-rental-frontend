// src/components/TextAnimation.tsx
import React from "react";

interface TextAnimationProps {
  text: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text = "" }) => {
  // Define the keyframes and gradient styles
  const bounceAnimation = {
    animation: "bounce 2s infinite",
  };

  const gradientText = {
    background: "linear-gradient(to right, red, white, red)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    display: "inline",
  };

  // Add keyframes for bounce animation directly in the component
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      60% {
        transform: translateY(-15px);
      }
    }
  `,
    styleSheet.cssRules.length
  );

  return (
    <h1
      className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase"
      style={{ ...gradientText, ...bounceAnimation }}
    >
      {text}
    </h1>
  );
};

export default TextAnimation;
