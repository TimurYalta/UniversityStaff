import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../actions/loginActions';


class LoginPage extends React.Component{

    constructor(props){
        super(props);
        this.state={login:'', password:''}
    }


    render() {
        return <div>
            <label>
                {"Login:"}
                <input type= "text" value={this.state.login} onChange={(e)=>{this.setState({login:e.target.value})}}/>
            </label>
            <br/>
            <label>
                {"Password:"}
                <input type ="password" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/>
            </label>
            <br/>
            <button onClick={()=>{this.props.actions.login(this.state.login,this.state.password)}}>
                {"Login"}
            </button>
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        token: state.application.token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
