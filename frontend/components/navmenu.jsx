var React = require('react');

var NavMenu = React.createClass({
  render: function(){
    return (
      <div className="nav-menu">
        <ul>
          <li>
            Link1
          </li>
          <li>
            Link2
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = NavMenu;
