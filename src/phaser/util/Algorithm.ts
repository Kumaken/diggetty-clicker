export default class Algorithm {
	static randomIntFromInterval(min: number, max: number) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	static randomFloatFromInterval(min: number, max: number){
		// inclusive min and exclusive max
		return (Math.random()*(max - min)) + min;
	}

	static roundToNDecimal(value: number, n: number){
		// n is number of decimal
		return Math.round((value + Number.EPSILON) * Math.pow(10,n)) / Math.pow(10,n)
	}

	static delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
