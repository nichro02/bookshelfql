import './App.css';
import { 
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql
} from '@apollo/client'


//components
import BookList from './components/BookList'

//Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Hello world</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
