const graphql = require('graphql')
const _ = require('lodash')
const {GraphQLSchema, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLNonNull} = graphql;

// data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '2' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '1'},
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
]

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1'},
    { name: 'Brandon Sanderson', age: 32, id: '2'},
    { name: 'Terry Pratchett', age: 57, id: '3'},
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type:GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        bookInfo: {
            type: BookType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(books, {id: args.id})
            }
        },
        authorInfo: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, {id: args.id})
                //code to get data from db / other source
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let newAuthor = { name: args.name, age: args.age, id: '4'}
                authors.push(newAuthor)
                return newAuthor
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                genre: { type: new GraphQLNonNull(GraphQLString)},
                authorId: { type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                let newBook = {name: args.name, genre: args.genre, authorId: args.authorId, id: '7'}
                books.push(newBook)
                return newAuthor
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})