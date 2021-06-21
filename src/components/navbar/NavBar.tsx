import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaRegUser, FiSearch, IoLogInOutline, FiChevronDown, GrAdd } from "react-icons/all";
import icon from "../../assets/icon.svg";
import logo from "../../assets/logo.webp";
import profile from "../../assets/profile.svg";
import { logout } from "../../store/actions/authActions";
import useOutSideAlerter from "../../utils/useOutSideAlerter";
import { RootState } from "../../types/state-types";
import { useSelector, useDispatch } from "react-redux";
import { filterPosts } from "../../utils/utils";
import { NavContainer, SearchContainer, IconImg, LogoImg, LogoContainer, ResultCard, ResultContent,
         AuthBtnContainer, ProfileContainer, LoginBtn, ProfileDropDown, SearchResultsDropdown, Input,
         SignUpBtn, AuthContainer, SearchIconContainer, ProfileItem, ResultTitle, CreatePostBtn, UserContainer }
  from "../../styled-components/navbar/StyledNavBar";

type NavBarProps = {
  viewPostComments: any;
  posts: any[];
};

const NavBar = ({ viewPostComments, posts }: NavBarProps) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const profileRef = useRef(null);
  const profileRef2 = useRef(null);
  const searchResultRef = useRef(null);
  const history = useHistory();
  useOutSideAlerter(profileRef, setProfileDropdownOpen, profileRef2);
  useOutSideAlerter(searchResultRef, setSearchResultsOpen);

  const handleSearchInput = (input: string) => {
    setSearchResultsOpen(true);
    setSearchInput(input);

    const results = filterPosts(posts, searchInput);
    setSearchResults(results);
  };

  const handleProfileClick = () => {
    if(authState.user) {
      dispatch(logout());
    }
    else {
      dispatch({ type: "LOGIN"});
    }
    setProfileDropdownOpen(false);
  };

  const viewSearchResult = (postId: number, url: string) => {
    viewPostComments(postId);
    history.push(`/comments/${postId}/${url}`);
    setSearchResultsOpen(false);
    setSearchInput("");
  }

  return (
    <NavContainer>
      <Link to="/">
        <LogoContainer>
          <IconImg src={icon} alt="icon" />
          <LogoImg src={logo} alt="logo" />
        </LogoContainer>
      </Link>
      <SearchContainer>
        <SearchIconContainer>
          <FiSearch />
        </SearchIconContainer>
        <Input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => handleSearchInput(e.target.value)}
        />
        {searchResultsOpen &&
          <SearchResultsDropdown ref={searchResultRef} loggedIn={false}>
            {searchInput.length > 0 && searchResults.length === 0 ? (
              <ResultCard key="no-results">
                <ResultTitle>No results found...</ResultTitle>
                <ResultContent>...</ResultContent>
              </ResultCard>
            ) : (
              <>
                {searchResults.map((post: any, idx: number) => {
                  const url = post.title
                    .replace(/\W/g, "")
                    .toLowerCase();
                  return (
                    <ResultCard
                      key={idx}
                      onClick={() => viewSearchResult(post.id, url)}
                    >
                      <ResultTitle>{post.title}</ResultTitle>
                      <ResultContent>{post.postText}</ResultContent>
                    </ResultCard>
                  )
                })}
              </>
            )}
          </SearchResultsDropdown>
        }
      </SearchContainer>
      <AuthContainer>
        {!authState.user ? (
          <AuthBtnContainer>
            <LoginBtn onClick={() => dispatch({ type: "LOGIN" })}>Log In</LoginBtn>
            <SignUpBtn onClick={() => dispatch({ type: "SIGNUP" })}>Sign Up</SignUpBtn>
          </AuthBtnContainer>
        ) : (
          <Link to="/submit"><CreatePostBtn><GrAdd /></CreatePostBtn></Link>
        )
        }
        <ProfileContainer
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          loggedIn={!!authState.user}
          ref={profileRef2}
          active={profileDropdownOpen}
        >
          {!authState.user ? (
            <FaRegUser />
          ) : (
            <UserContainer>
              <img src={profile} alt="profile picture" />
              <p>{authState.user!.username}</p>
            </UserContainer>
          )}
          <FiChevronDown />
        </ProfileContainer>
        {profileDropdownOpen &&
            <ProfileDropDown ref={profileRef}>
              <ProfileItem
                clickable={true}
                onClick={() => handleProfileClick()}
              >
                <div>
                  <IoLogInOutline />
                  <p>
                    {authState.user ? "Log Out" : "Log In / Sign Up"}
                  </p>
                </div>
              </ProfileItem>
            </ProfileDropDown>
        }
      </AuthContainer>
    </NavContainer>
  )
};

export default NavBar;