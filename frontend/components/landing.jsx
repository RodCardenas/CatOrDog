var React = require('react');

var Landing = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  goToNewEntry: function(event){
    event.preventDefault();
    this.context.router.push("/guesses");
  },

  render: function(){
    return (
      <div className="landing">
        <h1>Cat or Dog?</h1>
        <p>
          We will guess whether you are a cat or dog person based on your height and weight.
        </p>
        <button onClick={this.goToNewEntry}>Try It!</button>
      </div>
    );
  }
});

module.exports = Landing;
