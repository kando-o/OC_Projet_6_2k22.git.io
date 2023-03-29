import { getData } from "../utils/API.js";

const contentMain =  (data) => {
	let containerGaleriesItemCard = document.querySelector('.container__galeriesPhotographe__itemCard')
	data.photographers.map((el) => {
		containerGaleriesItemCard.innerHTML += 
		`
		<div class="cardPhotographe ${el.id}">
			<a class="linkToPhotographer" href="/photographer/view/photographer.html?id=${el.id}" target="_blanc">
				<div class="imgPhotographe">
					<img src="./Sample Photos/Photographers ID Photos/${el.portrait}" alt="image du photographe">
					<h2 tabindex="0">${el.name}</h2>
				</div>
			</a>
			<div class="titreNomPhotographe">
				<h3 tabindex="0">${el.city}</h3> 
				<p tabindex="0">${el.tagline}</p>
				<p tabindex="0">${el.price}/jr</p>
			</div>
		</div>
		` 
	})
};

window.onload = () => { // Permet de lancer la fonction seulement quand la page HTML est chargé
	getData() 
	.then((data) => {return contentMain(data)})
}