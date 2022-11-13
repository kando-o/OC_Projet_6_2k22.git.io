import { getData } from "../../utils/API.js";
import { createCard } from "../../utils/utils.js";

// crée une Api pour recuperer les données à part! OK !
//Utiliser le locale storage
// TODO:faire un type module pour les fonctions voir explication
// favoriser l'utilisation des const
//function trie détacher la node liste avec removechild trié avec sort() et ratacher la liste avec ?  


const getUrl = (data) => {
const url = new URL(location.href); // transforme l'url en un objet pratique | *ajoute des méthodes à l'URL*
const urlId = url.searchParams.get('id') // get params "id" in url
const IDPHOTOGRAPHER = data.photographers.find((el) => {return el.id == urlId}); // search in *data.photographer* el.photographerId == urlId
const IDMEDIA = data.media.filter((el) => {return el.photographerId == IDPHOTOGRAPHER.id}); // search in *data.media* el.photographerId == IDPHOTOGRAPHER.id
bannerPhotographer(IDPHOTOGRAPHER)

IDMEDIA.map((media) => {galeriePhotographer(media, IDPHOTOGRAPHER)})  

}

const bannerPhotographer = (photographer) => {
	const banner = document.querySelector('.containerPhotographer')
	banner.innerHTML =  
	`
	<div class="bannerPhotographer">
			<div class="bannerPhotographer__info">
				<h2 class="bannerPhotographer__name">${photographer.name}</h2>
				<h2 class="bannerPhotographer__streetCity">${photographer.city}, ${photographer.country}</h2>
				<p class="bannerPhotographer__tagline">${photographer.tagline}</p>
			</div>
			<button>contacter-moi</button>
			<div class="bannerPhotographer__image">
				<img src="/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}">
			</div>
			
		</div>
	
	`	
}

/**
 * 
 * @param {object} media 
 * @param {object} photographer 
 * @returns div card
 */

const galeriePhotographer = (media, photographer) => {
	const galeriePhotographer = document.querySelector('.galeriePhotographer')
	
	let objetMedia = ""
	let nomde = photographer.name.split(' ').shift() // renvoi un tableau de string séparer par une virgule et suprime le première el du tableau
	nomde = nomde.split('-').join(' ') // renvoi un tablean de string sans le *-* entre les string et renvoi une chaine de carractère

	if (media.hasOwnProperty('image')) {
		objetMedia = `<img src="/Sample Photos/${nomde}/${media.image}" alt="">`;
	} else if (media.hasOwnProperty('video')) {
		objetMedia = `<video src="/Sample Photos/${nomde}/${media.video}" controls></video> alt=""`
	}

	let card = document.createElement("div")
	card.classList.add(('card'))
	
	card.innerHTML = 
	`
		<div class="card__imageCard">
			${objetMedia}
		</div>

		<div class="card__titre">
			<h3>${media.title}</h3>
		</div>

		<div class="card__info">
			<p>${media.likes}</p>
			<span>&#x2766</span>
		</div>
	`
	galeriePhotographer.appendChild(card)
}

function main(data) {
	getUrl(data)
}

window.onload = () => {
	getData()
	.then(data => {console.log("incoming data"); return main(data)})
}


