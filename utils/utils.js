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

