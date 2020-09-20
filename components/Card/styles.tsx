import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ChildContainer = styled(motion.div).attrs(() => ({
  variants: {
    hidden: { opacity: 0, transform: 'translateY(120px)' },
    show: { opacity: 1, transform: 'translateY(0px)' },
  },
}))`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
  border-radius: 32px;
  padding: 32px;
`;

export const MainContainer = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 15,
  },
}))`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
  border-radius: 32px;
  padding: 32px;
`;
