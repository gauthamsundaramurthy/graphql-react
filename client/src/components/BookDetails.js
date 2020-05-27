import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {getBookQuery} from '../queries/queries'

class BookDetails extends Component {
    displayBookDetails () {
        const  {bookInfo} = this.props.data;
        if (bookInfo) {
            return (
                <div>
                    <h2>{bookInfo.name}</h2>
                    <p>{bookInfo.genre}</p>
                    <p>{bookInfo.author.name}</p>
                    <p>All books by this author</p>
                    <ul className="other-books">
                        {bookInfo.author.books.map(item => <li key={item.id}>{item.name}</li>)}
                    </ul>
                </div>
            )
        } else {
            return ( <div> No book selected...</div> )
        }
    }

    render () {
        return (
            <div id="book-details">
                {this.displayBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)