import { moveInDirection, position } from "geometry/positions";
import { memo, useEffect, useRef } from "react";

type GridClickHandler = (x: number, y: number, leftClicked: boolean) => void;

interface BaseDrawingInstructions {
    x: number,
    y: number,
    color: string
}

interface SquareDrawingInstructions extends BaseDrawingInstructions {
    type: 'square',
    centered?: boolean
}

interface LineDrawingInstructions extends BaseDrawingInstructions {
    type: 'line',
    direction: number,
    length?: number
}

export type GridRenderInstructionsLoader = () => Generator<LineDrawingInstructions | SquareDrawingInstructions>;

interface InteractiveGridProps {
    scale: number,
    width: number,
    height: number,
    backgroundColor?: string,
    onGridClick: GridClickHandler,
    renderInstructions: GridRenderInstructionsLoader
}

const handleMouse = (
    width: number,
    height: number,
    backgroundColor: string,
    onGridClick: GridClickHandler,
    renderInstructions: GridRenderInstructionsLoader,
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
) => {
    const buttons = e.buttons;

    if (buttons !== 1 && buttons !== 2) {
        return;
    }

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX - rect.left) * (width / canvas.width);
    const y = (e.clientY - rect.top) * (height / canvas.height)

    onGridClick(x, y, buttons === 1);
    render(e.currentTarget, backgroundColor, renderInstructions, width, height);
};

const render = (
    canvas: HTMLCanvasElement,
    backgroundColor: string,
    instructions: GridRenderInstructionsLoader,
    width: number,
    height: number
) => {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Interactive grid could not get rendering context.');
    }

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    const tileWidth = Math.trunc(canvas.width / width);
    const tileHeight = Math.trunc(canvas.height / height);

    for (const instruction of instructions()) {
        if (instruction.type === 'square') {
            const { x, y, color, centered } = instruction;

            const drawX = (centered)
                ? x * tileWidth - tileWidth / 2
                : x * tileWidth;

            const drawY = (centered)
                ? y * tileHeight - tileHeight / 2
                : y * tileHeight;

            ctx.fillStyle = color;
            ctx.fillRect(drawX, drawY, tileWidth, tileHeight);
        } else {
            const { x, y, direction, color } = instruction;

            const length = instruction.length ?? 1;

            const startX = x * tileWidth;
            const startY = y * tileWidth;

            const end = moveInDirection(position(startX, startY), direction, tileWidth * length);;

            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
};

export const InteractiveGrid = memo(({
    scale,
    width,
    height,
    onGridClick,
    renderInstructions,
    backgroundColor = '#000'
}: InteractiveGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        render(canvasRef.current, backgroundColor, renderInstructions, width, height);
    }, []);

    const handler = (e: React.MouseEvent<HTMLCanvasElement>) => {
        handleMouse(width, height, backgroundColor, onGridClick, renderInstructions, e);
    };

    return <canvas
        ref={canvasRef}
        width={scale * width}
        height={scale * height}
        onContextMenu={(e) => e.preventDefault()}
        onMouseMove={handler}
        onMouseDown={handler}
    />;
});