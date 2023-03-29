/**
 * @param {object from getUrl} IDPHOTOGRAPHER 
 * @param {object from getUrl} media 
 */
export const overlay = (IDPHOTOGRAPHER, media) => {
	const body = document.querySelector('body')
	const nbrLikesTotal = media.map(el => el.likes).reduce((som, el) => (som + el), 0)
	
	body.insertAdjacentHTML('afterend', 
	`	
		<div class="overlay" tabindex="0">
		<div class="overlay__nbrTotalLikes" tabindex="0"> ${nbrLikesTotal} &#10086</div>
		<div class="overlay__prixJour" tabindex="0"> ${IDPHOTOGRAPHER.price}€ / jour  </div>
		</div>
	`
)}