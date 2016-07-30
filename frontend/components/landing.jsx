var React = require('react');

var Landing = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {newHeight:"", newWeight:""};
  },

  heightChange: function(event){
    this.setState({newHeight:event.target.value});
  },

  weightChange: function(event){
    this.setState({newWeight:event.target.value});
  },

  goToNewEntry: function(event){
    event.preventDefault();
    this.context.router.push("/guesses");
  },

  getGuesses: function(event){
    event.preventDefault();
  },

  render: function(){
    return (
      <div className="landing">
        <h1>Cat or Dog?</h1>
        <p>
          We will guess whether you are a cat or dog person based on your height and weight along with information from previous entries in our database.
        </p>
        <div className="guess-form">
          Enter your information below:
          <br/>
          <label>Height:
            <input
              type="text"
              onChange={this.heightChange}
              value={this.state.newHeight}
              className="newHeight" />
          </label>
          <br/>
          <label>Weight:
            <input
              type="text"
              onChange={this.weightChange}
              value={this.state.newWeight}
              className="newWeight" />
          </label>
          <br/>
          <button onClick={this.getGuess}>Get Guesses!</button>
        </div>

        <h2>Summary</h2>
        <h3>Eucladian Distance</h3>
        <p>
          Based on a direct relation between  height and weight of users.
        </p>
        <h3>Pearson Distance</h3>
        <button onClick={this.goToNewEntry}>Add More Entries</button>
      </div>
    );
  }
});

module.exports = Landing;
