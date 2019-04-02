import React from 'react';

class TimePusher extends React.Component{
    constructor(props){
	super(props);
    }
    render(){
	return(
	    <div className="time-pusher">
	      <div className="time-input">
		<input type="text" placeholder="Enter time"></input>
	      </div>
	      <div className="time-selector">
		<select>
		  <option value="volvo">Volvo</option>
		  <option value="saab">Saab</option>
		  <option value="mercedes">Mercedes</option>
		  <option value="audi">Audi</option>
		</select>
	      </div>
	      <div className="time-validate">
		<button type="button" title="Valider">Valider</button>
	      </div>
	    </div>
	);
    }
}

export default TimePusher;
