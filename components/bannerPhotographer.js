// Formulaire

import Validator from "./validator.js";

/**
 * au click sur *contact moi* affiche le formulaire
 * @param {string} namePhotographe nom du photographe dans formulaire 
 */
const formulaireEvent = ( namePhotographe ) => {
	const formulaire = document.querySelector('.formulaire')
	const containerPhotographer = document.querySelector('.containerPhotographer')

	const bgFormulaire = document.querySelector('.bgFormulaire')
	const btnContactMoi = document.querySelector('.bannerContact');
	const btnFormulaireClose = document.querySelector('.btnFormulaireClose')
	const btnMerci = document.querySelector('.btn-merci')

	const prenom = document.getElementById('prenom');
	const nom = document.getElementById('nom');
	const email = document.getElementById('email');
	const spanErrorPrenom = document.querySelector('.mesgErrorPrenom');
	const spanErrorNom = document.querySelector('.mesgErrorNom');
	const spanErrorEmail = document.querySelector('.mesgErrorEmail');
	
	const btnModalMerci_close = document.querySelector('.close-modal-merci')
	const modal_merci = document.querySelector('.modal_merci')
	const btnModalMerci = document.querySelector('.btn-merci')

	btnFormulaireClose.nextElementSibling.innerHTML = namePhotographe;
	
	btnContactMoi.addEventListener('click', () => {
		console.log("click btn contact-moi");
		bgFormulaire.style.display = "block";
		formulaire.style.display = "block";
		containerPhotographer.style.display = "none";
		btnFormulaireClose.focus(); // Permet de focus sur le formulaire fermer le formulaire avec *espace*
	})

	btnFormulaireClose.addEventListener('click', (e) => {
		bgFormulaire.style.display = "none";
		containerPhotographer.style.display = "block";
		console.log("click btn close formulaire");
	})

	btnModalMerci_close.addEventListener('click', (e) => {
		bgFormulaire.style.display = "none";
		containerPhotographer.style.display = "block";
		console.log("click btnModalMerci_close none");
	})

	btnMerci.addEventListener('click', () => {
		containerPhotographer.style.display = "block";
		console.log("click btn-Merci close ");
	})

	/**
	 * ajout des modifieurs *valid, invalid* si champs nom, prénom valide ou non
	 * @param {string} pField champs: nom, prénom  
	 * @param {boolean} champ state
	 * @returns {boolean}
	 */
	function validationField (pField , state){
		if (state === true) {
			console.log('ChampsInputText OK');
			pField.classList.remove('champInputText-invalid');
			pField.classList.add('champInputText-valid');
			return true
		} 
		else {
			console.log('ChampsInputText NOK');
			pField.classList.add('champInputText-invalid');
			pField.classList.remove('champInputText-valid');
			return false
		}
	} 
	
	/**
	 * empêche l'user de mettre deux tirets
	 * @param {e} string
	 */
	prenom.addEventListener('input', (e) => {
		let n = e.target.value
		n = n.replace('--','-')
		if (n.length!==e.target.value.length) {
			e.target.value = n
			spanErrorPrenom.textContent = "deux tirets"
		} else {
			spanErrorPrenom.textContent = ''
		}
	})

	nom.addEventListener('input', (e) => {
		let n = e.target.value
		n = n.replace('--','-')
		if (n.length!==e.target.value.length) {
			e.target.value = n
			spanErrorPrenom.textContent = "deux tirets"
		} else {
			spanErrorPrenom.textContent = ''
		}
	})
	
	prenom.addEventListener('change', () => { 
		console.log("prénom:" + " " + prenom.value);
		return validationField(prenom, Validator.checkName(prenom.value, spanErrorPrenom))
	})
	
	nom.addEventListener('change', () => {
		console.log("nom:" + " " + nom.value); 
		return validationField(nom, Validator.checkName(nom.value, spanErrorNom))
	})

	email.addEventListener('change', ()=> {
		return validationField(email, Validator.checkMail(email.value, spanErrorEmail))
	})


	formulaire.addEventListener('submit', (e) => {

		e.preventDefault()
		if (Validator.checkName(prenom.value, spanErrorPrenom)
			&& Validator.checkName(nom.value, spanErrorNom)
			&& Validator.checkMail(email.value, spanErrorEmail)) {
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
			<img src="./Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}">
		</div>
		`
	formulaireEvent(photographer.name)
}