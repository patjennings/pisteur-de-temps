import React from 'react';

class ProjectSelector extends React.Component{
    constructor(props){
	super(props);
    }

    render(){
	return(
	    <div class="dropdown">
	      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		Dropdown button
	      </button>
	      <div class="dropdown-menu border-0 bg-transparent" aria-labelledby="dropdownMenuButton">
		<a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
		  <div class="d-flex w-100 justify-content-between">
		    <h5 class="mb-1">List group item heading</h5>
		    <small>3 days ago</small>
		  </div>
		  <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
		  <small>Donec id elit non mi porta.</small>
		</a>
		<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
		  <div class="d-flex w-100 justify-content-between">
		    <h5 class="mb-1">List group item heading</h5>
		    <small class="text-muted">3 days ago</small>
		  </div>
		  <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
		  <small class="text-muted">Donec id elit non mi porta.</small>
		</a>
		<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
		  <div class="d-flex w-100 justify-content-between">
		    <h5 class="mb-1">List group item heading</h5>
		    <small class="text-muted">3 days ago</small>
		  </div>
		  <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
		  <small class="text-muted">Donec id elit non mi porta.</small>
		</a>
	      </div>
	      
	    </div>
	);
    }
}

export default ProjectSelector;
