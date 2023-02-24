// Formulaire

const formulaireEvent = ( namePhotographe ) => {

	const btnContactMoi = document.querySelector('.bannerContact');
	const bgFormulaire = document.querySelector('.bgFormulaire')
	const formulaire = document.querySelector('.formulaire')
	const btnFormulaireClose = document.querySelector('.btnFormulaireClose')
	const btnModalMerci = document.querySelector('.close-modal-merci')
	const prenom = document.getElementById('prenom');
	const nom = document.getElementById('nom');
	const email = document.getElementById('email');
	const spanErrorPrenom = document.querySelector('.mesgErrorPrenom');
	const spanErrorNom = document.querySelector('.mesgErrorNom');
	const spanErrorEmail = document.querySelector('.mesgErrorEmail');

	btnFormulaireClose.nextElementSibling.innerHTML = namePhotographe;

	btnContactMoi.addEventListener('click', () => {
		console.log("click bgFormulaire block");
		bgFormulaire.style.display = "block";
		formulaire.style.display = "block";
		btnFormulaireClose.focus(); // Permet de focus sur le formulaire fermer le formulaire avec *espace*
	})
	btnFormulaireClose.addEventListener('click', (e) => {
		// e.preventDefault()
		bgFormulaire.style.display = "none";
		console.log("click bgFormulaire none");
	})
	btnModalMerci.addEventListener('click', (e) => {
		// e.preventDefault()
		bgFormulaire.style.display = "none";
		console.log("click btnModalMerci none");
	})

	//Regex si regex true alors *OnValidation* => true / false
	function validationField (pField , state){
		if (state == true ) {
			console.log('ChampsInputText OK', pField );
			pField.classList.remove('champInputText-invalid')
			pField.classList.add('champInputText-valid');
			return true
		} 
		else {
			console.log('ChampsInputText NOK', pField.value.length);
			pField.classList.add('champInputText-invalid')
			pField.classList.remove('champInputText-valid')
			return false
		}
	} 
	
	prenom.addEventListener('change', (e) => { 
		console.log("prénom", prenom);
		let state = validation(prenom.value)
		validationField(prenom, state)
		return state
	})
	
	nom.addEventListener('change', (e) => {
		console.log("nom", nom.value); 
		let state = validation(nom.value)
		validationField(nom, state)
		return state
	})

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
			msgErrorNom = " ✔️ "
		}f
	
		if (msgErrorprenom || msgErrorNom ){
			spanErrorPrenom.innerHTML = msgErrorprenom
			spanErrorNom.innerHTML = msgErrorNom
		}
		return champInputText;
	}
}

export const bannerPhotographer = (photographer) => {
	const banner = document.querySelector('.bannerPhotographer')
	banner.innerHTML = 
		`
		<div class="bannerPhotographer__info">
			<h2 class="bannerPhotographer__name">${photographer.name}</h2>
			<h2 class="bannerPhotographer__streetCity">${photographer.city}, ${photographer.country}</h2>
			<p class="bannerPhotographer__tagline">${photographer.tagline}</p>
		</div>
		<button class="bannerContact">contacter-moi</button>
		<div class="bannerPhotographer__image">
			<img src="/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}">
		</div>
		`
	formulaireEvent(photographer.name)
}