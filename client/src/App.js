import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import NoMatch from './pages/NoMatch';
//import SingleThought from './pages/SingleThought';
import './App.scss';
//import Login from './pages/Login';
//import Profile from './pages/Profile';
//import Signup from './pages/Signup';

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
              <Route exact path='/saved' component={SavedMovies} />
              {/* SINGLE COMMENT 
              <Route exact path="/comment" component={SingleComment} />
              <Route exact path="/comment/:id" component={SingleComment} /> */}
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />

              <Route component={NoMatch} />
            </Switch>
          </>
        </Router>
    </ApolloProvider>
  );
}

export default App;
