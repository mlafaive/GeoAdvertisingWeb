import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import Error404 from './Error404.js';

import { connect, Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';

import reducer from './reducers/reducers';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

import Home from './components/home/Home.js';
import Classification from './components/classification/Classification.js';
import Protein from './components/protein/Protein.js';
import About from './components/about/About.js';
import Download from './components/download/Download.js';
import Contact from './components/contact/Contact.js';
import Server from './components/server/Server.js';
import Atlas from './components/atlas/Atlas.js';

let store = createStore(
  reducer,
  applyMiddleware(logger)
);

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// TODO: give properties to children based on route
class Main extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <Router>
        	<Switch>
          		<Route exact path="/" component={(props) => (<App children={<Home/>} {...props} />)} />
          		
          		<Route exact path="/about" component={(props) => (<App children={<About/>} {...props} />)} />
          		<Route exact path="/download" component={(props) => (<App children={<Download/>} {...props} />)} />
          		<Route exact path="/contact" component={(props) => (<App children={<Contact/>} {...props} />)} />
          		<Route exact path="/server" component={(props) => (<App children={<Server/>} {...props} />)} />
          		<Route exact path="/atlas" component={(props) => (<App children={<Atlas/>} {...props} />)} />
          		
          		<Route exact path="/types" component={(props) => (<App children={<Classification/>} {...props} />)} />
          		<Route exact path="/types/:id" component={(props) => (<App children={<Classification/>} {...props} />)} />

				      <Route exact path="/classes" component={(props) => (<App children={<Classification/>} {...props} />)} />
          		<Route exact path="/classes/:id" component={(props) => (<App children={<Classification/>} {...props} />)} /> 

          		<Route exact path="/superfamilies" component={(props) => (<App children={<Classification/>} {...props} />)} />)} />
          		<Route exact path="/superfamilies/:id" component={(props) => (<App children={<Classification/>} {...props} />)} /> 

          		<Route exact path="/families" component={(props) => (<App children={<Classification/>} {...props} />)} />
          		<Route exact path="/families/:id" component={(props) => (<App children={<Classification/>} {...props} />)} />

          		<Route exact path="/species" component={(props) => (<App children={<Classification/>} {...props} />)} />
          		<Route exact path="/species/:id" component={(props) => (<App children={<Classification/>} {...props} />)} /> 

          		<Route exact path="/localizations" component={(props) => (<App children={<Classification/>} {...props} />)} />)} />
          		<Route exact path="/localizations/:id" component={(props) => (<App children={<Classification/>} {...props} />)} /> 

          		<Route exact path="/proteins" component={(props) => (<App children={<Classification/>} {...props} />)} />
          		<Route exact path="/proteins/:id" component={(props) => (<App children={<Protein/>} {...props} />)} />      		

          		<Route component={Error404} />
        	</Switch>
        </Router>
      </Provider>
    );
  }
}

export default Main;

ReactDOM.render(<Main/>, document.getElementById('react-container'));
