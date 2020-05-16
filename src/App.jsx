import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

// Components
import Layout from './components/Layout/Layout';
import Kanban from './views/Kanban/Kanban';
import Home from './views/Home/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Kanban" component={Kanban} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
