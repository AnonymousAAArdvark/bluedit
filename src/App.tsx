import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import Submit from "./components/submit/Submit";
import Comments from "./components/comments/Comments";
import Login from "./components/navbar/LogIn";
import Signup from "./components/navbar/SignUp";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./types/state-types";
import { SORT_OPTIONS } from "./utils/utils";
import firebase from "./firebase";
import "firebase/firestore";

const App = () => {
  const modalState = useSelector((state: RootState) => state.modal);
  const feedSortState = useSelector((state: RootState) => state.feedSort);
  const authState = useSelector((state: RootState) => state.auth);
  const [posts, setPosts]: any = useState([]);
  const [postData, setPostData]: any = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const newPosts: any[] = [];
    const subscribe = () => {
      firebase
        .firestore()
        .collection("posts")
        .orderBy(
          SORT_OPTIONS[feedSortState.sort].column,
          SORT_OPTIONS[feedSortState.sort].direction,
        )
        .orderBy(
          SORT_OPTIONS[feedSortState.sort].column2,
          SORT_OPTIONS[feedSortState.sort].direction2,
        )
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const post = doc.data();
            newPosts.unshift({ id: doc.id, ...post });
          });
          setPosts(newPosts);
        })
        .catch((error) => console.error(error));
    };

    subscribe();

    return () => subscribe();
  }, [feedSortState.sort]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const db = firebase.firestore();
        const userRef = await db.collection("users").doc(user.uid).get();
        const userData = userRef.data();
        dispatch({type: "USER_UPDATED", payload: userData});
        // firebase.firestore()
        //   .collection("users")
        //   .doc(user.uid)
        //   .get()
        //   .then((res) => {
        //     const data = res.data();
        //     dispatch({ type: "USER_UPDATED", payload: data });
        //   })
        //   .catch((error) => console.error(error));
      }
      // else {
      //   dispatch({type: "USER_UPDATED", payload: null});
      // }
    });
  }, []);

  const viewPostComments = (id: string) => {
    const post = posts.filter((post: any) => post.id === id);
    setPostData(post[0]);
  }

  const castPostVote = (
    event: any,
    direction: string,
    id: string,
    vote: number,
    setUserVote: any,
    homeOrComments: any
  ) => {
    event.stopPropagation();
    if(authState.user) {
      let newVoteCount: number;
      if(authState.user.postVotes[id] === direction) {
        direction === "up"
          ? (newVoteCount = vote - 1)
          : (newVoteCount = vote + 1);
        direction = "";
      }
      else {
        if(authState.user.postVotes[id] === "up") {
          newVoteCount = vote - 2;
        }
        else if(authState.user.postVotes[id] === "down") {
          newVoteCount = vote + 2;
        }
        else {
          direction === "up"
            ? (newVoteCount = vote + 1)
            : (newVoteCount = vote - 1);
        }
      }

      // if(homeOrComments === "home") {
      //   const newPosts = posts.map((post: any) => {
      //     if(post.id === id) {
      //       post.vote = newVoteCount;
      //     }
      //     return post;
      //   });
      //   setPosts(newPosts);
      // }
      // else {
      //   const updatedPostData = { ...postData };
      //   updatedPostData.vote = newVoteCount;
      //   setPostData(updatedPostData);
      // }
      const newPosts = posts.map((post: any) => {
        if(post.id === id) {
          post.vote = newVoteCount;
        }
        return post;
      });
      setPosts(newPosts);
      if(homeOrComments !== "home") {
        const updatedPostData = { ...postData };
        updatedPostData.vote = newVoteCount;
        setPostData(updatedPostData);
      }

      const newUserVotes = { ...authState.user.postVotes };
      newUserVotes[id] = direction;

      setUserVote(direction);
      dispatch({ type: "USER_UPDATED", payload: { ...authState.user, postVotes: newUserVotes } });

      firebase
        .firestore()
        .collection("users")
        .doc(authState.user.uid)
        .update({ postVotes: newUserVotes })
        .catch((error) => console.error(error));

      firebase
        .firestore()
        .collection("posts")
        .doc(id)
        .update({ vote: newVoteCount })
        .catch((error) => console.error(error));
    }
    else {
      dispatch({ type: "LOGIN" });
    }
  }


  useEffect(() => {
    if(modalState.status !== "") {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "scroll";
    }
  }, [modalState.status]);

  return (
    <BrowserRouter>
      <Background>
        <NavBar viewPostComments={viewPostComments} posts={posts} />
        {modalState.status === "LOGIN" && <Login />}
        {modalState.status === "SIGNUP" && <Signup />}
        <Switch>
          <Route path="/" exact component={() => (
            <Home
              posts={posts}
              viewPostComments={viewPostComments}
              castPostVote={castPostVote}
            />
          )} />
          <Route path="/submit" exact component={() => (
            <Submit
              posts={posts}
              setPosts={setPosts}
            />
          )} />
          <Route
            path="/comments/:id/:post"
            exact
            render={(routeProps) => (
             <Comments
               postData={postData}
               viewPostComments={viewPostComments}
               setPostData={setPostData}
               castPostVote={castPostVote}
               posts={posts}
               setPosts={setPosts}
               id={routeProps.match.params.id}
             />
            )}
          />
        </Switch>
      </Background>
    </BrowserRouter>
  );
}

const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export default App;
