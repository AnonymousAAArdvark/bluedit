import React from "react";
import styled from "styled-components";

const Resources = () => {
  return (
    <ResourcesWrapper>
      <ResourceTable>
        <Item
          href="https://www.npmjs.com/package/axios"
          target="_blank" rel="noopener noreferrer"
        >
          Axios
        </Item>
        <Item
          href="https://date-fns.org/"
          target="_blank" rel="noopener noreferrer"
        >
          date-fns
        </Item>
        <Item
          href="https://firebase.google.com/"
          target="_blank" rel="noopener noreferrer"
        >
          Firebase
        </Item>
        <Item
          href="https://reactjs.org/"
          target="_blank" rel="noopener noreferrer"
        >
          Reactjs
        </Item>
        <Item
          href="https://react-icons.github.io/react-icons/"
          target="_blank" rel="noopener noreferrer"
        >
          React-Icons
        </Item>
        <Item
          href="https://www.npmjs.com/package/react-loader-spinner"
          target="_blank" rel="noopener noreferrer"
        >
          React-Loader-Spinner
        </Item>
        <Item
          href="https://reactrouter.com/"
          target="_blank" rel="noopener noreferrer"
        >
          React-Router
        </Item>
        <Item
          href="https://www.npmjs.com/package/redux-thunk"
          target="_blank" rel="noopener noreferrer"
        >
          Redux-Thunk
        </Item>
        <Item
          href="https://redux.js.org/"
          target="_blank" rel="noopener noreferrer">
          Redux
        </Item>
        <Item
          href="https://styled-components.com/"
          target="_blank" rel="noopener noreferrer"
        >
          Styled-Components
        </Item>
        <Item
          href="https://www.typescriptlang.org/"
          target="_blank" rel="noopener noreferrer"
        >
          TypeScript
        </Item>
        <Item
          href="https://www.npmjs.com/package/uuid/"
          target="_blank" rel="noopener noreferrer"
        >
          uuid
        </Item>
      </ResourceTable>
      <CopyRight>AnonymousAAArdvark © 2021. All rights reserved</CopyRight>
    </ResourcesWrapper>
  );
};

const ResourcesWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 3.5rem;
  background-color: white;
  padding: .8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  margin: .5rem 0 .3rem 0;
`;

const ResourceTable = styled.div`
  display: grid;
  gap: .3rem;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1.4rem;
`;

const Item = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: .8rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const CopyRight = styled.p`
  font-size: .8rem;
`;

export default Resources;