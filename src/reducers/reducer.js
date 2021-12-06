import phoneItems from '../server/phones';

const initialState = {
  items: phoneItems,
  itemsFilter: phoneItems,
  valueSearch: '',
  popUp: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return {
        ...state,
        valueSearch: action.payload,
      };
    case 'FILTER':
      return {
        ...state,
        itemsFilter: action.payload
          ? state.items.filter((item) => item.categoryId === action.payload)
          : state.items,
      };
    case 'POP_UP':
      return {
        ...state,
        popUp: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
