export function extractTitles(creators) {

	return creators.map((creator) => {
		let name = creator.get('creator');
		let creatorTitles = new Set();
		let titlesArray = new Set([
			['Professor', RegExp(/^([Pp]rof)\.? ?/)],
			['Sergeant', RegExp(/^([Ss]ergeant)\.? ?/)],
			['Sergeant', RegExp(/^([Ss]gt)\.? ?/)],
			['Jonkheer', RegExp(/^([Jj]hr)\.? ?/)],
			['Meester', RegExp(/^([Mm]r)\.? ?/)],
			['Doctor', RegExp(/^([Dd]r[^s])\.? ?/)],
			['Doctorandus', RegExp(/^([Dd]rs)\.? ?/)],
			['Ingenieur', RegExp(/^([Ii]r)\.? ?/)],
		]);

		titlesArray.forEach(title => {
			// console.log(name);
			let [ titleName, titleRegex ] = title;
			
			let splitName = name.split(titleRegex);

			if (splitName.length > 1) {
				// console.log(splitName);
				creatorTitles.add(titleName);
				name = splitName[2];
			}
		
		});

		if(creatorTitles.size == 0) creator.set('name', name).set('titles', undefined);
		else creator.set('name', name).set('titles', creatorTitles );

		return creator;

	});
}
