

export default class LightBox {

	constructor() {
		const body = document.querySelector('body');
		
		const lightBox = document.createElement('figure');
		const img = document.createElement('img');
		const video = document.createElement('video');
		const title = document.createElement("figcaption");
		
		const left = document.createElement("span");
		left.textContent = "<"
		left.classList.add("lightbox__arrow", "left")
		left.tabIndex = 1;
		const right = document.createElement("span");
		right.textContent = ">"
		right.classList.add("lightbox__arrow", "right")
		right.tabIndex = 1;
		const close = document.createElement("span");
		close.textContent = "X"
		close.classList.add("lightbox__arrow", "right", "close")
		close.tabIndex = 1;

		lightBox.classList.add('lightBox');
		img.classList.add("lightBox__image");
		video.classList.add("lightBox__image", "lightBox__video");
		video.setAttribute("controls", true);
		title.classList.add("lightbox__title");

		lightBox.style.display = 'none';
		img.style.display = 'none';
		video.style.display = 'none';

		lightBox.appendChild(img);
		lightBox.appendChild(video);
		lightBox.appendChild(title);
		lightBox.appendChild(left);
		lightBox.appendChild(right);
		lightBox.appendChild(close);
		body.appendChild(lightBox);

		this.lightbox = lightBox;
		this.index = 0;
		this.media = [];
		this.img = img;
		this.video = video;
		this.title = title;

		this.left = left;
		this.right = right;
		this.close = close;

		const that = this;

		this.left.onclick = ()=>{ that.prevMedia() }
		this.right.onclick = ()=>{ that.nextMedia() }
		this.close.onclick = ()=>{ that.hide() }

		this.onShow = ()=>{}
		this.onHide = ()=>{}
	}

	setMedia (array) {
		this.media = [...array]
	}
	
	// affichage de la carde
	_displayMedia() {
		const elem = this.media[this.index];
		console.log("type:"+elem.type)
		if (elem.type.toLowerCase() === 'video') {
			this.img.style.display = 'none';
			this.video.src = elem.src
			this.video.style.display = 'block';
		} else {
			this.video.style.display = 'none';
			this.img.src = elem.src
			this.img.style.display = 'block';
		}
		this.title.textContent = elem.title;
	}

	// au click sur le fermeture ou à l'éxterieur du carroussel
	hide() {
		this.lightbox.style.display = "none"
		this.onHide()
	}

	//au click sur la carte affichache du carrouselle et seulement sur la carte pas sur les likes
	show () {
		this.lightbox.style.display = "block"
		this.onShow()
	}

	openMedia(src) {
		const elem = this.media.find(media => media.src===src)
		this.index = elem.index;
		this._displayMedia();
		this.show()
	}

	nextMedia() {
		this.index = (this.index+1) % this.media.length;
		this._displayMedia();
	}

	prevMedia() {
		this.index = (this.media.length + this.index-1) % this.media.length;
		this._displayMedia();
	}
}