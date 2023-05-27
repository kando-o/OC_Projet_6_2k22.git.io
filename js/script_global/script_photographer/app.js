import { bannerPhotographer, formulaireEvent } from "../../components/bannerPhotographer.js";
import { getData } from "../../api/API.js";
import { createDivTrie, addTrieListeners } from "../../utils/utils.js";

import LightBox from "../../components/lightbox.js";
import { overlay } from "../../components/overlay.js";
import { conterLike } from "../../components/likes.js";
import { FactoryMedias } from "../../factories/mediasFactorie.js";

/**
 * @param {object} media 
 * @param {object} photographer 
 * @return div card
 */
const createDivGaleriePhotographer = (media, photographer) => {
	const factory = new FactoryMedias();
	const galeriePhotographer = document.querySelector('.galeriePhotographer');
	const card = factory.createCard(photographer, media);
	if (!card) return null;
	galeriePhotographer.appendChild(card);
	return card;
} 

/**
 * @param {JSON} data 
 * @returns 
 */
const getUrl = (data) => {

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
	
	const cards = media.map((media) => createDivGaleriePhotographer(media, IDPHOTOGRAPHER), overlay(IDPHOTOGRAPHER, media))
	return cards.filter(obj=>obj);

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
	};

	myLightBox.onHide = ()=> {
		document.querySelector(".containerPhotographer").style.display = 'block';
	};

	// fonction d'envoi des images à la lightbox
	const setLightboxMedia = () => {
		
		const domCards = [...document.querySelectorAll('.card')];
		// ajoute l'image la vidéo le titre et l'index à media
		myLightBox.setMedia( domCards.map((card, index) => {
			const elem = card.querySelector(".card__imageCard");
			const title = card.querySelector(".card__titre").textContent;
			const alt = elem.getAttribute('alt');
			return {
				index,
				type : elem.tagName,
				src : elem.src,
				title,
				alt
			}
		}))
	}

	// initialisation du tri
	createDivTrie();

	// récupération de la base de données
	getData()

	// application du main en "seedant" les données
	.then(data => getUrl(data) )

	.then(cards => {

		//Ajout de l'événement de trie
		addTrieListeners(setLightboxMedia);

		// ajout de la gestion des événements du media
		cards.map(card => {
			const media = card.querySelector(".card__imageCard");
			// évènement au click sur les cards
			const displayImageInLightbox = () => {
				myLightBox.openMedia(media.src);
				myLightBox.lightbox.focus();
			}

			media.onclick = displayImageInLightbox;
			media.onkeydown = (e) => {if (["Enter","Space"].includes(e.code)) displayImageInLightbox()};
		})
		
		// mise à jour du compteur global de like de la page (dans l'overlay)
		conterLike(cards)

		// initialise les images dans la lightbox
		setLightboxMedia()

	})
}
