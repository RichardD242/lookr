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
            <button
                type="button"
                onPointerDown={startHolding}
                onPointerUp={stopHolding}
                onPointerCancel={stopHolding}
                onPointerLeave={stopHolding}
                className="group relative mx-auto flex h-14 w-64 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-[#0d1712] px-6 text-xs font-medium tracking-[0.3em] text-white transition hover:border-white/60 md:w-80"
            >
                <span className="absolute inset-y-0 left-1/2 w-1/2 origin-left bg-white/12 transition-transform duration-100" style={{ transform: `scaleX(${progress / 100})` }} />
                <span className="absolute inset-y-0 right-1/2 w-1/2 origin-right bg-white/12 transition-transform duration-100" style={{ transform: `scaleX(${progress / 100})` }} />
                <span className="relative z-10">use lookr</span>
            </button>
        </PageShell>
    );
}

export default HomePage;
