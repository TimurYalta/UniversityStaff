import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TestCreation from '../containers/TestCreation';
import TestList from '../containers/TestList';
import PrivateRouter from './PrivateRouter';
import {Switch, Route,HashRouter} from 'react-router-dom';
/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
class App extends Component {
  render() {

    const { actions } = this.props;
    return (
      <div className="main-app-container">
        <div className="main-app-nav">UI Staff application</div>
        <div>
          <PrivateRouter/>
        </div>
      </div>
    );
  }
}

App.propTypes = {

};


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
