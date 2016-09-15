var React = require('react');
var EntryStore = require('../stores/entryStore');
var EntryUtil = require('../util/entryUtil');

var Landing = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {newHeight:1, newWeight:1, euclidian:"", pearson:"", tanimoto:"", errors:""};
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

  getErrors: function(){
    return (
      <div className="errors">
        {this.state.errors}
      </div>
    );
  },

  getGuesses: function(event){
    event.preventDefault();
    if (this.state.newHeight <= 0){
      this.setState({errors:"Height must be greater than 0."});
    } else if (this.state.newWeight <= 0){
      this.setState({errors:"Weight must be greater than 0."});
    } else {
      EntryUtil.fetchAllGuesses({
        height:this.state.newHeight,
        weight:this.state.newWeight
      });
      this.setState({errors:""});
    }
  },

  euclidianGuess: function(){
    if(this.state.euclidian === ""){
      var newPet = "？";
    } else if (this.state.euclidian) {
      newPet = "🐱";
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
      var newPet = "？";
    } else if (this.state.pearson) {
      newPet = "🐱";
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

  tanimotoGuess: function(){
    if(this.state.tanimoto === ""){
      var newPet = "？";
    } else if (this.state.tanimoto) {
      newPet = "🐱";
    } else {
      newPet = "🐶";
    }

    return (
      <label>You are a
        <input
          type="checkbox"
          checked={this.state.tanimoto}
          className="tanimotoGuess"
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
      pearson: guesses["pearson"],
      tanimoto: guesses["tanimoto"]
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
              type="number"
              min="1"
              onChange={this.heightChange}
              value={this.state.newHeight}
              className="newHeight" />
          </label>
          <br/>
          <label>Weight:
            <input
              type="number"
              min="1"
              onChange={this.weightChange}
              value={this.state.newWeight}
              className="newWeight" />
          </label>
          <br/>
          {this.getErrors()}
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
          The correlation coefficient is a measure of how well two sets of data fit on a straight line. Looking at the weight-height ratio of users and their pet preference:
        </p>
        {this.pearsonGuess()}

        <h3>Tanimoto Score</h3>
        <p>
          The Tanimoto score can be used to compare vectors which have binary attributes. In our case, we will use it to see if you like cats or dogs based on your weight to height ratio. Based on the Tanimoto score:
        </p>
        {this.tanimotoGuess()}

        <br />
        <br />
        <button onClick={this.goToNewEntry}>Add More Entries</button>
      </div>
    );
  }
});

module.exports = Landing;
