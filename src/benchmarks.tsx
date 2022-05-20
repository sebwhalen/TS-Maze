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
        return 0;
    }

    //performance.now() is imprecise, using it across all runs minimizes the error introduced 
    const start = performance.now();

    for (let i = 0; i < runs; i++) {
        castRay(map, x, y, d);
    }

    return performance.now() - start;
};


const BenchmarkDisplay = ({ results }: { results: number }) => {
    if (results === 0) {
        return <p>No benchmarks have been run.</p>
    }

    return <section>
        <table>
            <thead>
                <tr>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{results}</td>
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
        <label>
            <span>Number of runs</span>
            <input type="text"
                name="runs"
                value={runs}
                onChange={(e) => {
                    const { value } = e.target;

                    if (Number(value)) {
                        setRuns(Number(value));
                    } else {
                        setRuns(0);
                    }
                }} />
        </label>

        <button onClick={() => runBenchmark(runs)}>Run Benchmark</button>
    </form>
};

export const BenchmarkSuite = () => {
    const [results, setResults] = useState<number>(0);

    const updateRuns = (runs: number) => {
        setResults(bench(runs));
    };

    return <section>
        <BenchmarkConfig runBenchmark={updateRuns} />

        <BenchmarkDisplay results={results} />
    </section>;
}