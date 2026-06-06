import { useEffect, useRef, useState } from 'react';
import PageShell from '../components/PageShell';

const holdDuration = 4000;

function HomePage() {
    const [progress, setProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const frameRef = useRef<number | null>(null);
    const startedAtRef = useRef(0);

    const stopHolding = () => {
        setIsHolding(false);
        setProgress(0);

        if (frameRef.current !== null) {
            window.cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
        }
    };

    const startHolding = () => {
        if (isHolding) {
            return;
        }

        setIsHolding(true);
        startedAtRef.current = window.performance.now();

        const tick = (now: number) => {
            const nextProgress = Math.min(((now - startedAtRef.current) / holdDuration) * 100, 100);

            setProgress(nextProgress);

            if (nextProgress >= 100) {
                window.location.href = '/lookr';
                return;
            }

            frameRef.current = window.requestAnimationFrame(tick);
        };

        frameRef.current = window.requestAnimationFrame(tick);
    };

    useEffect(() => stopHolding, []);

    return (
        <PageShell
            title="home"
            subtitle="start"
        >
            <div className="shell-home-grid">
                <div className="max-w-l text-left">
                    <p className="text-gray-400 text-sm leading-relaxed tracking-wide font-sans">
                        to use lookr, enter your username and run the analysis
                    </p>
                </div>
                <button
                    type="button"
                    onPointerDown={startHolding}
                    onPointerUp={stopHolding}
                    onPointerCancel={stopHolding}
                    onPointerLeave={stopHolding}
                    className="shell-button group"
                >
                    <span className="shell-button-fill" style={{ transform: `scaleX(${progress / 100})`, transformOrigin: 'left' }} />
                    <span className="relative z-10">use lookr</span>
                </button>
            </div>
        </PageShell>
    );
}

export default HomePage;