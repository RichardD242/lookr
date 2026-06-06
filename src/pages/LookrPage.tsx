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
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState<GithubUser | null>(null);
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;

        setLoading(true);
        setError(null);
        setRepos([]);
        setUserData(null);

        try {
            const profileResponse = await fetch(`https://api.github.com/users/${username.trim()}`);
            if (!profileResponse.ok) throw new Error('User not found.');
            const data: GithubUser = await profileResponse.json();
            setUserData(data);

            const reposResponse = await fetch(`https://api.github.com/users/${username.trim()}/repos?per_page=100`);
            if (reposResponse.ok) {
                const reposData: GithubRepo[] = await reposResponse.json();
                reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);
                setRepos(reposData);
            }
        } catch (err: any) {
            setError(err.message);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <PageShell title="lookr" subtitle="github user search">
            <div style={styles.container}>
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
    );
}

const styles = {

    container: {
        maxWidth: '1100px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'flex-start',
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