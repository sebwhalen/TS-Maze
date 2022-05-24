import { BenchmarkResult } from "benchmarking/bench";
import { benchRaycaster } from "benchmarking/raycastingBenchmarks";
import { useState } from "react";

const bench = (runs: number) =>
    benchRaycaster({
        numberOfRuns: runs,
        mapSize: 100
    });

interface BenchmarkDisplayProps {
    results?: BenchmarkResult
};

const BenchmarkDisplay = ({ results }: BenchmarkDisplayProps) => {
    if (!results) {
        return <p>No benchmarks have been run.</p>
    }

    const { numberOfRuns, total, average } = results;

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
                <tr>
                    <td className="text-right">{numberOfRuns}</td>
                    <td className="text-right">{total.toFixed(2)}</td>
                    <td className="text-right">{average.toFixed(2)}</td>
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
    const [results, setResults] = useState<BenchmarkResult | undefined>();

    const updateRuns = (runs: number) => {
        setResults(bench(runs));
    };

    return <section>
        <BenchmarkConfig runBenchmark={updateRuns} />

        <BenchmarkDisplay results={results} />
    </section>;
}