var React = require('react');
var EntryStore = require('../stores/entryStore');
var EntryUtil = require('../util/entryUtil');

var Landing = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {newHeight:"", newWeight:"", euclidian:"", pearson:""};
  },

  componentDidMount: function(){
    this.entryStoreListener = EntryStore.addListener(this.onChange);
  },

  componentWillUnmount: function(){
    this.entryStoreListener.remove();
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
    EntryUtil.fetchAllGuesses({
      height:this.state.newHeight,
      weight:this.state.newWeight
    });
  },

  euclidianGuess: function(){
    if(this.state.euclidian === ""){
      return <div />;
    } else if (this.state.euclidian) {
      var newPet = "🐱";
    } else {
      newPet = "🐶";
    }

    return (
      <label>You are a
        <input
          type="checkbox"
          checked={this.state.euclidian}
          className="euclidianGuess"
          style={{display:"none"}}
          readOnly />
        <span className="pet"> {newPet} </span>
        lover!
      </label>
    );
  },

  pearsonGuess: function(){
    if(this.state.pearson === ""){
      return <div />;
    } else if (this.state.pearson) {
      var newPet = "🐱";
    } else {
      newPet = "🐶";
    }

    return (
      <label>You are a
        <input
          type="checkbox"
          checked={this.state.pearson}
          className="pearsonGuess"
          style={{display:"none"}}
          readOnly />
        <span className="pet"> {newPet} </span>
        lover!
      </label>
    );
  },

  onChange: function(){
    var guesses = EntryStore.getGuesses();
    this.setState({
      euclidian: guesses["euclidian"],
      pearson:guesses["pearson"]
    });
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
          <button onClick={this.getGuesses}>Get Guesses!</button>
        </div>

        <h2>Summary</h2>
        <h3>Eucladian Distance</h3>
        <p>
          Based on a direct relation between height and weight of users:
        </p>
        {this.euclidianGuess()}

        <h3>Pearson Correlation Score</h3>
        <p>
          The correlation coefficient is a measure of how well two sets of data fit on a straight line. Looking at the height and weight of users:
        </p>
        {this.pearsonGuess()}

        <br />
        <button onClick={this.goToNewEntry}>Add More Entries</button>
      </div>
    );
  }
});

module.exports = Landing;
