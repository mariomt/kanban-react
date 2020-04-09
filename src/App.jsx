import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

// Components
import Layout from './components/Layout/Layout';
import Kanban from './views/Kanban/Kanban';
import Home from './views/Home/Home';


const client = new ApolloClient({
  uri: 'http://localhost:8000/api',
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Kanban" component={Kanban} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
