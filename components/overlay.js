/**
 * @param {object} IDPHOTOGRAPHER tableau d'objet
 * @param {object} media tableau d'objet
 */
export const overlay = (IDPHOTOGRAPHER, media) => {
	console.log(media, IDPHOTOGRAPHER);
	const body = document.querySelector('body')
	const nbrLikesTotal = media.map(el => el.likes).reduce((som, el) => (som + el), 0)
	
	body.insertAdjacentHTML('afterend', 
	`	
		<div class="overlay" tabindex="0">
		<div class="overlay__nbrTotalLikes" tabindex="0"> ${nbrLikesTotal} &#10086</div>
		<div class="overlay__prixJour" tabindex="0"> ${IDPHOTOGRAPHER.price}€ / jour</div>
		</div>
	`
)}