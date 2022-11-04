import { getData } from "../../utils/API.js";
import { creatCard } from "../../utils/utils.js";

// crée une Api pour recuperer les données à part! OK !
//Utiliser le locale storage
// TODO:faire un type module pour les fonctions voir explication
// favoriser l'utilisation des const
// 

const getUrl = (data) => {
const url = new URL(location.href); // transforme l'url en un objet pratique | *ajoute des méthodes à l'URL*
const urlId = url.searchParams.get('id') // get params "id" in url
const IDPHOTOGRAPHER = data.photographers.find((el) => {return el.id == urlId}); // search in *data.photographer* el.photographerId == urlId
const IDMEDIA = data.media.find((el) => {return el.photographerId == urlId}); // search in *data.media* el.media == urlId
bannerPhotographer(IDPHOTOGRAPHER, IDMEDIA)

}
const bannerPhotographer = (photographer, media) => {
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
				<img src="/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="" srcset="">
			</div>
			
		</div>
	
	`
	// creatCard("div", "bannerPhotographer", "containerPhotographer")
	// creatCard("div", "bannerPhotographer__info", "bannerPhotographer")
	// creatCard("h2", "bannerPhotographer__name", "bannerPhotographer__info").innerHTML = `${photographer.name}`
	// creatCard("h2", "bannerPhotographer__streetPhotographe", "bannerPhotographer__info").innerHTML = `${photographer.city},${photographer.country}`
	// creatCard("p", "bannerPhotographer__taglinePhotographe", "bannerPhotographer__info").innerHTML = `${photographer.tagline}`
	
	// creatCard("button", "bannerPhotographer__streetPhotographe", "bannerPhotographer__image").innerText = "contacter-moi"
	// creatCard("div", "bannerPhotographer__image", "bannerPhotographer")
	
	// const imageBanner = document.createElement('img')
	// imageBanner.src = `<img src="/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="">`	

}


function main(data) {
	getUrl(data)
	
}

window.onload = () => {
	getData()
	.then(data => {console.log("incoming data"); return main(data)})
}


