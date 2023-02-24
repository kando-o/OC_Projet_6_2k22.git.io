/**
 * @param {object from getUrl} IDPHOTOGRAPHER 
 * @param {object from getUrl} media 
 */
export const overlay = (IDPHOTOGRAPHER, media) => {
	const body = document.querySelector('body')
	let nbrLikesTotal = []

	nbrLikesTotal.push(media.map( el => el.likes ).reduce((prev, curr) => (prev + curr)))

	body.insertAdjacentHTML('afterend', 
	`	
	<div class="overlay">
	<div class="overlay__nbrTotalLikes"> ${nbrLikesTotal} &#10086</div>
	<div class="overlay__prixJour"> ${IDPHOTOGRAPHER.price}€ / jour  </div>
	</div>
	`
)}