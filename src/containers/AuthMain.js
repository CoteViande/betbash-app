import { connect } from 'react-redux';
import MainLogin from '../components/MainLogin';
import React from 'react';

let AuthMain = React.createClass({
  render() {
    return(
      <MainLogin />
    );
  }
});

export default connect()(AuthMain);