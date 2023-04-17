const API = {
	url : "http://127.0.0.1:5500/",
	request_data :"data/dataAll.json"
}

/**
 * fetch toutes les données depuis dataAll.json
 * @returns {promise}
 */
export const getData = () => {
	return fetch(API.url + API.request_data) // chemin vers le data.json
	.then(res => res.json()) // transform le json

	.catch(function(error) {
		console.log(error)
	})
}

