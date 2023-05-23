import { StringFormatter } from "../utils/strinfFormatter.js";

const FactoryImage = {
	/**
	 * Donne l'URL de l'image
	 * @param {object} media 
	 * @param {object} name photographer.name
	 * @returns URL de l'image
	 */
	getUrl : (media, name) => {
		return `<img src="../../asset/Sample Photos/${name}/${media.image}" alt="${name+" "+media.alt}" tabindex="0" class="card__imageCard">`;
	}
}

const FactoryVideo = {
	/**
	 * Donne l'URL de la vidéo
	 * @param {object} media 
	 * @param {object} name photographer.name 
	 * @returns URL de la vidéo
	 */
	getUrl : (media, name) => {
		return `<video src="../../asset/Sample Photos/${name}/${media.video}" alt="${name+" "+media.alt}" controls tabindex="0" class="card__imageCard"></video>`;
	}
}

const factories = [
	{key:"image", value:FactoryImage},
	{key:"video", value:FactoryVideo},
]

export class FactoryMedias {
	
	constructor(){}
	/**
	 * Création de la carte
	 * @param {Object} photographer valeur : name, id, city, country, tagLine etc..
	 * @param {Object} media valeur : image, id, photographerId, title, etc...
	 * @returns HTMLElement *card*
*	 */
	createCard (photographer, media) {
		if (!(media && photographer)) return null

		const url = this.getUrl(photographer, media);
		if (!url) return null

		const card = document.createElement("div");
		card.classList.add('card');
		card.media = media;
		
		const ls = localStorage.getItem("likes")
		if (ls) {
			const likesArray = JSON.parse(ls);
			if (likesArray.includes(media.id)) {
				media.likes = (+media.likes)+1;
			}
		}
		
		card.innerHTML = 
		`
			${url}
			<div class="card__media">
				<h3 class="card__titre">${media.title}</h3>
				<div class="card__info">
					<p class="card__infoLike">${media.likes}</p><span class="card__like" tabindex="0"><img src="/asset/images/Heart.svg" alt="logo Heart"</span>
				</div>
			</div>
		`
		return card;
	}

	/**
	 * Utilisation du formatage du nom + choix du factorie
	 * @param {Object} photographer 
	 * @param {Object} media 
	 * @returns  {Object} factory ou vide
	 */
	getUrl(photographer, media) {
		const name = this.formatPhotographerName(photographer);
		// recherche dans factories = *tab media* la property f.key = *image ou vidéo*
		const factory = factories.find( f => media.hasOwnProperty(f.key))
		return factory ? factory.value.getUrl(media, name) : ''
	}

	/**
	 * Configuration du Formatage du nom
	 * @param {Object} photographer 
	 * @returns {String} nom du photographe
	 */
	formatPhotographerName(photographer) {
		const firstname = StringFormatter.extractFirstname(photographer.name)
		return StringFormatter.replaceHyphen(firstname)
	}

}
