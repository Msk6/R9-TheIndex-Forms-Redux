import { SET_AUTHOR_LOADING, SET_AUTHOR_DETAIL, ADD_BOOK, SET_ERRORS, SET_AUTHORS } from "./actionTypes";

import { resetErrors } from "./errors";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com",
});

export const fetchAuthorDetail = (authorID) => async (dispatch) => {
  dispatch({
    type: SET_AUTHOR_LOADING,
  });
  try {
    const res = await instance.get(`/api/authors/${authorID}/`);
    const author = res.data;
    dispatch({
      type: SET_AUTHOR_DETAIL,
      payload: author,
    });
  } catch (err) {}
};

//POST THE BOOK TO https://the-index-api.herokuapp.com/api/books/
export const postBook = (book, closeModal, author) => async (dispatch) => {
    try {
      const res = await instance.post("/api/books/", book);
      const newBook = res.data;
      dispatch(resetErrors());
      dispatch({
        type: ADD_BOOK,
        payload: {book: newBook, theAuthor:author},
      });
      closeModal();
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  }

