export default function retrieveFormData(form, userid=null){
    // console.log("form");
    const data = new FormData(form); // les données du formulaire
    // console.log(form);
    let reqBody = {};
    
    for (let name of data.keys()) {
	const input = form.elements[name];
	const parserName = input.dataset.parse;

	if(parserName){
	    const parser = inputParsers[parserName];
	    const parsedValue = parser(data.get(name));
	    reqBody[name] = parsedValue; // la value
	}
	else{
	    reqBody[name] = data.get(name); //là, on récupère comment et task
	}
    }
    if(userid !== null){
	reqBody.user = userid; // et là, on récupère le user
    }

    console.log(reqBody);
    return reqBody;
}


// des méthodes pour parser ce qui vient des formulaires
const inputParsers = {
    date(input) {
	const [month, day, year] = input.split('/');
	return `${year}-${month}-${day}`;
    },
    uppercase(input) {
	return input.toUpperCase();
    },
    number(input) {
	return parseFloat(input+" zerzer");
    },
};


function stringifyFormData(fd) {
    const data = {};
    fd.forEach((value, key) => {data[key] = value});
    return JSON.stringify(data);
}
