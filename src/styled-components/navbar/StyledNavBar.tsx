import styled from "styled-components";

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 3rem;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainBorder};
  font-family: "Source Sans Pro", sans-serif;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  image-rendering: -moz-crisp-edges;         /* Firefox */
  image-rendering:   -o-crisp-edges;         /* Opera */
  image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;  /* IE (non-standard property) */
  margin-right: 1.5rem;
`;

const IconImg = styled.img`
  height: 2.3rem;
  padding: 0 .2rem;
`;

const LogoImg = styled.img`
  margin-top: .2rem;
  height: 2rem;
  @media (max-width: 1050px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
`;

const SearchIconContainer = styled.div`
  position: absolute;
  pointer-events: none;
  font-size: 1.5rem;
  margin: .3rem 0 0 1rem;
  color: ${({ theme }) => theme.colors.grey};
`;

const SearchResultsDropdown = styled.div<{ loggedIn?: boolean }>`
  position: absolute;
  width: ${({ loggedIn }) => loggedIn ? "calc(100% - 13.5rem)" : "calc(100% - 21.5rem)"};
  max-height: 26rem;
  max-width: 40rem;
  overflow: scroll;
  top: 3rem;
  background: white;
  border: 1px solid ${({theme}) => theme.colors.mainBorder};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 2px 5px #cdcdcd;
  z-index: 2;
  @media (max-width: 600px) {
    width: ${({ loggedIn }) => loggedIn ? "calc(100% - 13.5rem)" : "calc(100% - 11rem)"};
  }
`;

const ResultCard = styled.div`
  height: 6.5rem;
  overflow: hidden;
  cursor: pointer;
  padding: .7rem;
  &:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.search};
  }
`;

const ResultTitle = styled.div`
  color: ${({ theme }) => theme.colors.alt};
  font-size: 1.2rem;
  overflow: hidden;
  height: 2rem;
  cursor: pointer;
`;

const ResultContent = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  height: 3rem;
`;

const Input = styled.input`
  width: 100%;
  max-width: 40rem;
  padding: .5rem .5rem .5rem 3rem;
  font-weight: 400;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #edeff1;
  background-color: ${({ theme }) => theme.colors.search};
  outline: none;
  font-family: "Source Sans Pro", sans-serif;
  &:hover, &:focus {
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.alt};
  }
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const AuthBtnContainer = styled.div`
  display: flex;
  min-width: 10.5rem;
  @media (max-width: 600px) {
    display: none;
  }
`;

const AuthBtn = styled.button`
  padding: .5rem 1rem;
  margin: .5rem;
  font-weight: 600;
  border-radius: 9999px;
  @media (max-width: 1200px) {
    margin: .1rem;
  }
`

const LoginBtn = styled(AuthBtn)`
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

const SignUpBtn = styled(AuthBtn)`
  border: 1px solid ${({ theme }) => theme.colors.alt};
  background-color: ${({ theme }) => theme.colors.alt};
  color: white;
  &:hover {
    background-color: ${({ theme }) => theme.colors.altHover};
    border: 1px solid ${({ theme }) => theme.colors.altHover};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.altActive};
    border: 1px solid ${({ theme }) => theme.colors.altActive};
  }
`;

const CreatePostBtn = styled.button`
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 50%;
  font-size: 1.3rem;
  border: none;
  background: none;
  margin-right: .5rem;
  &:hover {
    background-color: #e8e8e8;
  }
`;

const ProfileContainer = styled.div<{ loggedIn?: boolean, active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ loggedIn }) => loggedIn ? "space-between" : "flex-start"};
  height: ${({ loggedIn }) => loggedIn ? "2.6rem" : "2rem" };
  padding: ${({ loggedIn }) => loggedIn ? "0 .4rem 0 .7rem" : "0 .8rem 0 1rem"};
  width: ${({ loggedIn }) => loggedIn ? "13.5rem" : "fit-content"};
  margin-right: ${({ loggedIn }) => loggedIn ? ".7rem" : "1rem"};
  border: 1px solid ${({ active }) => active ? "#edeff1" : "transparent"};
  border-radius: 5px;
  cursor: pointer;
  &:hover, &:focus {
    border: 1px solid #edeff1;
  }
  svg {
    color: ${({ theme }) => theme.colors.grey};
    font-size: 1.4rem;
  }
  @media (max-width: 1200px) {
    margin-left: ${({ loggedIn }) => loggedIn ? "0" : ".5rem"};
    padding: 0 .2rem 0 .5rem;
    width: fit-content;
    p {
      display: none;
    }
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  p {
    width: 8.5rem;
  }
  img {
    width: 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    margin-right: .5rem;
  }
`;

const ProfileDropDown = styled.div`
  position: absolute;
  top: 2.6rem;
  right: 0;
  width: 13.5rem;
  z-index: 2;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProfileItem = styled.div<{ clickable?: boolean }>`
  display: flex;
  align-items: center;
  height: 2.5rem;
  background: white;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  cursor: ${({ clickable }) => clickable ? "pointer" : null};
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background: ${({ theme }) => theme.colors.altHover};
    color: white;
    svg {
      color: white;
    }
  }
  svg {
    font-size: 1.5rem;
    margin: 0 .5rem;
  }
  div {
    display: flex;
    p {
      font-size: 1rem;
    }
  }
`;

export { Input, AuthBtnContainer, NavContainer, LoginBtn, LogoContainer, ProfileContainer, ResultContent,
         SignUpBtn, IconImg, LogoImg, SearchContainer, AuthContainer, SearchIconContainer, CreatePostBtn,
         ProfileItem, ProfileDropDown, SearchResultsDropdown, ResultCard, ResultTitle, UserContainer };
