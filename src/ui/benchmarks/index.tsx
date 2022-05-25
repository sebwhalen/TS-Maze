import { BenchmarkResult } from "benchmarking/bench";
import { benchRaycaster } from "benchmarking/raycastingBenchmarks";
import { useState } from "react";

const bench = (runs: number) =>
    benchRaycaster({
        numberOfRuns: runs,
        mapSize: 100
    });

interface BenchmarkDisplayProps {
    results: BenchmarkResult[]
};

const BenchmarkDisplayRow = ({ numberOfRuns, total, average }: BenchmarkResult) =>
    <tr>
        <td className="text-right">{numberOfRuns}</td>
        <td className="text-right">{total.toFixed(2)}</td>
        <td className="text-right">{average.toFixed(2)}</td>
    </tr>;

const BenchmarkDisplay = ({ results }: BenchmarkDisplayProps) => {
    if (results.length === 0) {
        return <p>No benchmarks have been run.</p>
    }

    return <section>
        <table>
            <thead>
                <tr>
                    <th>Runs</th>
                    <th>Total (ms)</th>
                    <th>Average (ms)</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, i) => <BenchmarkDisplayRow key={i}{...result} />)}
            </tbody>
        </table>
    </section>
};

//TODO trigger on button press.
const BenchmarkConfig = ({ runBenchmark }: {
    runBenchmark(runs: number): void
}) => {
    const [runs, setRuns] = useState(0);

    return <form className="mb-10"
        onSubmit={(e) => e.preventDefault()}>
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
    const [results, setResults] = useState<BenchmarkResult[]>([]);

    const updateRuns = (runs: number) => {
        setResults([...results, bench(runs)]);
    };

    return <section>
        <BenchmarkConfig runBenchmark={updateRuns} />

        <BenchmarkDisplay results={results} />
    </section>;
}