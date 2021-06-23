import styled, { css } from "styled-components";

const LinkWrapper = styled.div`
  cursor: pointer;
  margin-top: .2rem;
  margin-bottom: 1.2rem;
  margin-left: .5rem;
  display: flex;
  align-items: center;
  width: fit-content;
  color: ${({ theme }) => theme.colors.alt};
  a {
    font-size: .8rem;
  }
  svg {
    font-size: .9rem;
    margin-left: .2rem;
    border-bottom: 1px solid transparent;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.alt};
    text-decoration: underline;
    svg {
      border-bottom: 1px solid ${({ theme }) => theme.colors.alt};
    }
`;

const PreviewImage = styled.div<{ img: string }>`
  position: absolute;
  top: 1.4rem;
  right: .3rem;
  margin: 0 .3rem;
  width: 9rem;
  height: 6rem;
  border: 1px solid ${({ theme }) => theme.colors.alt};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.alt};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  ${({ img }) => img !== "none" && css`
    background-image: url(${img});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  `};
  svg {
    &:first-of-type {
      position: absolute;
      align-self: flex-end;
      justify-self: flex-end;
      margin-left: 7.7rem;
      padding: .2rem 0 .1rem .2rem;
      border-top-left-radius: 3px;
      border-bottom-right-radius: 3px;
      font-size: 1.15rem;
      color: white;
      background-color: ${({ theme }) => theme.colors.alt};
    }
  }
`;

export { LinkWrapper, PreviewImage };