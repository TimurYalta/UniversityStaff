import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ProgramActions from '../actions/programsList';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';


class ProgramList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updated: false
        };
    }

    componentDidMount() {
        if (!this.state.updated) {
            this.props.actions.getPrograms();
            this.state = {
                updated: true
            };
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <NavBar />

                <button
                    onClick={this.props.actions.getPrograms}>
                    {"Refresh Program List"}
                </button>

                {this.props.programList.map(
                    (el, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black', padding: '20px' }}>
                            {`Name: ${el.title}`}
                            <button
                                onClick={() => {
                                    this.props.actions.getProgram(el.id, el.title);
                                }} >
                                <Link to='/Program'>{"Edit program"}</Link>
                            </button>
                            <button
                                onClick={() => { this.props.actions.deleteProgram(el.id) }}>
                                {"Delete program"}
                            </button>
                        </div>
                    )
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        programList: state.programList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProgramActions, dispatch),

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgramList);

