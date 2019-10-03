export default function parseQuery(url){ // on prend les paramètre d'une url en entrée
    
    let inParams = url.slice(1);
    inParams = inParams.split("&")

    let params = {};

    inParams.forEach(i => {
	let parts = i.split("=")
	params[`${parts[0]}`] = parts[1];
    })
    return params; // on retourne un objet avec tous les arguments
}
