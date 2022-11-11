const paginate = (array, itemsPerPage) => {
	if (!Array.isArray(array)) {
		return false;
	}
	const pages = Math.ceil(array.length / itemsPerPage);

	const paginatedData = Array.from({ length: pages }, (_, index) => {
		const start = index * itemsPerPage;
		return array.slice(start, start + itemsPerPage);
	});
	return paginatedData;
};
export default paginate;
