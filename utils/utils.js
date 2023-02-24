/**
 * 
 * @param {string} el 
 * @param {string} adclass 
 * @param {string} parent 
 * @returns {elName}
 */
export const createCard = (el, addclass, parent) => {
	const elName = document.createElement(el);

	if (addclass && Array.isArray(addclass) && addclass.length > 0) 
		elName.classList.add(...addclass);
	if (typeof parent == "string") 
		document.querySelector(parent).appendChild(elName)
	else parent.appendChild(elName)
	
	return elName
}

export const createDivTrie = () => {
	let banner = document.querySelector('.bannerPhotographer')
	banner.insertAdjacentHTML('afterend', 
	`	
			<div class="trieAll">
				<p>Trier par</p>
				<label for="trie"  aria-haspopup="true aria-expanded="false>
					<select name="trie" id="Trie">
						<option class="popularite" value="popularite">Popularité</option>
						<option class="date" value="date">Date</option>
						<option class="titre" value="titre">Titre</option>    
					</select>
				</label>
			</div>
	`
	);
}

export const addTrieListeners = () => {
	const categorie = document.getElementById('Trie')
	console.log(categorie.value);
	const cards = [...document.querySelectorAll('.card')]
	console.log(cards);
	const sortCards = (e) => {
		const parent = document.querySelector('.galeriePhotographer')

		// detach cards
		cards.map((el) => parent.removeChild(el) );
		
		// sort cards
		if (e.target.value == 'popularite') {
			cards.sort((a , b) => {
				const t1 = a.media.likes
				const t2 = b.media.likes
				return t2-t1
			})
			// nodeTab
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

			console.log(cards.map(e=> e.media.date))
		}
		// attach cards
		cards.map((el) => parent.appendChild(el) );
	}

	categorie.onchange = categorie.onclick = sortCards
	const options = [...categorie.querySelectorAll('option')]
	options.map(opt => opt.onclick=sortCards)
}
