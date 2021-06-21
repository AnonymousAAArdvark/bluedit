import React from "react";
import { RootState } from "../../types/state-types";
import { useDispatch, useSelector } from "react-redux";
import { IoPodium, IoPodiumOutline, IoMedical, IoMedicalOutline, IoTime, IoTimeOutline } from "react-icons/all";
import { FeedSortWrapper, OldBtn, TopBtn, NewBtn } from "../../styled-components/home/StyledFeedSort";

const FeedSort = () => {
  const dispatch = useDispatch();
  const feedSortState = useSelector((state: RootState) => state.feedSort);

  return (
    <FeedSortWrapper>
      <TopBtn onClick={() => dispatch({ type: "TOP" })} selected={feedSortState.sort === "TOP"}>
        {feedSortState.sort === "TOP" ? <IoPodium/> : <IoPodiumOutline />}
        Top
      </TopBtn>
      <NewBtn onClick={() => dispatch({ type: "NEW" })} selected={feedSortState.sort === "NEW"}>
        {feedSortState.sort === "NEW" ? <IoMedical/> : <IoMedicalOutline />}
        New
      </NewBtn>
      <OldBtn onClick={() => dispatch({ type: "OLD" })} selected={feedSortState.sort === "OLD"}>
        {feedSortState.sort === "OLD" ? <IoTime/> : <IoTimeOutline />}
        Old
      </OldBtn>
    </FeedSortWrapper>
  );
};

export default FeedSort;