import styled from "styled-components";
import backgroundImg from "../../assets/auth-background.webp";

const Background = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .33);
  z-index: 1005;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  position: relative;
  height: 100vh;
  max-height: 40.5rem;
  width: 53rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 5px 20px #373737;
  display: flex;
`;

const Exit = styled.svg`
  position: absolute;
  top: .7rem;
  right: .7rem;
  font-size: 1.8rem;
  color: #808080;
  cursor: pointer;
`;

const Art = styled.div`
  background-image: url("${backgroundImg}");
  height: 100%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  width: 8.1rem;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Content = styled.div`
  width: calc(100% - 8.1rem);
  height: 100%;
  padding: 3rem 2rem;
`;

const Title = styled.h3`
  font-weight: 600;
  margin-bottom: .4rem;
`;

const Info = styled.p`
  font-size: .8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 17rem;
  margin-top: 4rem;
`;

const ErrorMessage = styled.p`
  min-height: 6rem;
  color: red;
`;

const Input = styled.input`
  height: 3rem;
  padding: .5rem;
  position: relative;
  font-size: 1rem;
  background-color: #fcfcfb;
  border: 1px solid #e2e2e1;
  outline: none;
  border-radius: 4px;
  margin: 1rem 0;
  &:hover {
    background-color: white;
    border-color: #dadad9;
  }
  &:focus {
    background-color: white;
    border-color: ${({ theme }) => theme.colors.main};
  }
  &:-webkit-autofill::first-line {
    font-size: 1rem;
  }
`;

const SubmitBtn = styled.button<{ isLoading?: boolean }>`
  background-color: ${({ theme }) => theme.colors.alt};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: ${({ isLoading }) => isLoading? "0" : ".7rem"};
  border: none;
  border-radius: 9999px;
  margin: 1rem 0;
  &:hover {
    background-color: ${({ theme }) => theme.colors.altHover};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.altActive};
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Action = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.alt};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.altHover};
  }
`;

export { Background, Modal, Art, Content, Title, Info, Action,
         Form, ErrorMessage, Input, SubmitBtn, Exit };