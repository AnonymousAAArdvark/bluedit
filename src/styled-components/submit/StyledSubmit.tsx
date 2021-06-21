import styled, { css } from "styled-components";

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5rem .7rem;
  @media (max-width: 960px) {
    padding: 1.5rem 1.3rem;
  }
  @media (max-width: 640px) {
    padding: .5rem .5rem;
  }
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 46rem;
  margin: .7rem;
  @media (max-width: 960px) {
    max-width: none;
  }
  @media (max-width: 640px) {
    margin: .7rem 0;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding: .2rem 0 1rem .3rem;
  border-bottom: 1px solid #edeff1;
`;

const Title = styled.h2`
  font-weight: 400;
  font-size: 1.2rem;
  color: black;
`;

const PostInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  margin-top: 1rem;
`;

const PostTypeSelector = styled.div`
  display: flex;
  width: 100%;
`;

const TypeSelect = styled.div<{ active?: boolean }>`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  border: 1px solid ${({theme}) => theme.colors.mainBorder};
  border-top: none;
  border-right: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.vote};
  font-weight: 500;
  font-size: .95rem;
  svg {
    font-size: 1.4rem;
    margin-right: .5rem;
  }
  &:first-of-type {
    border-left: none;
    border-top-left-radius: 5px;
  }
  &:last-of-type {
    border-top-right-radius: 5px;
  }
  &:hover {
    background-color: #ffebe7;
  }
  ${({ active }) => active && css`
    border-bottom: 2px solid ${({ theme }) => theme.colors.alt};
    color: ${({ theme }) => theme.colors.alt};
    padding-top: .1rem;
  `}
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 19.5rem;
  min-width: 19.5rem;
  margin: 1.7rem .7rem .7rem .7rem;
  @media (max-width: 960px) {
    display: none;
  }
`;

export { SubmitContainer, TypeSelect, PostTypeSelector, Title,
         PostInputContainer, TitleWrapper, FeedContainer, SideBarContainer };