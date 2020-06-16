const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'FbLogin': {
      return {...state, FbLoginDetail: action.FbUserDetail};
    }

    default: {
      return state;
    }
  }
};

export default reducer;
