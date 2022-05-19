import { position } from "raycaster/positions";
import { castRay } from "raycaster/rays";
import { tileMapFromString } from "raycaster/tileMaps";
import { useEffect, useState } from "react";

const map = tileMapFromString(`
11111111111
10000000001
10000000001
10000000001
10000000001
10000000001
10000000001
10000000001
10000000001
10000000001
10000000001
10000000001
10000000001
10000000001
10000000001
10000000001
11111111111
`, '1')


const { x, y } = position(1.5, 1.5);
const d = 85;

const bench = (runs: number) => {
    if (runs < 1 || isNaN(runs)) {
        return [];
    }

    const results = new Array<number>(runs);

    for (let i = 0; i < runs; i++) {
        const start = performance.now();
        castRay(map, x, y, d);
        results[i] = performance.now() - start;
    }

    return results;
};


const BenchmarkDisplay = ({ results }: { results: number[] }) => {
    if (results.length < 1) {
        return <p>No benchmarks have been run.</p>
    }

    const total = results.reduce((sum, n) => sum + n, 0);
    const average = total / results.length;

    const min = results[0];
    const max = results.at(-1);

    return <section>
        <p>Across {results.length} runs:</p>
        <table>
            <thead>
                <tr>
                    <th>Average</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{average}</td>
                    <td>{min}</td>
                    <td>{max}</td>
                    <td>{total}</td>
                </tr>
            </tbody>
        </table>
    </section>
};

//TODO trigger on button press.
const BenchmarkConfig = ({ runBenchmark }: {
    runBenchmark(runs: number): void
}) => {
    const [runs, setRuns] = useState(0);

    return <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="runs">Number of runs</label>
        <input type="text"
            name="runs"
            id="runs"
            value={runs}
            onChange={(e) => {
                const { value } = e.target;

                if (Number(value)) {
                    setRuns(Number(value));
                } else {
                    setRuns(0);
                }
            }} />
        <button onClick={() => runBenchmark(runs)}>Run Benchmark.</button>
    </form>
};

export const BenchmarkSuite = () => {
    const [results, setResults] = useState<number[]>([]);

    const updateRuns = (runs: number) => {
        const results = bench(runs);
        results.sort((a, b) => a - b);
        setResults(results);
    };

    return <section>
        <BenchmarkConfig runBenchmark={updateRuns} />

        <BenchmarkDisplay results={results} />
    </section>;
}