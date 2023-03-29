/**
 * @param {object} domCards | cards du dom 
 * @function | ajout et suppréssion du like
 */
export const conterLike = (domCards) => {
	
	//liste des coeurs
	domCards.map(domCard => {
		domCard.querySelector(".card__info")
		.addEventListener('click', () => {
			const like = domCard.querySelector('.card__infoLike');
			const localLs = localStorage.getItem("likes")
			const likesArray = JSON.parse( localLs ? localLs : "[]") //si localLs true alors localLs sinon si localLs false "[]"

			if (likesArray.find(id => id===domCard.media.id)) {
				like.textContent  = (+like.textContent) - 1 //transform la valeur en nombre -1
				const positionOfLikeIntheArray = likesArray.indexOf(domCard.media.id) //index de *domCard.media.id* dans le tableau likesArray
				likesArray.splice(positionOfLikeIntheArray, 1) //coupe le tableau à l'index positionOfLikeIntheArray
			}else {
				like.textContent  = (+like.textContent) + 1
				likesArray.push(domCard.media.id)
			}

			localStorage.setItem("likes", JSON.stringify(likesArray))
			updateLikes(domCards)
		})
	})
}

/**
 * 
 * @param {object} domCards 
 * @function | maj des likes totales quand => (conterlike) on
 */
const updateLikes = (domCards) => {
	const total = domCards.reduce((sum, dom) => sum + (+dom.querySelector('.card__infoLike').textContent), 0)
		document.querySelector(".overlay__nbrTotalLikes").innerHTML = `${total} &#10086`
}