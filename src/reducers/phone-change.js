const initialState = {
  buyItem: {},
};

const phoneChange = (state = initialState, action) => {
  switch (action.type) {
    case 'BUY_NOW':
      return {
        ...state,
        buyItem: {
          ...state.buyItem,
          [action.payload.id]: !state.buyItem[action.payload.id]
            ? [action.payload]
            : [...state.buyItem[action.payload.id], action.payload],
        },
      };
    case 'REMOVE_PHONE':
      if (state.buyItem[action.payload.id].length === 1) {
        delete state.buyItem[action.payload.id];
      } else {
        state.buyItem[action.payload.id].splice(0, 1);
      }
      return {
        ...state,
        buyItem: {
          ...state.buyItem,
          [action.payload.id]: state.buyItem[action.payload.id],
        },
      };
    case 'REMOVE_ALL_PHONE':
      delete state.buyItem[action.payload.id];

      return {
        ...state,
        buyItem: {
          ...state.buyItem,
        },
      };
    default:
      return state;
  }
};

export default phoneChange;
