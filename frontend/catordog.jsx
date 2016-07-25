var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

// var Modal = require('react-modal');

var Landing = require('./components/landing.jsx');
var NavMenu = require('./components/navmenu.jsx');
var EntriesIndex = require('./components/entriesIndex.jsx');

var App = React.createClass({
  render: function(){
    return (
        <div className="single-page-application-container">
          <NavMenu />
          <div className="page-content">
            {this.props.children}
          </div>
        </div>
    );
  }
});

var routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Landing} />
    <Route path="/guesses" component={EntriesIndex} />
  </Route>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('root');
  // Modal.setAppElement(root);

  ReactDOM.render(
    <Router history={hashHistory} routes={routes} />,
     root
  );

});
