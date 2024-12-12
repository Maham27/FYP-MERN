export const addCreateConvMembers =
  (receiverName, receiverId) => (dispatch, getState) => {
    var receiver = {
      receiverName,
      receiverId,
    };

    dispatch({ type: "CREATE_CONVERSATION", payload: receiver });
  };
