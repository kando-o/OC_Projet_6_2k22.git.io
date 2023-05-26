import { getData } from "/js/api/API.js";

/**
 * création des cards photographe sur la HP
 * @param {Promise} objet 
 */
const contentMain = (data) => {
	let containerGaleriesItemCard = document.querySelector('.container__galeriesPhotographe__itemCard');
	data.photographers.map((el) => {
		containerGaleriesItemCard.innerHTML += 
		`
		<div class="cardPhotographe ${el.id}">
			<a class="linkToPhotographer" href="./photographer/html/photographer.html?id=${el.id}" target="_blanc">
				<div class="imgPhotographe">
					<img src="/asset/Sample Photos/Photographers ID Photos/${el.portrait}" alt="photo de ${el.name}">
					<h2>${el.name}</h2>
				</div>
			</a>
			<div class="titreNomPhotographe">
				<h3>${el.city}</h3> 
				<p>${el.tagline}</p>
				<p>${el.price}/jr</p>
			</div>
		</div>
		` 
	})
};

window.onload = () => { 
	// Permet de lancer la fonction seulement quand la page HTML est chargé
	getData() 
	.then((data) => {return contentMain(data)})
}