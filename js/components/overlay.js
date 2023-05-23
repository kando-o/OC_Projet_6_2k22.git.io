/**
 * @param {object} IDPHOTOGRAPHER
 * @param {object} media
 */
export const overlay = (IDPHOTOGRAPHER, media) => {
	console.log(media, IDPHOTOGRAPHER);
	const body = document.querySelector('body')
	const nbrLikesTotal = media.map(el => el.likes).reduce((som, el) => (som + el), 0)
	
	body.insertAdjacentHTML('afterend', 
	`	
		<div class="overlay" tabindex="0">
			<div class="overlay__nbrTotalLikes"> ${nbrLikesTotal} <span class='overlay__svgHeart'><img src="/asset/images/Heart_black.svg" alt="logo Heart-black"></div>
			<div class="overlay__prixJour"> ${IDPHOTOGRAPHER.price}€ / jour</div>
		</div>
	`
)}