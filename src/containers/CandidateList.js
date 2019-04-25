import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import * as ApplicationsListActions from '../actions/applicationsList';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';


class CandidateList extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            status: '',
            candidate:'',
            updated:false
        };
        this.changeSearchQuery = this.changeSearchQuery.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.applySearchAndFilter = this.applySearchAndFilter.bind(this);
    }       
     
    componentDidMount() {
        if (!this.state.updated) {
            this.props.actions.getApplications();
            this.state = {
                updated: true
            };
        }
    }

    changeSearchQuery(e){
        let val = e.target.value;
        this.setState({candidate:val});
    }
    changeFilter(e){
        let val = e.target.value;
        val=="None"?val=undefined:val;
        this.setState({status:val});
    }

    applySearchAndFilter(){
        this.props.actions.getApplications(this.state.status, this.state.candidate);
    }

    render() {
        return (
            <div>
                <NavBar />

                <button
                    onClick={()=>{this.props.actions.getApplications();}}>
                    {"Refresh Candidate List"}
                </button>
                <div>
                    <div>
                        <div>
                            <label>
                                {`Search by Candidate Name:`}
                                <input type="text" value={this.state.candidate} onChange={this.changeSearchQuery}/>
                            </label>
                        </div>

                        <button 
                            enabled={this.state.candidate||this.state.status} 
                            onClick={this.applySearchAndFilter}    
                        > 
                            {`Apply search`}
                        </button>
                    </div>
                    {this.props.candidateList.map(
                        (el, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black', padding: '20px' }}>
                                <div>{idx+1}</div>
                                <div>{`${el.candidate.name}`}</div>
                                <div>{`${el.program.title}`}</div>
                                <div>{`${el.status.type}`}</div>
                                <button
                                    onClick={() => {
                                        this.props.actions.getApplication(el.id);
                                    }} >
                                    <Link to='/Candidate'>{"View Candidate Application"}</Link>
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        candidateList:state.applicationsList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ApplicationsListActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CandidateList);

