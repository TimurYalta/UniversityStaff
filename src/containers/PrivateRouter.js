import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TestCreation from '../containers/TestCreation';
import TestList from '../containers/TestList';
import {Switch, Route,HashRouter, Link} from 'react-router-dom';
import LoginPage from './LoginPage';
import ProgramList from './ProgramList';
import Program from './Program';
import CandidateList from './CandidateList';
import Candidate from './Candidate';
import UserPage from './UserPage';


class PrivateRouter extends React.Component{
    render(){
        if (this.props.token){
            return (
                <div>
                    <HashRouter basename='/'>
                        <Switch>
                            <Route exact path='/TestList' component={TestList}/>
                            <Route exact path='/Test' component={TestCreation}/>
                            <Route exact path='/ProgramList' component={ProgramList}/>
                            <Route exact path='/Program' component={Program}/>
                            <Route exact path='/CandidateList' component={CandidateList}/>
                            <Route exact path='/Candidate' component={Candidate}/>
                            <Route exact path='/' component={UserPage}/>
                        </Switch>
                    </HashRouter> 
                </div>
            );
        }
        else{
            return <LoginPage/>
        }
    }
}


function mapStateToProps(state) {
    return {
        token: state.application.token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: bindActionCreators(testCreationActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRouter);


// export default PrivateRouter;