
let trackManager;
let projectDetails;

window.onload = function(){
    trackManager = document.querySelector('.track-manager');
    projectDetails = document.querySelector('.project-details');
    newHeight();
}
window.onresize = function(){
    projectDetails = document.querySelector('.project-details');
    newHeight();
}

function newHeight(){
    let newHeight = window.innerHeight - 120;
    trackManager.setAttribute("style", "height: "+newHeight+"px;");
    projectDetails.setAttribute("style", "height: "+newHeight+"px;");
}


