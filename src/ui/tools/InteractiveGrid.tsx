import { memo, useEffect, useRef } from "react";

type GridClickHandler = (x: number, y: number, leftClicked: boolean) => void;

type GridRenderer = (canvas: HTMLCanvasElement) => void;

interface InteractiveGridProps {
    scale: number,
    width: number,
    height: number,
    onGridClick: GridClickHandler,
    render: GridRenderer
}

const handleMouse = (width: number, height: number, onGridClick: GridClickHandler, render: GridRenderer, e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const buttons = e.buttons;

    if (buttons !== 1 && buttons !== 2) {
        return;
    }

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX - rect.left) * (width / canvas.width);
    const y = (e.clientY - rect.top) * (height / canvas.height)

    onGridClick(x, y, buttons === 1);
    render(e.currentTarget);
};

export const InteractiveGrid = memo(({
    scale,
    width,
    height,
    onGridClick,
    render
}: InteractiveGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        render(canvasRef.current);
    }, []);

    const handler = handleMouse.bind(null, width, height, onGridClick, render);

    return <canvas
        ref={canvasRef}
        width={scale * width}
        height={scale * height}
        onContextMenu={(e) => e.preventDefault()}
        onMouseMove={handler}
        onMouseDown={handler}
    />;
});