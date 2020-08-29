import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import NoMatch from './pages/NoMatch';
import SingleComment from './pages/SingleComment';
import Profile from './pages/Profile';
import Comments from './pages/Comments';
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
          {/*<>*/}
          <div className="flex-column justify-flex-start min-100-vh">
            <Navbar />
            <div className="container">
            <Switch>
              <Route exact path='/' component={SearchMovies} />
              <Route exact path='/saved' component={SavedMovies} />
              <Route exact path='/comments' component={Comments} />
              <Route exact path='/comment/:id' component={SingleComment} />
              <Route exact path='/profile/:username?' component={Profile} />
              {/*<Route render={() => <h1 className='display-2'>Wrong page!</h1>} />*/}
              <Route component={NoMatch} />
            </Switch>
            </div>
            <Footer />
          </div>
          {/*</>*/}
        </Router>
    </ApolloProvider>
  );
}

export default App;
