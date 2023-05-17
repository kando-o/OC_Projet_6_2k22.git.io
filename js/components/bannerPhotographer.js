// Formulaire

import LightBox from "./lightbox.js";
import Modal from "../utils/modal.js";
import Validator from "./validator.js";


/**
 * ajout des modifieurs *valid, invalid* si champs nom, prénom valide ou non
 * @param {string} pField champs: nom, prénom  
 * @param {boolean} champ state
 * @returns {boolean}
 */
export const validationField = (pField , state) => {
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
 * au click sur *contact moi* affiche le formulaire
 * @param {Object} photographer photographe à contacter 
 */
export const formulaireEvent = ( photographer ) => {

	const namePhotographe = photographer.name;
	const containerPhotographer = document.querySelector('.containerPhotographer');
	const btnContactMoi = document.querySelector('.bannerContact');

	// #region - modale formulaire
		const bgFormulaire = document.querySelector('#formulaire');
		const formulaire = document.querySelector('.formulaire');
		const btnFormulaireClose = document.querySelector('.btnFormulaireClose');
		// ajoute le nom du photographe au formulaire
		btnFormulaireClose.nextElementSibling.textContent = namePhotographe;
		// input du formulaire
		const prenom = document.getElementById('prenom');
		const nom = document.getElementById('nom');
		const email = document.getElementById('email');
		const spanErrorPrenom = document.querySelector('.mesgErrorPrenom');
		const spanErrorNom = document.querySelector('.mesgErrorNom');
		const spanErrorEmail = document.querySelector('.mesgErrorEmail');

		const modal = new Modal(bgFormulaire, btnFormulaireClose)
		modal.onHide = () => {
			containerPhotographer.style.display = "block";
			console.log("click btn close formulaire");
		}
		modal.onShow = () => {
			containerPhotographer.style.display = "none";
			prenom.focus()
		}

		// empêche l'user de mettre deux tirets
		prenom.addEventListener('input', (e) => {
			let n = e.target.value;
			n = n.replace('--','-');
			if (n.length!==e.target.value.length) {
				e.target.value = n;
				spanErrorPrenom.textContent = "deux tirets";
			} else {
				spanErrorPrenom.textContent = '';
			}
		})

		nom.addEventListener('input', (e) => {
			let n = e.target.value;
			n = n.replace('--','-');
			if (n.length!==e.target.value.length) {
				e.target.value = n;
				spanErrorNom.textContent = "deux tirets";
			} else {
				spanErrorNom.textContent = '';
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



	// #endregion

	// #region - modale merci
		const bgFormulaireMerci = document.querySelector('#thanks');
		const btnMerci = document.querySelector('.btn-merci');
		const btnMerciClose = document.querySelector('.close-modal-merci');

		const modalMerci = new Modal(bgFormulaireMerci, btnMerciClose)
		modalMerci.onHide = () => {
			containerPhotographer.style.display = "block";
			console.log("click btnModalMerci_close none");
		}

		modalMerci.onShow = () => {
			containerPhotographer.style.display = "none";
			btnMerci.focus()
		}
		btnMerci.addEventListener('click', () => { modalMerci.hide() })
	// #endregion

	
	btnContactMoi.addEventListener('click', () => {
		console.log("click btn contact-moi");
		modal.show()
	})
	

	// validation formulaire
	formulaire.addEventListener('submit', (e) => {

		e.preventDefault()
		if (Validator.checkName(prenom.value, spanErrorPrenom)
			&& Validator.checkName(nom.value, spanErrorNom)
			&& Validator.checkMail(email.value, spanErrorEmail)) {
			console.log('condition validation Nom OK | Prénom OK');
			modal.hide()
			modalMerci.show()
		} else {
			console.log('condition validation Nom NOK | Prénom NOK');
		}
	})
}

/**
 * création de la bannière
 * @param {object} photographer 
 */
export const bannerPhotographer = (photographer) => {
	const banner = document.querySelector('.bannerPhotographer');
	banner.innerHTML = 
		`
		<div class="bannerPhotographer__info" tabindex="0">
			<h1 class="bannerPhotographer__name">${photographer.name}</h1>
			<h2 class="bannerPhotographer__streetCity">${photographer.city}, ${photographer.country}</h2>
			<p class="bannerPhotographer__tagline">${photographer.tagline}</p>
		</div>

		<button class="bannerContact">contactez-moi</button>
		
		<div class="bannerPhotographer__image">
			<img src="/asset/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}">
		</div>
		`
}