/**
 * fonction pour crée une carte
 * @param {string} el 
 * @param {string} adclass 
 * @param {string} parent 
 * @returns {elName}
 */
export const createCard = (el, addclass, parent) => {
	const elName = document.createElement(el);

	if (addclass && Array.isArray(addclass) && addclass.length > 0);
	//Array.isArray permet de déterminer si l'objet passé en argument est un objet dit Array
		elName.classList.add(...addclass);
	if (typeof parent == "string") 
		document.querySelector(parent).appendChild(elName)
	else parent.appendChild(elName)
	
	return elName
}

/**
 * création de la div trie
 */
export const createDivTrie = () => {
	let banner = document.querySelector('.bannerPhotographer');
	banner.insertAdjacentHTML('afterend', 
	`	
			<div class="trieAll">
				<h2>Trier par</h2>
				<label for="trie" aria-haspopup="true" aria-expanded="false">
					<select name="trie" id="trie">
						<option class="popularite" value="popularite">Popularité</option>
						<option class="date" value="date">Date</option>
						<option class="titre" value="titre">Titre</option>    
					</select>
				</label>
			</div>
	`
	);
}

/**
* ajout de l'évènement sur le trie :date :popularité :titre
*/
export const addTrieListeners = () => {
	const categorie = document.getElementById('Trie');
	const cards = [...document.querySelectorAll('.card')];
	
	/**
	 * trie des cards : date, popularité, likes
	 * @param {Event} e 
	 */
	const sortCards = (e) => {
		const parent = document.querySelector('.galeriePhotographer')
		// détach les cards
		cards.map((el) => parent.removeChild(el) );
		
		if (e.target.value == 'popularite') {
			cards.sort((a , b) => {
				const t1 = a.media.likes
				const t2 = b.media.likes
				return t2-t1
			})
		} else if (e.target.value == 'date') {
			cards.sort((a,b) => {
				const t1 = a.media.date
				const t2 = b.media.date
				return new Date(t1)-new Date(t2)
			})
		} else if (e.target.value == 'titre') {
			console.log(cards.map(f=> f.media.title))
			cards.sort((a,b) => {
				const t1 = a.media.title
				const t2 = b.media.title
				return t1.localeCompare(t2)
			})
		}
		// attach cards
		cards.map((el) => parent.appendChild(el) );
	}

	categorie.onchange = categorie.onclick = sortCards;
	// au changement de des options = évènement au clique sur catégorie => (sortCards)
}