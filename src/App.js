import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import BookList from './BookList'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books : []
  }

  fetchBooks = ()=>{
    BooksAPI.getAll().then(data => {
      this.setState({ books: data});
    });
  }

  componentDidMount() {
    this.fetchBooks();
 }

  updateShelfBooks = ( BOOK, shelf ) => {
    BooksAPI.update(BOOK, shelf).then(response =>{
      BOOK.shelf = shelf;
      //to avoid duplicate copies of the same books
      var newBooks = this.state.books.filter( book =>book.id!==BOOK.id )
      newBooks.push(BOOK);
      this.setState({ books: newBooks })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
              <BookList
              data={this.state.books}
              changeShelf = {this.updateShelfBooks}
              />
            )}
        />
        <Route path="/search" render={() => (
            <SearchBooks
              books={this.state.books}
              changeShelf={this.updateShelfBooks}
            />
          )}
      />
     </div>
    );
  }
}

export default BooksApp
