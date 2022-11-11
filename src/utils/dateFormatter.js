const checkDay = (Day) => {
	const daySuffix = {
		'01': 'st',
		'02': 'nd',
		'03': 'rd',
	};
	if (daySuffix[Day]) {
		return `${Day.slice(1)}${daySuffix[Day]}`;
	}
	if (Day[0] === '0') {
		return `${Day.slice(1)}th`;
	}
	return `${Day}th`;
};

const checkMonth = {
	'01': 'January',
	'02': 'February',
	'03': 'March',
	'04': 'April',
	'05': 'May',
	'06': 'June',
	'07': 'July',
	'08': 'August',
	'09': 'September',
	10: 'October',
	11: 'November',
	12: 'December',
};

const dateFormatter = (date) => {
	const dateInArray = date.slice(0, 10).split('-');
	const [Year, Month, Day] = dateInArray;
	const day = checkDay(Day);
	const month = checkMonth[Month];
	const year = Year;
	return `${day} ${month} ${year}`;
};

export default dateFormatter;
