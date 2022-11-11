export function sleep() {
	return new Promise((resolve) => {
		setTimeout(resolve, 2000);
	});
}

export function capitalizeFirstLetter(string) {
	return string.slice(0, 1) + string.charAt(1).toUpperCase() + string.slice(2);
}
