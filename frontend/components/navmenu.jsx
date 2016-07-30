var React = require('react');

var NavMenu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  goToEntries: function(event){
    event.preventDefault();
    this.context.router.push("/guesses");
  },

  goToGuesses: function(event){
    event.preventDefault();
    this.context.router.push("/");
  },

  render: function(){
    return (
      <div className="nav-menu">
        <ul>
          <li onClick={this.goToGuesses}>
            Guesses
          </li>

          <li onClick={this.goToEntries}>
            Entries
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = NavMenu;
