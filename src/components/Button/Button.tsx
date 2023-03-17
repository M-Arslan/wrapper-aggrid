import React, { useState } from 'react';

interface ButtonProps {
   onClick?: () => void;
}

const Button:React.FC<ButtonProps> = (props) => {
  const [name, setName] = useState("Click me");

  return (
    <button 
    {...props}
  >
  {name}
  </button>
  )
}

export default Button