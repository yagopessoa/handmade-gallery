import styled from 'styled-components';

import { BODY_TEXT_COLOR } from '../../_constants';

// TODO: add responsiveness

export const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 32px;
  padding-top: 0;
`;

export const CardContent = styled.div`
  width: 774px;
  max-width: calc(100vw - 128px);
  height: fit-content;
  display: flex;
`;

export const Image = styled.img.attrs(() => ({ alt: '' }))`
  width: 100%;
  height: auto;
`;

export const LeftContent = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightContent = styled.div`
  max-width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 32px;

  h1 {
    margin-bottom: 16px;
  }

  span {
    font-size: 14px;
    color: ${BODY_TEXT_COLOR};
  }

  button {
    margin-top: 32px;
    width: fit-content;
  }
`;
