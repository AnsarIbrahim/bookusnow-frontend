import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = ({
  bgColor = 'bg-white',
  textColor = '#1E2022',
  size = 'md',
  icon,
  iconPosition = 'left',
  borderColor = 'border-stroke',
  borderRadius = 'rounded-md',
  borderWidth = 'border-2',
  fontSize = 'text-xs',
  fontFamily = 'font-inter',
  fontweight = 'font-medium',
  type = 'button',
  to = '/',
  iconColor,
  children,
  onClick,
}) => {
  const classes = `
    ${bgColor} 
    ${textColor} 
    ${borderColor}
    ${borderWidth}
    ${fontSize}
    ${fontFamily}
    ${fontweight}
    ${borderRadius}
    ${size === 'sm' ? 'py-1 px-2 text-sm' : ''}
    ${size === 'md' ? 'py-2 px-4 text-base' : ''}
    ${size === 'lg' ? 'py-3 px-6 text-lg' : ''}
    flex items-center justify-center
    transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110
  `;

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={`${iconColor} mr-0 ml-2 text-lg p-1 rounded-full`}>
          {icon}
        </span>
      )}
      <div className="px-2 py-2">{children}</div>
      {icon && iconPosition === 'right' && (
        <span className={`${iconColor} ml-2 text-lg p-1 rounded-full`}>
          {icon}
        </span>
      )}
    </>
  );

  if (type === 'link') {
    return (
      <NavLink to={to} className={`${classes} px-3`}>
        {content}
      </NavLink>
    );
  }

  return (
    <button type={type} className={`${classes} px-3`} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
