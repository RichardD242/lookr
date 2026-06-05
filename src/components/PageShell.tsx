type PageShellProps = {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
};

const navigation = [
    { label: 'home', href: '/home' },
    { label: 'features', href: '/features' },
    { label: 'api', href: '/api' },
    { label: 'about', href: '/about' },
] as const;

function PageShell({ title, subtitle, children }: PageShellProps) {
    return (
        <div className="min-h-screen bg-[#07110d] text-[#f4f1de] antialiased">
            <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6">
                <header className="flex items-center justify-between border-b border-white/30 py-6">
                    <a href="/" className="text-sm font-semibold tracking-[0.4em] text-white/80">
                        lookr
                    </a>
                    <nav aria-label="primary">
                        <ul className="flex flex-wrap justify-end gap-x-6 gap-y-2 text-xs tracking-[0.35em] text-white/70">
                            {navigation.map((item) => (
                                <li key={item.href}>
                                    <a href={item.href} className="transition hover:text-[#f4f1de]">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </header>

                <main className="flex flex-1 items-center justify-center px-6 text-center">
                    <div>
                        <h1 className="text-6xl font-semibold leading-none tracking-[0.2em] md:text-8xl">
                            {title}
                        </h1>
                        <p className="mt-4 text-xs tracking-[0.4em] text-white/50">
                            {subtitle}
                        </p>
                        {children ? <div className="mt-10">{children}</div> : null}
                    </div>
                </main>

                <footer className="flex flex-col gap-4 border-t border-white/30 py-6 text-xs tracking-[0.3em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
                    <p>lookr</p>
                    <p>all rights reserved</p>
                </footer>
            </div>
        </div>
    );
}

export default PageShell;
