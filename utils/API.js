const API = {
	url : "http://127.0.0.1:5500/",
	request_data :"data/dataAll.json"
}

/**
 * 
 * @param {function} callback 
 * @return {Promise}
*/

export const getData = () => {
	// promise
	return fetch(API.url + API.request_data) // chemin vers le data.json
	.then(res => res.json())

	.catch(function(error) {
		console.log(error)
	})
}

