import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: .5rem .5rem .5rem 1rem;
  font-weight: 400;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #edeff1;
  background-color: white;
  outline: none;
  font-family: "Source Sans Pro", sans-serif;
  margin-right: .5rem;
  &:focus {
    border: 1px solid black;
  }
`;

const TitleInput = styled(Input)`
  margin-bottom: .5rem;
`;

const TextInput = styled.textarea`
  width: 100%;
  min-height: 10rem;
  padding: .8rem 1rem;
  resize: vertical;
  font-weight: 400;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #edeff1;
  background-color: white;
  outline: none;
  font-family: "Source Sans Pro", sans-serif;
  margin-right: .5rem;
  &:focus {
    border: 1px solid black;
  }
`;

const LinkInput = styled(TextInput)`
  min-height: 4rem;
  resize: none;
`;

const BtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Btn = styled.button`
  padding: .5rem 1rem;
  margin: 0 .3rem;
  font-weight: 600;
  border-radius: 9999px;
  @media (max-width: 1200px) {
    margin: .1rem;
  }
`;

const CancelBtn = styled(Btn)`
  color: ${({theme}) => theme.colors.alt};
  background-color: white;
  border: 1px solid ${({theme}) => theme.colors.alt};
  &:hover {
    background-color: #ffebe9;
  }
  &:active {
    background-color: #ffd5d0;
  }
`;

const SubmitBtn = styled(Btn)`
  border: 1px solid ${({ theme }) => theme.colors.alt};
  background-color: ${({ theme }) => theme.colors.alt};
  color: white;
  margin-right: 0;
  &:hover {
    background-color: ${({ theme }) => theme.colors.altHover};
    border: 1px solid ${({ theme }) => theme.colors.altHover};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.altActive};
    border: 1px solid ${({ theme }) => theme.colors.altActive};
  }
`;

export { FormContainer, BtnsWrapper, SubmitBtn, CancelBtn, LinkInput, TitleInput, TextInput };
