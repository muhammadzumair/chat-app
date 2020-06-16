const Auth = uid => {
  return dispatch => {
    dispatch({
      type: 'Auth',
      user: uid,
    });
  };
};

const removeUser = () => {
  return {
    type: 'REMOVE_USER',
  };
};

export {Auth, removeUser};
