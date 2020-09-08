import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import AllComments from './pages/AllComments';
import SingleComment from './pages/SingleComment';
import NoMatch from './pages/NoMatch';
import './App.scss';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar />
            <Switch>
              <Route exact path='/' component={SearchMovies} />
              <Route exact path='/saved/:username?' component={SavedMovies} />
              <Route exact path='/comments' component={AllComments} />
              <Route exact path='/comment/:id' component={SingleComment} />
              <Route component={NoMatch} />
              {/*<Route render={() => <h1 className='display-2'>Wrong page!</h1>} />*/}
            </Switch>
          </>
        </Router>
    </ApolloProvider>
  );
}

export default App;
