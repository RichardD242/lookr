import { useRef, useEffect, useState } from 'react';
import { createNoise2D } from 'simplex-noise';

interface TopoMapProps {
    width?: number;
    height?: number;
}

export function TopographicMap({ width = 600, height = 400 }: TopoMapProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [seed, setSeed] = useState(Math.random());
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f4ecd8';
        ctx.fillRect(0, 0, width, height);

        const noise2D = createNoise2D();

        const scale = 0.005;
        const steps = 15;
        const lineWeight = 1;
        const lineColor = 'rgba(70, 40, 20, 0.4)';

        const stepSize = 2;
        const grid: number[][] = [];

        for (let x=0; x < width; x += stepSize) {
            grid[x] = [];
            for (let y=0; y < height; y += stepSize) {
                const value = noise2D(x * scale + seed, y * scale + seed);
                grid[x][y] = (value + 1) / 2;
            }
        }

        ctx.lineWidth = lineWeight;
        ctx.strokeStyle = lineColor;

        for (let i=0; i < steps; i++) {
            const targetLevel = i / steps;

            ctx.beginPath();
            for (let x=0; x < width - stepSize; x += stepSize) {
                for (let y=0; y < height - stepSize; y += stepSize) {
                    const val = grid[x][y];

                    if (Math.abs(val - targetLevel) < 0.015) {
                        ctx.rect(x, y, 1.5, 1.5);

                    }
                }         
            }
            ctx.stroke();
        }
    }, [width, height, seed]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{ border: '2px solid #222', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)' }}
            />

            <button
                onClick={() => setSeed(Math.random())}
                style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', border: 'none', backgroundColor: '#4a69bd', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
            >
                new map
            </button>
        </div>
    );
}

