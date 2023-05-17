import { bannerPhotographer, formulaireEvent } from "../../js/components/bannerPhotographer.js";
import { getData } from "../../js/api/API.js";
import { createDivTrie, addTrieListeners } from "../../js/utils/utils.js";

import LightBox from "../../js/components/lightbox.js";
import { overlay } from "../../js/components/overlay.js";
import { conterLike } from "../../js/components/likes.js";
import { FactoryMedias } from "../../js/factories/mediasFactorie.js";

/**
 * @param {object} media 
 * @param {object} photographer 
 * @return div card
 */
const createDivGaleriePhotographer = (media, photographer) => {
	const factory = new FactoryMedias();
	const galeriePhotographer = document.querySelector('.galeriePhotographer');
	const card = factory.createCard(photographer, media);
	galeriePhotographer.appendChild(card);
	return card;
} 


/**
 * @param {JSON} data 
 * @returns 
 */
const getUrl = (data) => {
	console.log(data.photographers)

	// transforme l'url en un objet pratique | *ajoute des méthodes à l'URL*
	const url = new URL(location.href);

	// get params "id" in url
	const urlId = url.searchParams.get('id');

	// search in *data.photographer* el.photographerId == urlId
	const IDPHOTOGRAPHER = data.photographers.find(el => el.id == urlId);

	// search in *data.media* el.photographerId == IDPHOTOGRAPHER.id
	const media = data.media.filter(el => el.photographerId == IDPHOTOGRAPHER.id);

	bannerPhotographer(IDPHOTOGRAPHER);
	formulaireEvent(IDPHOTOGRAPHER);
	
	return media.map((media) => createDivGaleriePhotographer(media, IDPHOTOGRAPHER), overlay(IDPHOTOGRAPHER, media));

}


//Au chargement de la page
/**
 * @returns {data} | promise de getData
 */
window.onload = () => {

	// creation de la lightbox
	const myLightBox = new LightBox();

	// Faire apparaitre et disparaitre le background de la lightbox onhide / onshow depuis lightbox.js
	myLightBox.onShow = ()=> {
		document.querySelector(".containerPhotographer").style.display = 'none';
		console.log("onShow")
	};

	myLightBox.onHide = ()=> {
		document.querySelector(".containerPhotographer").style.display = 'block';
		console.log("onHide")
	};

	// fonction d'envoi des images à la lightbox
	const setLightboxMedia = () => {
		
		const domCards = [...document.querySelectorAll('.card')];
		// ajoute l'image la vidéo le titre et l'index à media
		myLightBox.setMedia( domCards.map((card, index) => {
			const elem = card.querySelector(".card__imageCard");
			const title = card.querySelector(".card__titre").textContent;
			return {
				index,
				type : elem.tagName,
				src : elem.src,
				title
			}
		}))
	}

	// initialisation du tri
	createDivTrie();

	// récupération de la base de données
	getData()

	// application du main en "seedant" les données
	.then(data => getUrl(data) )

	// génération des ...
	.then(cards => {
		
		addTrieListeners(setLightboxMedia);

		// ajout de la gestion des événements des images
		cards.map(card => {
			const img = card.querySelector(".card__imageCard");

			// évènement au click sur les cards
			const displayImageInLightbox = () => {
				myLightBox.openMedia(img.src);
				myLightBox.lightbox.focus();
				console.log('test.focus nok');
			}

			img.onclick = displayImageInLightbox;
			img.onkeydown = (e) => {if (["Enter","Space"].includes(e.code)) displayImageInLightbox()};
		})
		
		// mise à jour du compteur global de like de la page (dans l'overlay)
		conterLike(cards)

		// initialise les images dans la lightbox
		setLightboxMedia()

	})
}
