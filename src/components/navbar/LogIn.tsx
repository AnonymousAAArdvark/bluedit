import React, { useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io';
import { RootState } from "../../types/state-types";
import { useSelector, useDispatch } from "react-redux";
import { logInExistingUser } from "../../store/actions/authActions";
import Loader from "react-loader-spinner"
import { Background, Modal, Art, Content, Title, Info, Action,
         Form, ErrorMessage, Input, SubmitBtn, Exit } from "../../styled-components/navbar/StyledAuth";

const Login = () => {
  const [email, setEmail] = useState("");
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

  const logInUser = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(logInExistingUser(email, password));
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
          <Title>Login</Title>
          <Info>
            By continuing, you agree to our
            <a href="https://www.reddit.com/r/whatcouldgowrong/" target="_blank" rel="noopener noreferrer">
              {" "}User Agreement
            </a> and
            <a href="https://www.reddit.com/r/china/" target="_blank" rel="noopener noreferrer">
              {" "}Privacy Policy
            </a>.
          </Info>
          <Form onSubmit={logInUser}>
            <Input
              type="email"
              autoFocus
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
              ) : "Log In"}
            </SubmitBtn>
            <ErrorMessage>{authState.authError && !loading ? authState.authError!.message : ""}</ErrorMessage>
          </Form>
          <Info>New to Bluedit?
            <Action onClick={() => dispatch({ type: "SIGNUP" })}> SIGN UP</Action>
          </Info>
        </Content>
        <Exit as={IoMdClose} onClick={() => dispatch({ type: "" })} />
      </Modal>
    </Background>
  );
};

export default Login;