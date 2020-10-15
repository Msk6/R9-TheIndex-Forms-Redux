import React, {useState} from "react";

// actions
import {postBook} from "./redux/actions/index"

// redux
import {connect} from "react-redux"

const BookForm = (props) => {
  const initialBook = {
    title: "",
    color: "red", 
    authors: [props.author.id]
  }

  const [book, setBook] = useState(initialBook)

  const submitBook = event => {
    event.preventDefault()
    console.log("sbmitted")
    props.postBook(book, props.closeModal, props.author)

  }

  const textChangeHandler = (event) => {
    setBook({...book, [event.target.name]:event.target.value})

  }

  const selectChangeHandler = (event) => {
    console.log(event.target.value)
    setBook({...book, color:event.target.value})
  }

  const errors = props.errors;

  return (
    <div className="mt-5 p-2">
      <form onSubmit={submitBook}>
        {!!errors.length && (
          <div className="alert alert-danger" role="alert">
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Title</span>
          </div>
          <input type="text" className="form-control" value={book.title} name="title" onChange={textChangeHandler}/>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" for="inputGroupSelect01">Color</label>
          </div>
          <select className="custom-select" onChange={selectChangeHandler}>
            <option defaultValue value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="purple">Purple</option>
          </select>
        </div>
        <input type="submit" />
      </form>
    </div>
    )
};

const mapStateToProps = state => {
  return (
    {
      errors: state.errorsState.errors
    }
  )
}

const mapDispatchToProps = dispatch => {
  return (
    {
      postBook: (book, closeModal, author) => dispatch(postBook(book, closeModal, author))
    }
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(BookForm);
