import PageShell from '../components/PageShell';
import { useState } from 'react';

interface GithubUser{
    login:string;
    avatar_url:string;
    name: string | null;
    bio: string | null;
    followers: number;
    following: number;
    public_repos: number;
}

interface GithubRepo {
    id: number;
    name: string;
    html_url:string;
    stargazers_count:number;
}



function LookrPage() {

    const [favorites, setFavorites] = useState<string[]>(() => {
        const saved = localStorage.getItem('lookr_favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState<GithubUser | null>(null);
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;

        setLoading(true);
        setRepos([]);
        setUserData(null);

        try {
            const profileResponse = await fetch(`https://api.github.com/users/${username.trim()}`);
            if (!profileResponse.ok) throw new Error('User not found.');
            const data = (await profileResponse.json()) as GithubUser;
            setUserData(data);

            const reposResponse = await fetch(`https://api.github.com/users/${username.trim()}/repos?per_page=100`);
            if (reposResponse.ok) {
                const reposData = (await reposResponse.json()) as GithubRepo[];
                reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);
                setRepos(reposData);
            }
        } catch (err) {
            const errorObject = err as Record<string, unknown> | null | undefined;
            const message = err instanceof Error
                ? err.message
                : (errorObject && typeof errorObject === 'object' && 'message' in errorObject && typeof errorObject.message === 'string')
                    ? errorObject.message
                    : String(err);

            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = (nameToToggle: string) => {
        let updated: string[];
        if (favorites.includes(nameToToggle)) {
            updated = favorites.filter(fav => fav !== nameToToggle);
        } else {
            updated = [...favorites, nameToToggle];
        }
        setFavorites(updated);
        localStorage.setItem('lookr_favorites', JSON.stringify(updated));
    };

    const handleFavoriteClick = (favUsername: string) => {
        setUsername(favUsername);
        setTimeout(() => {
            const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
            handleSearch(fakeEvent);
        }, 50);
    };

    return (
        <>
            <PageShell title="lookr" subtitle="github user search">
            <div style={styles.titleRow}>
                <div style={styles.titleText}>lookr</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ marginTop: '0.8rem', marginLeft: '0.4rem' }} aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.656 1.653.244 2.873.12 3.176.77.84 1.234 1.911 1.234 3.221 0 4.61-2.807 5.628-5.479 5.921.43.372.814 1.102.814 2.222 0 1.606-.014 2.902-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.593 24 12.297 24 5.67 18.627.297 12 .297z"/>
                </svg>
            </div>
            <div style={styles.container}>

                {favorites.length > 0 && (
                    <div style={styles.favoritesRow}>
                        <span style={{ color: 'rgba(244, 241, 222, 0.4)', fontSize: '0.85rem' }}>favorites:</span>
                        {favorites.map((fav) => (
                            <button key={fav} onClick={() => handleFavoriteClick(fav)} style={styles.favChip}>
                                @{fav}
                            </button>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSearch} style = {styles.searchForm}>
                    <div style={styles.searchBarWrapper}>
                        <input
                        type="text"
                        placeholder="search github username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.searchInput}
                    />
                        <button type="submit" style={styles.searchButton} disabled={loading}>
                            {loading ? 'searching...' : 'Search'}
                        </button>
                    </div>
                </form>

                {userData && (
                    <div style={styles.profileCard}>
                        <div style={styles.leftCol}>
                            <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} style={styles.avatar} />
                            <h1 style={styles.giantName}>{userData.name || userData.login}</h1>
                            <button onClick={() => toggleFavorite(userData.login)} style={styles.favActionButton}>
                                {favorites.includes(userData.login) ? '★ unfavorite' : '☆ favorite'}
                            </button>
                            <div style={styles.usernameRow}>
                                <p style={styles.username}>@{userData.login}</p>
                                <span style={styles.pronouns}>he/him</span>
                            </div>
                            {userData.bio && <p style={styles.bio}>{userData.bio}</p>}

                            <div style={styles.statsContainer}>
                                <div style={styles.statBox}>
                                    <strong>{userData.followers}</strong><span>followers</span>
                                </div>
                                <div style={styles.statBox}>
                                    <strong>{userData.following}</strong><span>following</span>
                                </div>
                                <div style={styles.statBox}>
                                    <strong>{userData.public_repos}</strong><span>public repos</span>
                                </div>
                            </div>
                        </div>

                        <div style={styles.rightCol}>
                            <h2 style={styles.reposHeader}>Top Repositories</h2>
                            <div style={styles.repoList}>
                                {repos.slice(0, 4).map((repo) => (
                                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" style={styles.repoLinkCard}>
                                        <span style = {{ color: '#ffffff' }}>{repo.name}</span>
                                        <span style={styles.repoStars}>★ {repo.stargazers_count}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PageShell>
        </>
    );
}

const styles = {


    favoritesRow: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.75rem',
        width: '100%',
        marginBottom: '1rem',
        flexWrap: 'wrap' as const,
    },
    favChip: {
        backgroundColor: 'rgba(244, 241, 222, 0.05)',
        border: '1px solid rgba(244, 241, 222, 0.22)',
        color: '#f4f1de',
        padding: '4px 12px',
        fontSize: '0.85rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },

    favActionButton: {
        backgroundColor: 'transparent',
        border: '1px solid rgba(244, 241, 222, 0.2)',
        borderRadius: '6px',
        color: '#f4f1de',
        padding: '6px 14px',
        fontSize: '0.85rem',
        cursor: 'pointer',
        marginTop: '0.5rem',
        marginBottom: '1rem',
        transition: 'all 0.2s ease',
    },

    container: {
        maxWidth: '1100px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    titleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        width: '100%',
        justifyContent: 'flex-start',
        marginBottom: '0.5rem',
    },
    titleText: {
        fontSize: '2.25rem',
        fontWeight: 700,
        color: '#f4f1de',
        lineHeight: 1,
    },
    searchForm: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: '3rem',
    },
    searchBarWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '550px',
        borderRadius: '24px',
        border: '1px solid #30363d',
        backgroundColor: '#1f1f1f',
        overflow: 'hidden',
        paddingRight: '6px',
    },
    searchInput: {
        flex: 1,
        padding: '14px 20px',
        fontSize: '16px',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        color: '#fff',
    },
    searchButton: {
        padding: '8px 20px',
        backgroundColor: '#30363d',
        color: '#fff',
        border: 'none',
        borderRadius: '18px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s',
    },
    profileCard: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '4rem',
        backgroundColor: '#000000',
        padding: '3rem',
        borderRadius: '16px',
        color: '#fff',
        width: '100%',
        boxSizing: 'border-box' as const,
    },
    leftCol: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start',
    },
    avatar: {
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        objectFit: 'cover' as const,
        border: '3px solid #30363d',
        marginBottom: '1.5rem',
    },
    giantName: {
        fontSize: '4.5rem',
        margin: '0 0 0.1rem 0',
        fontWeight: '700',
        letterSpacing: '-2px',
        lineHeight: '1.1',
    },
    usernameRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem',
    },
    username: {
        fontSize: '1.5rem',
        color: '#8b949e',
        margin: 0,
    },
    pronouns: {
        fontSize: '1rem',
        color: '#57606a',
        backgroundColor: '#21262d',
        padding: '2px 8px',
        borderRadius: '6px',
    },
    bio: {
        fontSize: '1.1rem',
        color: '#c9d1d9',
        lineHeight: '1.5',
        margin: '0 0 1.5rem 0',
        maxWidth: '400px',
    },
    statsContainer: {
        display: 'flex',
        gap: '1.5rem',
    },
    statBox: {
        display: 'flex',
        gap: '0.3rem',
        fontSize: '1rem',
        color: '#8b949e',
    },
    rightCol: { 
        flex: '1',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column' as const,
        backgroundColor: '#1f1f1f',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #30363d',
        width: '100%',
    },
    reposHeader: {
        fontSize: '1.5rem',
        margin: '0 0 1.5rem 0',
        color: '#fff',
        borderBottom: '1px solid #21262d',
        paddingBottom: '0.5rem',
    },
    repoList: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem',
    },
    repoLinkCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000000',
        padding: '1rem 1.25rem',
        borderRadius: '8px',
        textDecoration: 'none',
        color: '#ffffff',
        fontWeight: '600',
        border: '1px solid #30363d',
        transition: 'background-color 0.2s',
    },
    repoStars: {
        fontSize: '0.95rem',
        color: '#e3b341',
        backgroundColor: '#21262d',
        padding: '4px 8px',
        borderRadius: '12px',
    },
};


export default LookrPage;