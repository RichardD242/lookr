import PageShell from '../components/PageShell';
import { useState } from 'react';

interface GithubUser{
    login:string;
    avatar_url:string;
    name: string | null;
    followers: number;
    public_repos: number;
}



function LookrPage() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState<GithubUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;

        setLoading(true);
        setError(null);
        setUserData(null);

        try {
            const response = await fetch(`https://api.github.com/users/${username.trim()}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('user not found');
                } else {
                    throw new Error('try again later');
            }
            }
            const data: GithubUser = await response.json();
            setUserData(data);
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
                    <div style={styles.searchWrapper}>
                        <input
                        type="text"
                        placeholder="search github username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.searchInput}
                    />
                        <button type="submit" style={styles.searchButton} disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </form>

                {userData && (
                    <div style={styles.profileCard}>
                        <div style={styles.leftCol}>
                            <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} style={styles.avatar} />
                        </div>

                        <div style={styles.rightCol}>
                            <h1 style={styles.giantName}>{userData.name || userData.login}</h1>
                            <p style={styles.username}>@{userData.login}</p>

                            <div style={styles.statsContainer}>
                                <div style={styles.statBox}>
                                    <strong>{userData.followers}</strong><span>followers</span>
                                </div>
                                <div style={styles.statBox}>
                                    <strong>{userData.public_repos}</strong><span>public repos</span>
                                </div>
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
        maxWidth: '850px',
        margin: '0 auto',
        padding: '2rem 1rem',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchForm: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3rem',
    },

    searchWrapper: {
        display: 'flex',
        width: '100%',
        maxWidth: '600px',
        borderRadius: '24px',
        border: '1px solid #dfe1e5',
        boxShadow: '0 1px 6px rgba(32,33,36,0.28)',
        overflow: 'hidden',
        backgroundColor: '#1f1f1f',
    },

    searchInput: {
        flex: 1,
        padding: '12px 20px',
        fontSize: '16px',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        color: '#fff',
    },

    searchButton: {
        padding: '0 24px',
        backgroundColor: '#303134',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.2s',
    },

    profileCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4rem',
        backgroundColor: '#000000',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(255,255,255,0.05)',
        color: '#fff',
        width: '100%',
        boxSizing: 'border-box' as const,
    },  

    leftCol: {
        flexShrink: 0,
    },

    avatar: {
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        objectFit: 'cover' as const,
        border: '4px solid #30363d',
    },

    rightCol: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
    },

    giantName: {
        fontSize: '4.5rem',
        margin: '0 0 0.2rem 0',
        fontWeight: '700',
        letterSpacing: '-2px',
        lineHeight: '1.1',
    },

    username: {
        fontSize: '1.5rem',
        color: '#8b949e',
        margin: '0 0 2rem 0',
    },

    statsContainer: {
        display: 'flex',
        gap: '2rem',
    },

    statBox: {
        display: 'flex',
        flexDirection: 'column' as const,
        fontSize: '1rem',
        color: '#c9d1d9',
    },
};


export default LookrPage;
