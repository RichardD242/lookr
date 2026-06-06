import { useEffect, useState, useRef } from 'react';
import { TopographicMap } from '../pages/topograpficstest';

type PageShellProps = {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
    withTopo?: boolean;
};

const navigation = [
    { label: 'home', href: '/home' },
    { label: 'features', href: '/features' },
    { label: 'api', href: '/api' },
    { label: 'about', href: '/about' },
] as const;

function PageShell({ title, subtitle, children, withTopo = true }: PageShellProps) {
    const [winW, setWinW] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const headerRef = useRef<HTMLElement | null>(null);
    const footerRef = useRef<HTMLElement | null>(null);
    const [headerSize, setHeaderSize] = useState({ w: winW, h: 120 });
    const [footerSize, setFooterSize] = useState({ w: winW, h: 120 });
    const activeNav = title;

    useEffect(() => {
        const updateSizes = () => {
            setWinW(window.innerWidth);

            if (headerRef.current) {
                const r = headerRef.current.getBoundingClientRect();
                setHeaderSize({ w: Math.round(r.width), h: Math.round(r.height) });
            }
            if (footerRef.current) {
                const r = footerRef.current.getBoundingClientRect();
                setFooterSize({ w: Math.round(r.width), h: Math.round(r.height) });
            }
        };

        updateSizes();
        window.addEventListener('resize', updateSizes);
        return () => window.removeEventListener('resize', updateSizes);
    }, []);

    return (
        <div className="min-h-screen bg-[#050607] text-[#f4f1de] antialiased flex flex-col">
            
            <header 
                ref={headerRef} 
                style={{ position: 'relative', overflow: 'hidden' }} 
                className="w-full border-b border-white/15"
            >
                {withTopo ? (
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden>
                        <TopographicMap width={headerSize.w || winW} height={Math.max(80, headerSize.h)} controls={false} lines={20} />
                    </div>
                ) : null}
                
                <div style={{ position: 'relative', zIndex: 1 }} className="mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-8 flex items-center justify-between py-5 sm:py-6">
                    <a href="/" className="shell-brand text-sm font-semibold text-white/90 transition-opacity duration-200 hover:opacity-100">
                        lookr
                    </a>
                    <nav aria-label="primary" className="w-full max-w-4xl">
                        <ul className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-end sm:gap-0">
                            {navigation.map((item) => (
                                <li key={item.href} className="sm:flex sm:items-center">
                                    <a
                                        href={item.href}
                                        className={`shell-nav-link ${activeNav === item.label ? 'shell-nav-link-active' : ''}`}
                                        aria-current={activeNav === item.label ? 'page' : undefined}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            <main style={{ position: 'relative', zIndex: 1 }} className="mx-auto flex flex-1 w-full max-w-[88rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 items-start justify-start">
                <div className="relative flex w-full flex-col items-start gap-8 text-left">
                    <section className="flex w-full flex-col items-start justify-center gap-6 text-left">
                        <div className="space-y-4">
                            <h1 className="shell-hero-title text-5xl font-black uppercase leading-[0.9] text-[#f4f1de] sm:text-6xl lg:text-7xl xl:text-8xl">
                                {title}
                            </h1>
                            <p className="shell-hero-label text-[0.72rem] text-white/48 sm:text-xs">
                                {subtitle}
                            </p>
                        </div>
                        {children ? <div className="w-full pt-2">{children}</div> : null}
                    </section>
                </div>
            </main>

            <footer 
                ref={footerRef} 
                style={{ position: 'relative', overflow: 'hidden' }} 
                className="w-full border-t border-white/15 text-xs text-white/50 mt-auto"
            >
                {withTopo ? (
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden>
                        <TopographicMap width={footerSize.w || winW} height={Math.max(80, footerSize.h)} controls={false} lines={16} />
                    </div>
                ) : null}
                
                <div style={{ position: 'relative', zIndex: 1 }} className="mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-8 flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
                    <p className="shell-footer-copy">lookr</p>
                    <p className="shell-footer-copy">all rights reserved</p>
                </div>
            </footer>
        </div>
    );
}

export default PageShell;