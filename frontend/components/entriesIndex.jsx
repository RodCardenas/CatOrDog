var React = require('react');

var EntriesIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function(){
    return (
      <div className="landing">
        <h1>Entries Index</h1>
      </div>
    );
  }
});

module.exports = EntriesIndex;
