export default class Modal {
	
	constructor (body, closeButton, styleOnShow="block") {
		
		this.body = body;
		this.closeButton = closeButton;
		this.styleOnShow = styleOnShow;

		this.onShow = ()=>{};
		this.onHide = ()=>{};

		const that = this;
		this.listeners = {
			escape : e => (e.code === 'Escape') && (that.hide()),
			closeButton : () => that.hide()
		};
	}

	hide() {
		this.body.style.display = "none";
		document.removeEventListener("keydown", this.listeners.escape); 
		this.closeButton && this.closeButton.removeEventListener("click", this.listeners.closeButton);
		this.onHide && this.onHide();
	}

	show () {
		this.body.style.display = this.styleOnShow;
		document.addEventListener("keydown", this.listeners.escape);
		this.closeButton && this.closeButton.addEventListener("click", this.listeners.closeButton);
		this.onShow && this.onShow();
	}

}