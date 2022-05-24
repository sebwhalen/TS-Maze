export interface BenchmarkResult {
    /**
     * The number of times that the function was run.
     */
    numberOfRuns: number,

    /**
     * The total time taken, in milliseconds.
     */
    total: number,

    /**
     * The average time taken, in milliseconds.
     */
    average: number
}


const defaultResults: BenchmarkResult = Object.freeze({
    numberOfRuns: 0,
    total: 0,
    average: 0
});

export const bench = (f: () => void, numberOfRuns: number): BenchmarkResult => {
    if (numberOfRuns < 1 || isNaN(numberOfRuns)) {
        return defaultResults;
    }

    //performance.now() is imprecise, using it across all runs minimizes the error introduced
    const start = performance.now();

    for (let i = 0; i < numberOfRuns; i++) {
        f();
    }

    const timeTaken = performance.now() - start;

    return {
        numberOfRuns,
        total: timeTaken,
        average: timeTaken / numberOfRuns
    };
};