import { bannerPhotographer } from "../../components/bannerPhotographer.js";
import { getData } from "../../utils/API.js";
import { createDivTrie, addTrieListeners } from "../../utils/utils.js";

import LightBox from "../../components/lightbox.js";
import { overlay } from "../../components/overlay.js";

/**
 * @param {object} media 
 * @param {object} photographer 
 * @returns div card
 */
const createDivGaleriePhotographer = (media, photographer) => {
	const galeriePhotographer = document.querySelector('.galeriePhotographer')
	console.log();
	let objetMedia = ""
	let nomde = photographer.name.split(' ').shift() // renvoi un tableau de string séparer par une virgule et suprime le première el du tableau
	nomde = nomde.split('-').join(' ') // renvoi un tablean de string sans le *-* entre les string et renvoi une chaine de carractère
	
	if (media.hasOwnProperty('image')) {
		objetMedia = `<img src="/Sample Photos/${nomde}/${media.image}" alt="" tabindex="0" class="card__imageCard">`;
	} else if (media.hasOwnProperty('video')) {
		objetMedia = `<video src="/Sample Photos/${nomde}/${media.video}" alt="" controls tabindex="0" class="card__imageCard"></video> `
	}
	
	const card = document.createElement("div")
	card.classList.add('card')
	card.media = media;
	
	card.innerHTML = 
	`
		${objetMedia}
		<h3 class="card__titre">${media.title}</h3>
		<div class="card__info">
			<p class="card__like">${media.likes}</p>
			<span>&#x2766</span>
		</div>
	`
	galeriePhotographer.appendChild(card)
	return card
} 

const getUrl = (data) => {
	const url = new URL(location.href); // transforme l'url en un objet pratique | *ajoute des méthodes à l'URL*
	const urlId = url.searchParams.get('id') // get params "id" in url
	const IDPHOTOGRAPHER = data.photographers.find(el => el.id == urlId); // search in *data.photographer* el.photographerId == urlId
	const media = data.media.filter(el => el.photographerId == IDPHOTOGRAPHER.id); // search in *data.media* el.photographerId == IDPHOTOGRAPHER.id
	bannerPhotographer(IDPHOTOGRAPHER)
	return media.map((media) => createDivGaleriePhotographer(media, IDPHOTOGRAPHER), overlay(IDPHOTOGRAPHER, media)
	)
}

//Au chargement de la page
window.onload = () => {
	const myLightBox = new LightBox()
	createDivTrie();
	getData() // Recuperation de la data
	.then(data => {
		console.log("incoming data");
		return main(data);
	})
	.then(cards => {
		console.log(cards);
		addTrieListeners();
		cards.map(card => {
			const img = card.querySelector(".card__imageCard")
			img.onclick = ()=>{
				myLightBox.openMedia(img.src)
			}
		})

		myLightBox.setMedia( cards.map((card,index) => {
			const elem = card.querySelector(".card__imageCard");
			const title = card.querySelector(".card__titre").textContent;
			return {
				index,
				type : elem.tagName,
				src : elem.src,
				title
			}
		}))

		myLightBox.onShow = ()=> { document.querySelector(".containerPhotographer").style.display = 'none'; console.log("onShow") }
		myLightBox.onHide = ()=> { document.querySelector(".containerPhotographer").style.display = 'block'; console.log("onHide") }
	})
}

function main(data) {
	console.log(data.photographers);
	return getUrl(data)
}