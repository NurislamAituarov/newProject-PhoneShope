export const searchPhone = (value) => ({ type: 'SEARCH', payload: value });
export const filterPhone = (categoryId) => ({ type: 'FILTER', payload: categoryId });
export const buyNow = (item) => ({ type: 'BUY_NOW', payload: item });
export const removePhone = (item) => ({ type: 'REMOVE_PHONE', payload: item });
export const removeAllPhone = (item) => ({ type: 'REMOVE_ALL_PHONE', payload: item });
export const popUp = (item) => ({ type: 'POP_UP', payload: item });
