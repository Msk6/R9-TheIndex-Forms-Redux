import {
  SET_AUTHOR_DETAIL,
  SET_AUTHOR_LOADING,
  ADD_BOOK,
} from "../actions/actionTypes";

const initialState = {
  author: null,
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHOR_DETAIL:
      return {
        ...state,
        author: action.payload,
        loading: false,
      };

    case SET_AUTHOR_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ADD_BOOK:
      //action.payload.theAuthor["books"] = state.author.books.concat(action.payload.book)
      // console.log(action.payload.book)
      // console.log(action.payload.theAuthor)
      // console.log("inside ADD_BOOK")
      const newAuthor = {
        ...state.author,
        books: state.author.books.concat(action.payload.book)
      }
    return {
      ...state,
      author: newAuthor,
      loading: false,
    }

    default:
      return state;
  }
};

export default reducer;
