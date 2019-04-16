import React, { Component } from 'react';

class Toto extends Component {
    constructor(props){
	super(props);
    }

    render(){
	console.log(this.props);
	return <p>It's me, toto.</p>
    }
}

export default Toto;
