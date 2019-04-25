import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as testCreationActions from '../actions/testCreationActions';
import { bindActionCreators } from 'redux';
import Question from '../components/Question';
import {Link} from 'react-router-dom';
import NavBar from '../components/NavBar';
// import './style.scss';

class TestCreation extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {

        super(props);
        this.state = {
            name: props.name,
            nameChanged: false
        };
        this.changeName = this.changeName.bind(this);
        this.submitNameChange = this.submitNameChange.bind(this);
    }

    changeName (e) {
        let val = e.target.value;
        let nameChanged = (val == this.state.name);
        this.setState({ name: val, nameChanged });
    };
    componentWillReceiveProps(props){
        if(!this.state.nameChanged){
            this.setState ({
                name: props.name,
                nameChanged: false
            });
        }
    }

    submitNameChange(){
        this.props.actions.changeName(this.state.name);
    }

    render() {
        return (
            <div>
                <NavBar/>
                {/* <button><Link to="/">{"Back to Test List"}</Link></button> */}
                <br/>
                <label>
                    {'Enter the test name:'}
                </label>
                <input type="text" value={this.state.name} onChange={this.changeName} />
                {!this.props.id?
                    <button onClick={()=>{this.props.actions.createNewTest(this.state.name)}}>
                        {"Create Test"}
                    </button>:
                    <button enabled={this.state.nameChanged} onClick ={this.submitNameChange}>
                        {"Save"}
                    </button>
                }
                {this.props.id && <article>
                        <button onClick={this.props.actions.addQuestion}>
                            {"Add question"}
                        </button>
                    {
                        this.props.questions.map(
                            (question, idx) => (
                            <Question
                                number={idx}
                                type={question.type}
                                description={question.description}
                                variants={question.variants}
                                right={question.right}
                                saveQuestion={this.props.actions.saveQuestion}
                                modifyQuestion ={this.props.actions.modifyQuestion}
                                deleteQuestion ={this.props.actions.deleteQuestion}
                                key = {idx}
                                isCreated ={question.isCreated}
                            />
                        ))
                    }
                </article>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id:  state.testCreation.id,
        name: state.testCreation.name,
        questions: state.testCreation.questions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(testCreationActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestCreation);
