import React, { useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io';
import { RootState } from "../../types/state-types";
import { useDispatch, useSelector } from "react-redux";
import { createUserAccount } from "../../store/actions/authActions";
import "firebase/firestore";
import Loader from "react-loader-spinner";
import { Background, Modal, Art, Content, Title, Info, Action,
  Form, ErrorMessage, Input, SubmitBtn, Exit } from "../../styled-components/navbar/StyledAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch({ type: "CLEANUP_LOGIN_ERROR" });
  }, [dispatch]);

  useEffect(() => {
    setLoading(false);
  }, [authState.authError])

  const signupUser = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(createUserAccount(username, email, password));
  }

  useEffect(() => {
    if(authState.user) {
      dispatch({ type: "" });
    }
  }, [authState.user, dispatch]);

  return (
    <Background>
      <Modal>
        <Art />
        <Content>
          <Title>Sign Up</Title>
          <Info>
            By continuing, you agree to our
            <a href="https://www.reddit.com/r/whatcouldgowrong/" target="_blank" rel="noopener noreferrer">
              {" "}User Agreement
            </a> and
            <a href="https://www.reddit.com/r/china/" target="_blank" rel="noopener noreferrer">
              {" "}Privacy Policy
            </a>.
          </Info>
          <Form onSubmit={signupUser}>
            <Input
              type="text"
              autoFocus
              required
              placeholder="Username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
              }}
            />
            <Input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <SubmitBtn type="submit" isLoading={loading}>
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height={40}
                  width={40}
                />
              ) : "Sign Up"}
            </SubmitBtn>
            <ErrorMessage>{authState.authError && !loading ? authState.authError!.message : ""}</ErrorMessage>
          </Form>
          <Info>Already a blueditor?
            <Action onClick={() => dispatch({ type: "LOGIN" })}> LOG IN</Action>
          </Info>
        </Content>
        <Exit as={IoMdClose} onClick={() => dispatch({ type: "" })} />
      </Modal>
    </Background>
  );
};

export default Signup;