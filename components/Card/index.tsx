import React from 'react';
import { MainContainer, ChildContainer } from './styles';

interface CardProps {
  isChild?: boolean;
}

const Card: React.FC<CardProps> = ({ children, isChild = false }) => {
  if (isChild) return <ChildContainer>{children}</ChildContainer>;
  return <MainContainer>{children}</MainContainer>;
};

export default Card;
