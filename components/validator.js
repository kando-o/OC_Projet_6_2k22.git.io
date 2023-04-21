const Validator = {
	/**
	 * validation du champs prénom
	 * @param {string} pStrValue champs: nom, prénom
	 * @param {HTMLElement} spanError le DOM element affichant le message d'erreur
	 * @returns {boolean} true si valide sinon false
	 */
	checkName : (pStrValue, spanError=null) => {
		spanError&& (spanError.textContent = '');
		
		if (pStrValue.length < 2) {
			console.log('ChampNom --> il faut au moins 2 carractères');
			spanError && (spanError.textContent = 'il faut au moins 2 carractères');
			return false
		} else if (!/^[A-ZÄ-Ù]/.test(pStrValue)) {
			console.log('ChampNom --> il manque une majuscule');
			spanError && (spanError.textContent = 'il manque une majuscule');
			return false
		} else if (!pStrValue.match(/^([a-zâ-ÿ\- ]+)+[a-zâ-ÿ]$/i)) {
			console.log('ChampNom --> contient des caractères non autorisés');
			spanError && (spanError.textContent = 'Le champ contient des caractères non autorisés');
			return false
		}

		console.log('ChampNom --> All condition true');
		spanError && (spanError.textContent = " ✔️ ")
		return true;
	},

	/**
	 * validation du champs email
	 * @param {string} pStrValue champs: email
	 * @param {HTMLElement} spanError le DOM element affichant le message d'erreur
	 * @returns {boolean} true si valide sinon false
	 */
	checkMail : (pStrValue, spanError=null) => {
		spanError && (spanError.textContent = '')
		if (!pStrValue.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
			console.log('ChampEmail --> email invalide');
			spanError && (spanError.textContent = "L'email n'a pas le bon format a@b.c")
			return false
		}

		console.log('ChampEmail --> All condition true');
		spanError && (spanError.textContent = " ✔️ ")
		return true;
	}
}

export default Validator