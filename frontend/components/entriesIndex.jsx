var React = require('react');
var EntryStore = require('../stores/entryStore');
var EntryUtil = require('../util/entryUtil');

var EntriesIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {entries: EntryStore.all(),newName:"", newHeight:"", newWeight:"", newCatLover:"", errors: EntryStore.getErrors()};
  },

  componentDidMount: function(){
    this.entryStoreListener = EntryStore.addListener(this.onChange);
    EntryUtil.fetchAllEntries();
  },

  componentWillUnmount: function(){
    this.entryStoreListener.remove();
  },

  onChange: function(){
    this.setState({entries: EntryStore.all(), errors: EntryStore.getErrors()});
  },

  addEntry: function(event){
    event.preventDefault();
    EntryUtil.createEntry({
      name: this.state.newName,
      height: this.state.newHeight,
      weight: this.state.newWeight,
      catLover: this.state.newCatLover
    });

    this.setState({newName:"", newHeight:"", newWeight:"", newCatLover:""});
  },

  nameChange: function(event){
    this.setState({newName:event.target.value});
  },

  heightChange: function(event){
    this.setState({newHeight:event.target.value});
  },

  weightChange: function(event){
    this.setState({newWeight:event.target.value});
  },

  catLoverChange: function(event){
    this.setState({newCatLover:event.target.checked});
  },

  render: function(){
    var self = this;
    var keys = Object.keys(this.state.entries);

    if(keys.length > 0){
      var entries = keys.map(function(key){
        var entry = self.state.entries[key];
        if(entry.catLover){
          var pet = "🐱";
        } else {
          pet = "🐶";
        }

        return (
          <li className="entry" key={entry.id}>
            <div className="name">
              Name: {entry.name}
            </div>
            <div className="height">
              Height: {entry.height}
            </div>
            <div className="weight">
              Weight: {entry.weight}
            </div>
            <div className="catLover">
              Pet: {pet}
            </div>
          </li>
        );
      });
    }

    keys = Object.keys(this.state.errors);

    if(keys.length > 0){
      var errors = keys.map(function(key){
        var error = self.state.errors[key];

        return (
          <li className="error" key={"Error" + key}>
            {error}
          </li>
        );
      });
    }

    if(this.state.newCatLover){
      var newPet = "🐱";
    } else {
      newPet = "🐶";
    }
    return (
      <div className="entires-index-container">
        <h1>Entries Index</h1>
        <ol className="entries-index">
          {entries}
        </ol>
        <ul className="errors">
          {errors}
        </ul>
        <br />
        <label>Name:
          <input
            type="text"
            onChange={this.nameChange}
            value={this.state.newName}
            className="newName" />
        </label>
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
        <label>Pet:
          <input
            type="checkbox"
            onChange={this.catLoverChange}
            checked={this.state.newCatLover}
            className="newCatLover"
            style={{display:"none"}} />
          <span className="pet">{newPet}</span>
        </label>
        <br/>
        <button onClick={this.addEntry}>Add Entry</button>
      </div>
    );
  }
  });

module.exports = EntriesIndex;
