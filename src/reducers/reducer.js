import phoneItems from '../server/phones';

const initialState = {
  items: phoneItems,
  itemsFilter: phoneItems,
  valueSearch: '',
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

    default:
      return state;
  }
};

export default reducer;
