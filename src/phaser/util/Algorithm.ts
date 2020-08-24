export default class Algorithm {
	static randomIntFromInterval(min: number, max: number) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	static delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
