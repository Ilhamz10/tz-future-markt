export function calculateDateSum(dateString) {
	const digits = dateString.replace(/\./g, '').split('').map(Number);

	const sum = digits.reduce((acc, curr) => acc + curr, 0);

	return sum;
}
