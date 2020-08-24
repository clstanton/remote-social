import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import SingleComment from './pages/SingleComment';
import NoMatch from './pages/NoMatch';
import './App.scss';
//import Profile from './pages/Profile';
//import Signup from './pages/Signup';
//import Login from './pages/Login';

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
              {/*<Route exact path='/saved' component={SavedMovies} />*/}
              <Route exact path="/saved/:username?" component={SavedMovies} />
              <Route exact path="/comment/:id" component={SingleComment} />
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />

              <Route component={NoMatch} />
            </Switch>
          </>
        </Router>
    </ApolloProvider>
  );
}

export default App;
