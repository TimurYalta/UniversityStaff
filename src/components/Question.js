import React from 'react';
// import { Link } from 'react-router-dom';
import {QUESTION_TYPES} from '../constants/Constants';
// import './style.scss';

class Question extends React.Component { // eslint-disable-line react/prefer-stateless-function

    //this.props.number

    constructor(props){
        super(props);
        this.state={
            type: props.type||'',
            description: props.description,
            variants:props.variants,
            right:props.right,
        };
        this.changeType = this.changeType.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.changeTextAnswer= this.changeTextAnswer.bind(this);
        this.changeRadioRightAnswer = this.changeRadioRightAnswer.bind(this);
        this.changeRadioAnswer = this.changeRadioAnswer.bind(this);
        this.addRadioVariant = this.addRadioVariant.bind(this);
        this.toggleCheckRightAnswer = this.toggleCheckRightAnswer.bind(this);
        this.changeCheckAnswer = this.changeCheckAnswer.bind(this);
        this.addCheckVariant = this.addCheckVariant.bind(this);
        this.deleteQuestion=this.deleteQuestion.bind(this);
    }

    saveQuestion () {

        if (!this.props.isCreated){
            this.props.saveQuestion(this.props.number,this.state);
        }
        else{
            this.props.modifyQuestion(this.props.number, this.state);
        }
    }
    
    changeType(event){
        const type = event.target.value;
        let variants;
        let right;
        switch(type){
            case QUESTION_TYPES.CHECK:
                variants = [];
                right=[];
            case QUESTION_TYPES.RADIO:
                variants = [];
                right=[];
            case QUESTION_TYPES.TEXT:
                variants: null;
                right: '';
            default:
                variants: null;
                right:'';
        }
        this.setState({type,variants, right});
    }

    changeDescription(event){
        const desc= event.target.value;
        this.setState({description: desc});
    }

    changeTextAnswer(event){
        const desc = event.target.value;
        this.setState({right: desc})
    }

    changeRadioRightAnswer(idx){
        this.setState({right:[idx]});
    }

    changeRadioAnswer(idx, event){
        const answer = event.target.value;
        const newVariants = [...this.state.variants];
        newVariants[idx]=answer;
        this.setState({variants:newVariants});
    }

    addRadioVariant(){
        this.setState({variants:[...this.state.variants, ""]})
    }

    toggleCheckRightAnswer(idx){
        if(this.state.right.includes(idx)){
            const newRight =[...this.state.right];
            const index = this.state.right.indexOf(idx);
            newRight.splice(index);
            this.setState({right:newRight});
        }
        else{
            const newRight=[...this.state.right, idx];
            this.setState({right:newRight});
        }
    }

    changeCheckAnswer(idx, event){
        const answer = event.target.value;
        const newVariants = [...this.state.variants];
        newVariants[idx]=answer;
        this.setState({variants:newVariants});
    }

    addCheckVariant(){
        this.setState({variants:[...this.state.variants, ""]})
    }

    deleteQuestion(){
        this.props.deleteQuestion(this.props.number);
    }
    
    render() {
        return (
            <div style={{border:'1px solid black',width:'100%'}}>
                <h1>{this.props.number+1}</h1>
                <br/>
                <label>{"Choose question type: "}</label>
                <select onChange={this.changeType} value={this.state.type} >
                    <option value = {QUESTION_TYPES.TEXT}>{QUESTION_TYPES.TEXT}</option>
                    <option value = {QUESTION_TYPES.RADIO}>{QUESTION_TYPES.RADIO}</option>
                    <option value = {QUESTION_TYPES.CHECK}>{QUESTION_TYPES.CHECK}</option>
                </select>
                <br/>
                <label>{"Enter question description: "}</label>
                <input value = {this.state.description} onChange={this.changeDescription} type="text"/>
                <br/>

                {
                    this.state.type == QUESTION_TYPES.TEXT &&
                    <div>
                        <label>
                            {"Enter text question answer: "}
                        </label>
                        <input onChange = {this.changeTextAnswer} value={this.state.right}/>
                    </div>
                }
                {
                    this.state.type == QUESTION_TYPES.RADIO &&
                    <div>
                        { 
                            this.state.variants.map((el, idx) => (
                                <div key={"radioVariant"+idx}>
                                    <input  
                                        type ="radio" 
                                        checked={this.state.right.includes(idx)} 
                                        value={el} 
                                        onChange = {(e)=>{
                                            this.changeRadioRightAnswer(idx);
                                        }}
                                    />
                                    <input 
                                        type ="text" 
                                        value={el} 
                                        onChange = {(e) =>{
                                            this.changeRadioAnswer(idx, e)
                                        }}
                                    />
                                    
                                </div>
                                ))
                        }
                        <button onClick= {this.addRadioVariant}>
                            {"Add variant"}            
                        </button>
                    </div>
                }

                {
                    this.state.type == QUESTION_TYPES.CHECK &&
                    <div>
                        { 
                            this.state.variants.map((el, idx) => (
                                <div key={"radioVariant"+idx}>
                                    <input  
                                        type ="checkbox" 
                                        checked={this.state.right.includes(idx)} 
                                        value={el} 
                                        onChange = {(e)=>{
                                            this.toggleCheckRightAnswer(idx);
                                        }}
                                    />
                                    <input 
                                        type ="text" 
                                        value={el} 
                                        onChange = {(e) =>{
                                            this.changeCheckAnswer(idx, e)
                                        }}
                                    />
                                    
                                </div>
                                ))
                        }
                        <button onClick= {this.addCheckVariant}>
                            {"Add variant"}            
                        </button>
                    </div>
                }
                <button
                    onClick = {this.saveQuestion}
                >
                    {"Save question"}
                </button>
                <button
                    onClick = {this.deleteQuestion}
                >
                    {"Delete question"}
                </button>
            </div>
        );
    }
}

export default Question;