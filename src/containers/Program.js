import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as programActions from '../actions/programCreation';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';


class Program extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {

        super(props);
        this.changeTitle = this.changeTitle.bind(this);
        this.toggleTest = this.toggleTest.bind(this);
    }

    componentWillUnmount(){
        this.props.actions.clearProgram()
    }
    changeTitle(e) {
        let val = e.target.value;
        this.props.actions.changeName(val);
    }

    toggleTest(id) {
        if (this.props.tests.includes(id)) {
            this.props.actions.deleteTest(id)
        }
        else {
            this.props.actions.addTest(id);
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <br />
                <label>
                    {'Enter the program title:'}
                </label>
                <input type="text" value={this.props.title} onChange={this.changeTitle} />
                {!this.props.id ?
                    <button onClick={() => { this.props.actions.createProgram(this.props.title);this.props.actions.getTests();  }}>
                        {"Create Program"}
                    </button> :
                    <button onClick={this.props.actions.saveProgram}>
                        {"Save program"}
                    </button>
                }
                {this.props.id && <article>
                    <button onClick={this.props.actions.getTests}>
                        {"Refresh tests"}
                    </button>
                    <div>
                        {
                            this.props.testList.map(
                                (test, idx) => (
                                    <div style={{}}>
                                        <div>
                                            {test.title}
                                            <input
                                                type='checkbox'
                                                checked={this.props.tests.includes(test.id)}
                                                onChange={ () => {this.toggleTest(test.id);} }
                                            />
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </article>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.program.id,
        title: state.program.name,
        tests: state.program.tests,
        testList: state.testList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(programActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Program);
