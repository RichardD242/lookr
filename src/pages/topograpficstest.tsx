import React, { useRef, useEffect, useState } from 'react';
import { createNoise2D } from 'simplex-noise';

interface TopoMapProps {
    width?: number;
    height?: number;
    lines?: number;
    controls?: boolean;
}

export const TopographicMap: React.FC<TopoMapProps> = ({ width = 800, height = 600, lines = 24, controls = true }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [seed, setSeed] = useState<number>(Math.random());

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const drawSmoothLine = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
            ctx.moveTo(p1.x, p1.y);

            const cpX1 = p1.x + (p2.x - p1.x) * 0.25;
            const cpY1 = p1.y + (p2.y - p1.y) * 0.25;
            const cpX2 = p1.x + (p2.x - p1.x) * 0.75;
            const cpY2 = p1.y + (p2.y - p1.y) * 0.75;
            ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p2.x, p2.y);
        };

        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        ctx.fillStyle = '#101113';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 0.75;

        const noise2D = createNoise2D();
        const resolution = 5;
        const scale = 0.003;
        const columns = Math.ceil(width / resolution) + 1;
        const rows = Math.ceil(height / resolution) + 1;

        const grid: number[][] = [];
        for (let i = 0; i < columns; i++) {
            grid[i] = [];
            for (let j = 0; j < rows; j++) {
                const x = i * resolution;
                const y = j * resolution;
                const n = noise2D(x * scale + seed * 100, y * scale + seed * 100);
                grid[i][j] = (n + 1) / 2;
            }
        }

        const numLevels = lines;
        const levels: number[] = [];
        for (let l = 1; l < numLevels; l++) {
            levels.push(l / numLevels);
        }

        const lerp = (x0: number, x1: number, y0: number, y1: number, target: number) => {
            if (Math.abs(y1 - y0) < 0.00001) return x0;
            return x0 + ((target - y0) / (y1 - y0)) * (x1 - x0);
        };

        levels.forEach((level) => {
            ctx.beginPath();

            for (let i = 0; i < columns - 1; i++) {
                for (let j = 0; j < rows - 1; j++) {
                    const x = i * resolution;
                    const y = j * resolution;

                    const v0 = grid[i][j];
                    const v1 = grid[i + 1][j];
                    const v2 = grid[i + 1][j + 1];
                    const v3 = grid[i][j + 1];

                    let cellState = 0;
                    if (v0 >= level) cellState += 8;
                    if (v1 >= level) cellState += 4;
                    if (v2 >= level) cellState += 2;
                    if (v3 >= level) cellState += 1;

                    const top = { x: lerp(x, x + resolution, v0, v1, level), y: y };
                    const right = { x: x + resolution, y: lerp(y, y + resolution, v1, v2, level) };
                    const bottom = { x: lerp(x, x + resolution, v3, v2, level), y: y + resolution };
                    const left = { x: x, y: lerp(y, y + resolution, v0, v3, level) };

                    switch (cellState) {
                        case 1: case 14: drawSmoothLine(left, bottom); break;
                        case 2: case 13: drawSmoothLine(bottom, right); break;
                        case 3: case 12: drawSmoothLine(left, right); break;
                        case 4: case 11: drawSmoothLine(top, right); break;
                        case 5:
                            drawSmoothLine(top, left);
                            drawSmoothLine(bottom, right);
                            break;
                        case 6: case 9:  drawSmoothLine(top, bottom); break;
                        case 7: case 8:  drawSmoothLine(top, left); break;
                        case 10:
                            drawSmoothLine(top, right);
                            drawSmoothLine(left, bottom);
                            break;
                    }
                }
            }
            ctx.stroke();
        });
    }, [width, height, seed]);

    if (!controls) {
        return (
            <canvas
                ref={canvasRef}
                style={{ display: 'block', width: '100%', height: '100%' }}
            />
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', backgroundColor: '#0f111a', padding: '30px', borderRadius: '12px' }}>
            <canvas
                ref={canvasRef}
                style={{
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    borderRadius: '4px',
                    width: width,
                    height: height
                }}
            />
            <button
                onClick={() => setSeed(Math.random())}
                style={{
                    padding: '8px 18px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                    e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
            >
                make map
            </button>
        </div>
    );
};

