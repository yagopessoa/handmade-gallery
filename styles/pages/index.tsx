import styled from 'styled-components';

export const HeadingContainer = styled.div`
  padding: 32px 40px 0 40px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
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
