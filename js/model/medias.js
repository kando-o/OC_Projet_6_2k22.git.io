export class Medias {
	constructor(data, photographer) {
		this._picture = data.image
		this._video = data.video
		this._alt = data.alt
		this._nom = photographer.name
	}

	get picture() {
		return `../../asset/Sample Photos/${this._nom}/${this._picture}`
	}

	get alt() {
		return this._alt
	}

	get video() {
		return `../../asset/Sample Photos/${this._nom}/${this._video}`
	}
} 
