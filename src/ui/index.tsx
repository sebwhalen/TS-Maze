import { ReactElement, useState } from "react";
import { BenchmarkSuite } from "./benchmarks";
import { MapEditor } from "./mapEditor";

const sections: { [name: string]: ReactElement } = {
    'Benchmarks': <BenchmarkSuite />,
    'Map Editor': <MapEditor />
};

interface SectionSelectorProps {
    setSection(section: ReactElement): void
}

const SectionSelector = ({ setSection }: SectionSelectorProps) =>
    <section>
        <ul>
            {Object.entries(sections).map(([key, value]) =>
                <li key={key}>
                    <button onClick={() => setSection(value)}>{key}</button>
                </li>
            )}
        </ul>
    </section>;


export const MainApp = () => {
    const [section, setSection] = useState<ReactElement | undefined>(sections['Benchmarks']);

    return (section)
        ? <section>
            <button onClick={() => setSection(undefined)}>Go back</button>
            {section}
        </section>
        : <SectionSelector setSection={setSection} />;
}
