import React from 'react';
// import { Link } from 'react-router-dom';
import { QUESTION_TYPES } from '../constants/Constants';
// import './style.scss';

class ChangeStatusBar extends React.Component { // eslint-disable-line react/prefer-stateless-function

    //this.props.number

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            interviewer: this.props.interviewer,
            comment: this.props.comment,
            reason: this.props.reason,
            fixable: this.props.fixable
        };
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.renderParams = this.renderParams.bind(this);
        this.changeReason = this.changeReason.bind(this);
        this.changeFixable = this.changeFixable.bind(this);
        this.changeInterviewDate = this.changeInterviewDate.bind(this);
        this.changeInterviewer = this.changeInterviewer.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    handleStatusChange(e) {
        let val = e.target.value;
        this.setState({ type: val });
    }

    changeReason(e) {
        let val = e.target.value;
        this.setState({ reason: val });
    }
    changeFixable(e) {
        let val = e.target.value;
        if (val == 'true') {
            val = true;
        }
        else {
            val = false;
        }
        this.setState({ fixable: val });
    }
    changeInterviewDate(e) {
        let val = e.target.value;
        this.setState({ date: val });
    }
    changeInterviewer(e) {
        let val = e.target.value;
        this.setState({ interviewer: val });
    }
    changeComment(e) {
        let val = e.target.value;
        this.setState({ comment: val });
    }

    renderParams() {
        // const status = this.props.type;
        const type = this.state.type;
        if (type == 'rejected') {
            return <div>
                <div>{`Reason:`}<input type="text" value={this.state.reason} onChange={this.changeReason} /></div>
                <div>{`Can be changed:`}
                    <select value={this.state.fixable} onChange={this.changeFixable}>
                        <option value={true}>{"Yes"}</option>
                        <option value={false}>{"No"}</option>
                    </select>
                </div>
            </div>;
        }
        else if (type == 'interview') {
            return <div>
                <div>{`Date: `}<input type='text' value={this.state.date} onChange={this.changeInterviewDate} /></div>
                <div>{`Interviewer id:`} <input type='text' value={this.state.interviewer} onChange={this.changeInterviewer} /> </div>
            </div>;
        }
        else if (type == 'accepted') {
            return <div>
                <div>{`Comment:`} <input type='text' value={this.state.comment} onChange={this.changeComment} /> </div>
                <div>{`Interviewer id:`} <input type='text' value={this.state.interviewer} onChange={this.changeInterviewer} /> </div>
            </div>;
        }
        else {
            return '';
        }
    }

    collectResults() {
        const type = this.state.type;
        if (type == 'rejected') {
            return {
                type,
                fixable: this.state.fixable,
                reason: this.state.reason
            };
        }
        else if (type == 'interview') {
            return {
                type,
                date: this.state.date,
                interviewer: this.state.interviewer
            };
        }
        else if (type == 'accepted') {
            return {
                type,
                comment:this.state.comment,
                interviewer: this.state.interviewer
            };
        }
        else {
            return {type};
        }
    }

    sendData(){
        let status= this.collectResults();
        this.props.submitStatusChange(status);
    }

    render() {

        return (
            <div style={{ border: '1px solid black', width: '100%' }}>
                <label>
                    {'Status: '}
                    <select
                        value={this.state.type}
                        onChange={this.handleStatusChange}
                    >
                        <option value={`rejected`}>
                            {`rejected`}
                        </option>
                        <option value={`accepted`}>
                            {`accepted`}
                        </option>

                    </select>
                </label>
                {this.renderParams()}
                <br />
                <button onClick={this.sendData}>
                    {`Save changes`}
                </button>
                <button onClick={this.props.discardChanges}>{`Discard changes`}</button>
            </div>
        );
    }
}

export default ChangeStatusBar;