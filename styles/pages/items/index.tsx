import styled from 'styled-components';
import { Button } from 'gestalt';

import { BODY_TEXT_COLOR } from '../../_constants';

export const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 32px;
`;

export const CardContent = styled.div`
  width: 774px;
  max-width: calc(100vw - 128px);
  height: fit-content;
  display: flex;

  @media (max-width: 902px) {
    flex-direction: column;
    align-items: center;
  }
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

  @media (max-width: 686px) {
    width: 100%;
  }
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

  @media (max-width: 902px) {
    width: 100%;
    padding-left: 0;

    h1 {
      margin-top: 16px;
    }

    button {
      width: 100%;
    }
  }

  @media (max-width: 686px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 64px;

  button {
    width: fit-content;
  }
`;
