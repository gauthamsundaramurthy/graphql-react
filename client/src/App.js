import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import BookList from "./components/BookList";
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1> Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;