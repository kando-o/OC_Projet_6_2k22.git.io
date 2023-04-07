// Formulaire

/**
 * @function formulaireEvent | au click sur *contact moi* affiche la modal formulaire
 * @param {string} namePhotographe | nom du formulaire dans formulaire 
 */
const formulaireEvent = ( namePhotographe ) => {

	const formulaire = document.querySelector('.formulaire')
	const bgFormulaire = document.querySelector('.bgFormulaire')
	const btnContactMoi = document.querySelector('.bannerContact');
	const btnFormulaireClose = document.querySelector('.btnFormulaireClose')
	const prenom = document.getElementById('prenom');
	const nom = document.getElementById('nom');
	const spanErrorPrenom = document.querySelector('.mesgErrorPrenom');
	const spanErrorNom = document.querySelector('.mesgErrorNom');
	
	const btnModalMerci_close = document.querySelector('.close-modal-merci')
	const modal_merci = document.querySelector('.modal_merci')
	const btnModalMerci = document.querySelector('.btn-merci')

	btnFormulaireClose.nextElementSibling.innerHTML = namePhotographe;
	
	btnContactMoi.addEventListener('click', () => {
		console.log("click bgFormulaire block");
		bgFormulaire.style.display = "block";
		formulaire.style.display = "block";
		btnFormulaireClose.focus(); // Permet de focus sur le formulaire fermer le formulaire avec *espace*
	})
	btnFormulaireClose.addEventListener('click', (e) => {
		bgFormulaire.style.display = "none";
		console.log("click bgFormulaire none");
	})
	btnModalMerci_close.addEventListener('click', (e) => {
		bgFormulaire.style.display = "none";
		console.log("click btnModalMerci_close none");
	})

	/**
	 * ajout des modifieur *valid, invalid* si champs nom, prénom valide ou non
	 * @param {string | pField} | champs: nom, prénom  
	 * @param {boolean} champ state
	 * @returns {boolean}
	 */
	function validationField (pField , state){
		if (state == true) {
			console.log('ChampsInputText OK');
			pField.classList.remove('champInputText-invalid')
			pField.classList.add('champInputText-valid');
			return true
		} 
		else {
			console.log('ChampsInputText NOK');
			pField.classList.add('champInputText-invalid')
			pField.classList.remove('champInputText-valid')
			return false
		}
	} 
	
	prenom.addEventListener('change', () => { 
		console.log("prénom:" + " " + prenom.value);
		let state = validation(prenom.value)
		validationField(prenom, state)
		return state
	})
	
	nom.addEventListener('change', () => {
		console.log("nom:" + " " + nom.value); 
		let state = validationNom(nom.value)
		validationField(nom, state)
		return state
	})

	/**
	 * validation du champs prénom
	 * @param {string | pName} | champs: nom, prénom 
	 * @returns {string | champInputText} | boolean
	 */
	const validation = (pName) => {
		let champInputText = false
		let msgErrorNom;
		let msgErrorprenom;
		spanErrorPrenom.innerHTML = msgErrorprenom
		spanErrorNom.innerHTML = msgErrorNom
	
		if (pName.length < 2) {
			console.log('ChampPrénom --> il faut au moins 2 carractères' );
			msgErrorprenom = 'il faut au moins 2 carractères';
			msgErrorNom = 'il faut au moins 2 carractères'; 
		} else if (!/[A-Z]/g.test(pName)) {
			console.log('ChampPrénom --> il manque une majuscule');
			msgErrorprenom = 'il manque une majuscule';
			msgErrorNom = 'il manque une majuscule';
		} else if (!/[a-z]/g.test(pName)) {
			console.log('ChampPrénom --> il manque une minuscule');
			msgErrorprenom = 'il manque une minuscule';
			msgErrorNom = 'il manque une minuscule';
		} 
		
		if (
			/[a-z]/g.test(pName) && 
			/[A-Z]/g.test(pName) &&
			!pName.length < 2
			) 
			{ 
			console.log('ChampPrénom --> All condition true');
			champInputText = true;
			msgErrorprenom = " ✔️ ";
		}
	
		if (msgErrorprenom ){
			spanErrorPrenom.innerHTML = msgErrorprenom
		}

		return champInputText;
	}
	
	/**
	 * Regex validation du champ NOM
	 * @returns {boolean}
	 */
	function validationNom() {
		const fielNom = document.getElementById('nom');
		let champInputText = false
		let msgError;

		if (!/[a-z]/g.test(fielNom.value)) {
			console.log('ChampNom --> il manque une minuscule');
			msgError = 'il manque une minuscule';
		} else if (!/[A-Z]/g.test(fielNom.value)) {
			console.log('ChampNom --> il manque une majuscule');
			msgError = 'il manque une majuscule'
		} else if (fielNom.value.length < 2) {
			console.log('ChampNom --> il faut au moins 2 carractères');
			msgError = 'il faut au moins 2 carractères'
		} else {
			console.log('ChampNom --> All condition true');
			champInputText = true
		}

		if (champInputText == true) {
			console.log('ChampNom --> ChampsInputText OK');
			spanErrorNom.innerHTML = ""
			fielNom.classList.remove('champInputText-invalid')
			fielNom.classList.add('champInputText-valid')
			msgError = " ✔️ " 
			return true
		} else {
			console.log('ChampNom --> ChampsInputText NOK');
			spanErrorNom.innerHTML = msgError
			fielNom.classList.remove('champInputText-valid')
			fielNom.classList.add('champInputText-invalid')
			return false
		}
	}

	formulaire.addEventListener('submit', (e) => {

		e.preventDefault()
		if (validation(prenom) == true && validationNom() == true) {
			console.log('condition validation Nom OK | Prénom OK');
			formulaire.style.display = "none"
			modal_merci.style.display = "block"
		} else {
			console.log('condition validation Nom NOK | Prénom NOK');
			e.preventDefault()
		}
	})

	btnModalMerci.addEventListener('click', () => {
		bgFormulaire.style.display = "none";
		console.log(`Le formulaire au nom de ${namePhotographe} à bien été envoyer`);
	})

	btnModalMerci_close.addEventListener('click', () => {
		bgFormulaire.style.display = "none"
	})	
}

/**
 * création de la bannière
 * @param {object} photographer 
 */
export const bannerPhotographer = (photographer) => {
	const banner = document.querySelector('.bannerPhotographer')
	banner.innerHTML = 
		`
		<div class="bannerPhotographer__info">
			<h1 class="bannerPhotographer__name" tabindex="0">${photographer.name}</h1>
			<h2 class="bannerPhotographer__streetCity" tabindex="0">${photographer.city}, ${photographer.country}</h2>
			<p class="bannerPhotographer__tagline" tabindex="0">${photographer.tagline}</p>
		</div>
		<button class="bannerContact">contacter-moi</button>
		<div class="bannerPhotographer__image" tabindex="0">
			<img src="/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}">
		</div>
		`
	formulaireEvent(photographer.name)
}