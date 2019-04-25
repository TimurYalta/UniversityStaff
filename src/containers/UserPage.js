import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as accountActions from '../actions/account';
import {logout} from '../actions/loginActions'; 
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

class UserPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.state = {
            updated: false
        };
    }

    componentDidMount() {
        if (!this.state.updated) {
            this.props.actions.getUser();
            this.props.actions.getUsers();
            this.state = {
                updated: true
            };
        }
    }


    render() {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <br />
                <div>
                    <div>{`Name: ${this.props.name}`}</div>
                    <div>{`Role: ${this.props.role}`}</div>
                    <div>{`Email: ${this.props.email}`}</div>
                    
                    <button onClick={this.props.logout}>{"Logout"}</button>
                    <div style={{ border: "1px solid black" }}>
                        {'Users: '}
                        {this.props.users.map((e) => {
                            return <div style={{ border: "1px solid gray", display: 'flex', justifyContent: 'space-between' }}>
                                <div>{`Name: ${e.name}`}</div>
                                <div>{`Role: ${e.role}`}</div>
                                <div>{`Email: ${e.email}`}</div>
                            </div>;
                        })
                        }

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.account.me.id,
        name: state.account.me.name,
        email: state.account.me.email,
        role: state.account.me.role,
        users: state.account.users

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(accountActions, dispatch),
        logout: bindActionCreators(logout, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage);
