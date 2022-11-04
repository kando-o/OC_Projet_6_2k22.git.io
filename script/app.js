import { getData } from "../utils/API.js";

console.log(getData());

const contentMain =  (data) => {
	let containerGaleriesItemCard = document.querySelector('.container__galeriesPhotographe__itemCard')
	data.photographers.map((el) => {
		// console.log(el);
		containerGaleriesItemCard.innerHTML += 
		`
		<div class="cardPhotographe ${el.id}">
			<a class="linkToPhotographer" href="/photographer/view/photographer.html?id=${el.id}" target="_blanc">
				<div class="imgPhotographe">
					<img src="./Sample Photos/Photographers ID Photos/${el.portrait}" alt="image du photographe">
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

window.onload = () => { // Permet de lancer la fonction seulement quand la page HTML est chargé
	getData() 
	.then((data) => {return contentMain(data)})
}

