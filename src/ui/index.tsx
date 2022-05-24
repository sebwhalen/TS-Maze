import { ReactElement, useState } from "react";
import { BenchmarkSuite } from "./benchmarks/benchmarks";

const sections: { [name: string]: ReactElement } = {
    'Benchmarks': <BenchmarkSuite />
};

interface SectionSelectorProps {
    setSection(section: ReactElement): void
}

const SectionSelector = ({ setSection }: SectionSelectorProps) =>
    <section>
        <p>Choose a section:</p>

        <ul>
            {Object.entries(sections).map(([key, value]) =>
                <li key={key}>
                    <button onClick={() => setSection(value)}>{key}</button>
                </li>
            )}
        </ul>
    </section>


export const MainApp = () => {
    const [section, setSection] = useState<ReactElement | undefined>();

    return (section)
        ? <section>
            <button onClick={() => setSection(undefined)}>Go back</button>
            {section}
        </section>
        : <SectionSelector setSection={setSection} />;
}
