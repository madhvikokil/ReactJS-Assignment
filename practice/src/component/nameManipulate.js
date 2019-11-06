
// nameManipuation done by class based component
// When we need to do SideEffect or an API call

import React from 'react';

export default class NameManipulation extends React.Component{

    state ={
        name : "",
        surname:'',
        width:window.innerWidth
    }

    onChangeHandler =(e) => {
        this.setState({name:e.target.value})
    }

    onChangeHandlerSurname=(e) => {
        this.setState({surname:e.target.value})
    }

    // For SideEffect in class based component
    componentDidMount() {
        document.title = this.state.name + " " + this.state.surname
        window.addEventListener('resize',this.handleResize);
    }

    componentDidUpdate() {
        document.title = this.state.name + " " +this.state.surname
    }

    componentWillUnmount() {
        window.removeEventListener('resize',this.handleResize);
    }

    handleResize = () => {
        this.setState({width:window.innerWidth})
    }

    

    render(){
        return(
            <div>
                <input onChange={this.onChangeHandler} value={this.state.name} /><br /><br /> 
                <input onChange={this.onChangeHandlerSurname} value={this.state.surname} /><br /><br />
                Full Name : {this.state.name} {this.state.surname}<br/><br/>
                Inner Width : {this.state.width}
            </div>
        )
    }
}

