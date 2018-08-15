import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookShelf from "./BookShelf";
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  state = {
    query:'',
    searchedBooks:[]
  }

  searchBooks=(e)=>{
    const Query = e.target.value;
    this.setState({
      query: Query.trim()
    });
    if(Query){
      let searchResults = [];
      BooksAPI.search(Query).then(booksFound => {
        if (booksFound.length>0) {
          searchResults = booksFound.map(book => {
            book.shelf = this.checkShelf(book);
            return book;
          });
          this.setState({searchedBooks: searchResults})
        }
        else
          this.setState({ searchedBooks: []})
      });
    }
    else {
      this.setState({ searchedBooks: []})
    }
  }

  checkShelf(selectedBook) {
   let currentShelf = this.props.books.filter(book => book.id === selectedBook.id);
   return currentShelf.length ? currentShelf[0].shelf : "none";
 }

  render(){
    const books = this.props.books;
    return (
     <div className="search-books">
       <div className="search-books-bar">
         <Link className="close-search" to="/"> Close </Link>
         <div className="search-books-input-wrapper">
           <input
             onChange={this.searchBooks}
             placeholder="Search by title or author"
             value = {this.state.query}
             type="text"
           />
         </div>
       </div>
       <div className="search-books-results">
         { (this.state.searchedBooks.length > 0) &&
           <ol className="books-grid">
              <BookShelf  books={this.state.searchedBooks} onShelfChange = {this.props.changeShelf}/>
              </ol>
         }
       </div>
     </div>
   );
 }
}

export default SearchBooks;
