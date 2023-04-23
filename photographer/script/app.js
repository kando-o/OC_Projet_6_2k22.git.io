import { bannerPhotographer } from "../../components/bannerPhotographer.js";
import { getData } from "../../utils/API.js";
import { createDivTrie, addTrieListeners } from "../../utils/utils.js";

import LightBox from "../../components/lightbox.js";
import { overlay } from "../../components/overlay.js";
import { conterLike } from "../../components/likes.js";

/**
 * @param {object} media 
 * @param {object} photographer 
 * @return div card
 */
const createDivGaleriePhotographer = (media, photographer) => {
	const galeriePhotographer = document.querySelector('.galeriePhotographer');
	let objetMedia = "";
	let nomde = photographer.name.split(' ').shift(); // renvoi un tableau de string séparer par une virgule et suprime le première el du tableau
	nomde = nomde.split('-').join(' '); // renvoi un tablean de string sans le *-* entre les string et renvoi une chaine de carractère
	
	if (media.hasOwnProperty('image')) {
		objetMedia = `<img src="./Sample Photos/${nomde}/${media.image}" alt="${nomde+" "+media.alt}" tabindex="0" class="card__imageCard">`;
	} else if (media.hasOwnProperty('video')) {
		objetMedia = `<video src="./Sample Photos/${nomde}/${media.video}" alt="${nomde+" "+media.alt}" controls tabindex="0" class="card__imageCard"></video> `;
	}
	
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
		${objetMedia}
		<h3 class="card__titre">${media.title}</h3>
		<div class="card__info">
			<p class="card__infoLike">${media.likes}</p><span class="card__like">&#x2766</span>
		</div>
	`
	galeriePhotographer.appendChild(card);
	return card;
} 

/**
 * @param {JSON} data 
 * @returns 
 */
const getUrl = (data) => {
	const url = new URL(location.href); // transforme l'url en un objet pratique | *ajoute des méthodes à l'URL*
	const urlId = url.searchParams.get('id'); // get params "id" in url
	const IDPHOTOGRAPHER = data.photographers.find(el => el.id == urlId); // search in *data.photographer* el.photographerId == urlId
	const media = data.media.filter(el => el.photographerId == IDPHOTOGRAPHER.id); // search in *data.media* el.photographerId == IDPHOTOGRAPHER.id
	bannerPhotographer(IDPHOTOGRAPHER);
	return media.map((media) => createDivGaleriePhotographer(media, IDPHOTOGRAPHER), overlay(IDPHOTOGRAPHER, media));
}

//Au chargement de la page
/**
 * @returns {data} | promise de getData
 */
window.onload = () => {
	const myLightBox = new LightBox();
	createDivTrie();
	getData()

	/**
	 * @params {objet}
	 * @Promise {objet}
	 */
	.then(data => {
		console.log("incoming data");
		return main(data);
	})
	.then(cards => {
		
		addTrieListeners();

		cards.map(card => {
			const img = card.querySelector(".card__imageCard");
			/**
			 * @function | évènement au click sur les cards
			 */
			const listener = () => {
				myLightBox.openMedia(img.src);
				myLightBox.lightbox.focus();
				console.log('test.focus nok');
			}
			img.onclick = listener;
			img.onkeydown = (e) => {if (e.code==="Enter") listener(e)};
		})
		
		conterLike(cards)

		/**
		 * @function | ajoute l'image la vidéo le titre et l'index à media
		 * @param {array}
		 * @returns {object} 
		 */
		myLightBox.setMedia( cards.map((card, index) => {
			const elem = card.querySelector(".card__imageCard");
			const title = card.querySelector(".card__titre").textContent;
			return {
				index,
				type : elem.tagName,
				src : elem.src,
				title
			}
		}))

		// Faire apparaitre et disparaitre le background de la lightbox onhide / onshow depuis lightbox.js
		myLightBox.onShow = ()=> { document.querySelector(".containerPhotographer").style.display = 'none'; console.log("onShow")};
		myLightBox.onHide = ()=> { document.querySelector(".containerPhotographer").style.display = 'block'; console.log("onHide")};
	})
}

/**
 * @param {object} data tableau d'objet
 * @returns getUrl(object data)
 */
function main(data) {
	console.log(data.photographers);
	return getUrl(data)
}