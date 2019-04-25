import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as candidateApplicationActions from '../actions/candidateApplication';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ChangeStatusBar from '../components/ChangeStatusBar';


class Candidate extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.state={showChangeStatusBar:false};
        this.renderStatusInfo = this.renderStatusInfo.bind(this);
    }

    renderStatusInfo() {
        const status = this.props.currentStatus;
        const type = status.type;
        if (type == 'rejected') {
            return <div>
                <div>{`Reason: ${status.reason}`}</div>
                <div>{`Can be changed: ${status.fixable ? 'yes' : 'no'}`}</div>
            </div>;
        }
        else if (type == 'interview') {
            
            const d = new Date();
            const dateString = [d.getMonth() + 1,
                d.getDate(),
                d.getFullYear()].join('/') + ' ' +
                    [d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()].join(':');
            return <div>
                <div>{`Date: ${dateString}`}</div>
                <div>{`Interviewer id: ${status.interviewer}`}</div>
            </div>;
        }
        else if (type =='accepted'){
            return <div>
                <div>{`Comment: ${status.comment}`}</div>
                <div>{`Interviewer id: ${status.interviewer}`}</div>
            </div>;
        }
        else{
            return '';
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
                    <div>{`Name: ${this.props.candidate.name}`}</div>
                    <div>{`Test attempts: `}
                        {this.props.testResults.map((test) => (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>{`Test id: ${test.test_id}`}</div>
                                <div>{`Grade: ${test.grade}`}</div>
                            </div>
                        ))}
                    </div>
                    <div>{`Current status: ${this.props.currentStatus.type}`}</div>
                    <div>
                        {this.renderStatusInfo()}
                    </div>
                    {this.state.showChangeStatusBar?
                        <ChangeStatusBar
                            discardChanges={()=>(this.setState({showChangeStatusBar:false}))}
                            type={this.props.currentStatus.type}
                            interviewer={this.props.currentStatus.interviewer}
                            date={this.props.currentStatus.date}
                            comment={this.props.currentStatus.comment}
                            reason={this.props.currentStatus.reason}
                            fixable={this.props.currentStatus.fixable}
                            submitStatusChange={this.props.actions.updateApplication}
                        />:
                        
                        
                        <button
                            onClick={()=>(this.setState({showChangeStatusBar:true}))}
                        >
                            {`Change status`}
                        </button>}
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.candidateApplication.id,
        candidate: state.candidateApplication.candidate,
        currentStatus: state.candidateApplication.history.length?state.candidateApplication.history.reduceRight(a => a):{type:'initial'},
        testResults: state.candidateApplication.test_attempts

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(candidateApplicationActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Candidate);
