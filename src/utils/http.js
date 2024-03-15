export async function getData() {
	const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');

	if (!response.ok) {
		const error = new Error('The error is ocured!');
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const result = await response.json();

	return result;
}
