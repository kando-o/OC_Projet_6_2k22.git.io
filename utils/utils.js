/**
 * 
 * @param {string} el 
 * @param {string} adclass 
 * @param {string} parent 
 * @returns {elName}
 */
export const creatCard = (el, adclass, parent) => {
	const elName = document.createElement(el);
	elName.classList.add(adclass);
	document.querySelector(parent).appendChild(elName)
	return elName
}