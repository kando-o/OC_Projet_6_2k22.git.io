export const StringFormatter = {
	/**
	 * returns the firstname from a full name
	 * @param {String} fullname 
	 * @returns {String} the first part of the name (the part before the " ")
	 */
	extractFirstname : (fullname) => fullname.split(' ').shift(),
	
	/**
	 * replace hyphens with the specified char (space if not provided)
	 * @param {String} str
	 * @returns {String} the formatted string
	 */
	replaceHyphen : (str, rep=' ') => str.replace('-', rep),
}