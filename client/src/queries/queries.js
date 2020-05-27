import { gql } from "apollo-boost";

const getBooksQuery = gql`
    {
        books {
            name 
            id
        }
    }
`;

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBookQuery = gql`
    query GetBook($id: ID) {
        bookInfo(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

export {getBooksQuery, getAuthorsQuery, getBookQuery};