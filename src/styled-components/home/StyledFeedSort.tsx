import styled, { css } from "styled-components";

const FeedSortWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  padding: .4rem;
  margin: .5rem 0 .7rem 0;
`;

const Btn = styled.button<{ selected?: boolean }>`
  background: none;
  color: ${({ theme }) => theme.colors.vote};
  border: none;
  border-radius: 9999px;
  margin: .3rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  svg {
    margin-right: .4rem;
  }
  &:hover {
    background-color: #ededed;
  }
  &:active {
    background-color: #c2c3c4;
  }
  ${({ selected }) => selected && css`
    color: ${({ theme }) => theme.colors.alt};
    background-color: ${({ theme }) => theme.colors.search};
  `}
`;

const TopBtn = styled(Btn)`
  padding: .48rem .7rem .48rem .6rem;
  svg {
    font-size: 1.1rem;
  }
`;

const NewBtn = styled(Btn)`
  padding: .35rem .7rem .35rem .5rem;
  svg {
    font-size: 1.4rem;
  }
`;

const OldBtn = styled(Btn)`
  padding: .35rem .7rem .35rem .5rem;
  svg {
    font-size: 1.4rem;
  }
`;

export { FeedSortWrapper, NewBtn, TopBtn, OldBtn};
