import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf"

class BookList extends React.Component {
  render(){
    const Books = this.props.data;
    const now = Books.filter(book=>  book.shelf==="currentlyReading");
    const want = Books.filter(book=> book.shelf==="wantToRead");
    const read = Books.filter(book=> book.shelf==="read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf shelfTitle='Currently Reading' books={now} onShelfChange = {this.props.changeShelf}/>
          <BookShelf shelfTitle='Want to Read' books={want} onShelfChange = {this.props.changeShelf}/>
          <BookShelf shelfTitle='Read' books={read} onShelfChange = {this.props.changeShelf}/>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>

    )

  }
}

export default BookList;
