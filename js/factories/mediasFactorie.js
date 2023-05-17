import { StringFormatter } from "../utils/strinfFormatter.js";

const FactoryImage = {
	getUrl : (media, name) => {
		return `<img src="../../asset/Sample Photos/${name}/${media.image}" alt="${name+" "+media.alt}" tabindex="0" class="card__imageCard">`;
	}
}

const FactoryVideo = {
	getUrl : (media, name) => {
		return `<video src="../../asset/Sample Photos/${name}/${media.video}" alt="${name+" "+media.alt}" controls tabindex="0" class="card__imageCard"></video>`;
	}
}

const FactoryGif = {
	getUrl : (media, name) => {
		return `<img src="../../asset/Sample Photos/${name}/${media.video}" alt="${name+" "+media.alt}" controls tabindex="0" class="card__imageCard"></img>`;
	}
}

const factories = [
	{key:"image", value:FactoryImage},
	{key:"video", value:FactoryVideo},
	{key:"gif", value:FactoryGif}
]

export class FactoryMedias {
	constructor(){}

	createCard (photographer, media) {
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
			${this.getUrl(photographer, media)}
			<div class="card__media">
				<h3 class="card__titre">${media.title}</h3>
				<div class="card__info">
					<p class="card__infoLike">${media.likes}</p><span class="card__like" tabindex="0"><img src="/asset/images/Heart.svg" alt="logo Heart"</span>
				</div>
			</div>
		`
		return card;
	}

	getUrl(photographer, media) {
		const name = this.formatPhotographerName(photographer);
		const factory = factories.find( f => media.hasOwnProperty(f.key))
		return factory ? factory.value.getUrl(media,name) : ''
	}

	formatPhotographerName(photographer) {
		const firstname = StringFormatter.extractFirstname(photographer.name)
		return StringFormatter.replaceHyphen(firstname)
	}

}
