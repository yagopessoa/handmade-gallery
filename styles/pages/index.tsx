import { motion } from 'framer-motion';
import styled from 'styled-components';

export const HeadingContainer = styled.div`
  padding: 32px 40px 0 40px;
`;

export const Container = styled(motion.div).attrs(() => ({
  variants: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
  initial: 'hidden',
  animate: 'show',
}))`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 24px;

  & > div {
    margin: 16px;
  }
`;

export const CardContent = styled.div`
  width: 280px;
  max-width: calc(100vw - 144px);
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    width: 100%;
  }
`;

export const Image = styled.img.attrs(() => ({ alt: '' }))`
  width: auto;
  max-width: 100%;
  height: 243px;
  margin-bottom: 16px;
`;
