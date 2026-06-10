import PageShell from '../components/PageShell';
import { useState, useEffect } from 'react';

interface GithubUser {
    login: string;
    avatar_url: string;
    name: string | null;
    bio : string | null;
    followers: number;
    following: number;
    public_repos: number;
}

function ApiPage() {
    const [userData, setUserData] = useState<GithubUser | null>(null);
    const [totalStars, setTotalStars] = useState(0);
    const [loading, setLoading] = useState(true);
    const username = 'zachlatta';

    useEffect(() => {
        async function fetchCardData() {
            try {
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                if (!userRes.ok) return;
                const userData = await userRes.json() as GithubUser;
                setUserData(userData);

                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                if (reposRes.ok) {
                    const reposData = await reposRes.json() as Array<{ stargazers_count: number }>;
                    const starsSum = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

                    setTotalStars(starsSum);

                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCardData();
    }, [username]);


    const handleCopyCode = () => {
        if (!userData) return;
        const displayName = userData.name || userData.login;
        const markdownCode = `
    <div align="center">
        <img src="${userData.avatar_url}" width="122" style="border-radius: 50%; border: 3px solid #e3b341;" alt="${displayName}" />
        <p>@${userData.login}</p>
        <p style="color: #8b949e; max-width: 300px;">${userData.bio || 'no bio available'}</p>
        <p>
            <b>followers:</b> ${userData.followers} &nbsp; | &nbsp;
            <b>following:</b> ${userData.following} &nbsp; | &nbsp;
            <b>repos:</b> ${userData.public_repos} &nbsp; | &nbsp;
            <b>total stars:</b> ${totalStars}
        </p>
    </div>
        `.trim();
        navigator.clipboard.writeText(markdownCode)
            .then(() => alert('markdown copied to clipboard'))
            .catch(err => console.error('failed to copy markdown', err));

    };

    const handleCopyMini = () => {
        if(!userData) return;

        const miniMarkdown = `[![LookrCard](https://lookr-zeta.vercel.app/api/card?user=${userData.login})](https://lookr-zeta.vercel.app/)`;

        navigator.clipboard.writeText(miniMarkdown)
            .then(() => alert('mini markdown copied comming soon because nest server doesnt work properly'))
            .catch(err => console.error('failed to copy mini markdown', err));
    };

    return (
        <PageShell 
            title="api" 
            subtitle= "copy markdon = full md code | copy mini markdown = lookr card markdown (comming soon)"
            >

            <div style={styles.container}>
                {loading && <p style={{ color: '#fff' }}>loading card...</p>}
                {!loading && userData && (
                    <div style={styles.cardWrapper}>
                        <img
                            src={userData.avatar_url}
                            alt="avatar"
                            style = {styles.avatar}    
                        />
                        <h3 style={styles.name}>{userData.name || userData.login}</h3>
                        <p style={styles.username}>@{userData.login}</p>
                        {userData.bio && <p style={styles.bio}>{userData.bio}</p>}

                        <div style={styles.statsGrid}>
                            <div style={styles.statItem}>
                                <b>followers</b>
                                <span>{userData.followers}</span>
                            </div>
                            <div style={styles.statItem}>
                                <b>following</b>
                                <span>{userData.following}</span>
                            </div>
                            <div style={styles.statItem}>
                                <b>repos</b>
                                <span>{userData.public_repos}</span>
                            </div>
                            <div style={styles.statItem}>

                                <b>total stars</b>
                                <span>{totalStars}</span>
                            </div>
                        </div>

                        <div style= {{ display: 'flex', gap: '10px', marginTop: '1rem', width: '100%' }}>
                            <button style={{ ...styles.copyBtn, flex: 1 }} onClick={handleCopyCode}>
                                copy code
                            </button>
                            <button style={{ ...styles.copyBtn, flex: 1, borderColor: '#e3b341' }} onClick={handleCopyMini}>
                                copy mini markdown
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PageShell>
    );
}
    
export default ApiPage;


const styles = {

    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 0',
        fontFamily: 'sans-serif',
    },

    cardWrapper: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        backgroundColor: '#1f1f1f',
        border: '2px solid #e3b341',
        borderRadius: '16px',
        padding: '2rem',
        width: '300px',
        textAlign: 'center' as const,
        color: '#ffffff',
    },

    avatar: {
        width: '122px',
        height: '122px',
        borderRadius: '50%',
        border: '3px solid #30363d',
        marginBottom: '1rem',
    },

    name: {
        fontSize: '1.5rem',
        margin: '0 0 0.5rem 0',
        fontWeight: '700',

    },

    username: {
        fontSize: '1rem',
        color: '#8b949e',
        margin: '0 0 1rem 0',
    },

    bio: {
        fontSize: '0.9rem',
        color: '#c9d1d9',
        lineHeight: '1.4',
        margin: '0 0 1.5rem 0',
    },

    statsGrid: {
        width: '100%',
        borderTop: '1px solid #30363d',
        paddingTop: '1rem',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.4rem',
        fontSize: '0.9rem',
        textAlign: 'left' as const,
    },

    statItem: {
        color: '#c9d1d9',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },

    copyBtn: {
        padding: '8px 16px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid #30363d',
        borderRadius: '6px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '0.85rem',
        transition: 'background-color 0.2s',
    },
};
