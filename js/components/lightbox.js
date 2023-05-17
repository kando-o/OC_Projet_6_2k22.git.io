import Modal from "../utils/modal.js";

export default class LightBox extends Modal {
	
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

		super(lightBox, close)

		lightBox.classList.add('lightBox');
		img.classList.add("lightBox__image");
		video.classList.add("lightBox__image", "lightBox__video");
		video.setAttribute("controls", true);
		title.classList.add("lightbox__title");

		lightBox.style.display = 'none';
		img.style.display = 'none';
		video.style.display = 'none';

		lightBox.appendChild(title);
		lightBox.appendChild(img);
		// img.appendChild(title)
		lightBox.appendChild(video);
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
		
		this.left.onclick = ()=>{ that.prevMedia() };
		this.right.onclick = ()=>{ that.nextMedia() };
		// this.close.onclick = ()=>{ that.hide() };

		this.inputListeners = (e)=> {
			switch (e.code) {
				case "ArrowLeft": this.prevMedia(); break;
				case "ArrowRight": this.nextMedia(); break;
				case "Escape": e.preventdefault();
				case "Space": this.play(); break;
			}
		}

		// this.onShow = ()=>{};
		// this.onHide = ()=>{};

		this.onNextMedia = ()=>{};
		this.onPrevMedia = ()=>{};
	}

	setMedia (array) {
		this.media = [...array];
	}
	
	/*
	 * affichage de l'image au clic sur la card / affichage vidéo au clic sur une card
	 */
	_displayMedia() {

		const elem = this.media[this.index];
		console.log("title:" + elem.title,
		"src:"+ elem.src,
		"type:"+ elem.type)
		if (elem.type.toLowerCase() === 'video') {
			this.img.style.display = 'none';
			this.video.src = elem.src
			this.video.style.display = 'block';
		} else {
			this.video.style.display = 'none';
			this.img.src = elem.src;
			this.img.style.display = 'block';
		}
		
		this.title.textContent = elem.title;
	}

	/**
	 * cacher la lightbox au clic sur la croix
	 */
	hide() {
		super.hide()
		document.removeEventListener("keydown", this.inputListeners); 
	}

	/**
	 * afficher la lightbox au clic sur une card/img
	 */
	show () {
		super.show()
		document.addEventListener("keydown", this.inputListeners);
	}
	
	/**
	 * affichage du média au clic sur une card
	 * @param {string} src url du media
	 */
	openMedia(src) {
		const elem = this.media.find(media => media.src===src);
		this.index = elem.index;
		this._displayMedia();
		this.show();
	}
	
	/**
	 * next media dans la ligthbox
	 */
	nextMedia() {
		this.index = (this.index+1) % this.media.length;
		this._displayMedia();
		this.onNextMedia();
	}

	/**
	 * prevMedia media dans la ligthbox
	 */
	prevMedia() {
		this.index = (this.media.length + this.index-1) % this.media.length;
		this._displayMedia();
		this.onPrevMedia();
	}

	/**
	 * joue le média dans la lightbox
	 */
	play() {
		
	}
}