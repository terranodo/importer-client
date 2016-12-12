import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;

class Importer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Test
      </div>
    )
  }
};

export default Importer;
