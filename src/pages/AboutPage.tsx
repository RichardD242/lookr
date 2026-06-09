import PageShell from '../components/PageShell';

function AboutPage() {
    return (
        <PageShell
            title="about"
            subtitle="the story and how to use lookr and the api"
        >
            <div style={styles.container}>
                <div style={styles.contentWrapper}>
                    <section style={styles.section}>
                        <h2 style={styles.heading}>what is lookr?</h2>
                        <p style={styles.text}>
                            lookr is a minimal, developer-focused profile card generator. it pulls your real time stats directly from the github api and generates a card. you can use the clean markdown code in your your personal github readme, personal website or portfolio.
                        </p>

                        <div style={styles.screenshotGrid}>
                            <div style={styles.screenshotCard}>
                                <div style={styles.imagePlaceholder}>
                                    <span style={styles.imagePlaceholderText}>screenshot of lookr card</span>
                                </div>
                                <h3 style={styles.subHeading}>normal lookr card  img: width 690px</h3>
                                <p style={styles.caption}>there is one long card and one vertical card, this is the long one</p>
                            </div>
                        </div>
                    </section>

                    <hr style={styles.divider} />

                    <section style={styles.section}>
                        <h2 style={styles.heading}>features and preview</h2>
                        <p style={styles.text}>
                            in the current version, lookr generates dynamic cards based on github user data. in /features you can see the generator for topographic maps, which is a core part of the lookr branding and design.
                        </p>

                        <div style={styles.screenshotGrid}>
                            <div style={styles.screenshotCard}>
                                <div style={styles.imagePlaceholder}>
                                    <span style={styles.imagePlaceholderText}>screenshot of lookr card</span>
                                </div>
                                <h3 style={styles.subHeading}>1. live card preview img: width 690px</h3>
                                <p style={styles.caption}>see the card update in real time</p>
                            </div>

                            <div style={styles.screenshotCard}>
                                <div style={styles.imagePlaceholder}>
                                    <span style={styles.imagePlaceholderText}>screenshot of lookr features page</span>
                                </div>
                                <h3 style={styles.subHeading}>2. copy markdown img: width 690px</h3>
                                <p style={styles.caption}>copy the generated markdown code to use in your readme</p>
                            </div>
                        </div>
                    </section>

                    <hr style={styles.divider} />

                    <section style={styles.section}>
                        <h2 style={styles.heading}>how to use the api</h2>
                        <ol style={styles.list}>
                            <li style={styles.listItem}>
                                1. for ease use, just copy the markdown code from the page.
                            </li>
                            <li style={styles.listItem}>
                                2. slack channel, in the slack channel #lookr you can use commands like /lookr + username to generate a card inside of the channel
                            </li>
                            <li style={styles.listItem}>
                                3. future endpoint could be (because i ddint host yet) lookr.com/api/username
                            </li>
                        </ol>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>how to use the slack channel</h2>
                        <p style={styles.text}>
                            inside the slack channel #lookr, you use the following commands:
                        </p>
                        <ul style={styles.list}>
                            <li style={styles.listItem}>
                                /lookr + github/slack + username - generates a lookr card for the specified github or slack username
                            </li>
                            <li style={styles.listItem}>
                                /lookr help - shows a list of available commands and usage instructions
                            </li>
                            <li style={styles.listItem}>
                                /lookr repo + username - shows the top repos with the most stars
                            </li>
                            <li style={styles.listItem}>
                                /lookr boss - shows profile of zach latta
                            </li>
                        </ul>
                    </section>

                </div>
            </div>
        </PageShell>
    );
}

export default AboutPage;



const styles = {


    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 0',
        fontFamily: 'sans-serif',
        color: '#ffffff',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column' as const,
        maxWidth: '700px',
        width: '100%',
        padding: '0 1rem',
    },
    section: {
        marginBottom: '1.5rem',
    },
    heading: {
        fontSize: '1.6rem',
        fontWeight: '700',
        color: '#e3b341',
        margin: '0 0 1rem 0',
    },
    subHeading: {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#ffffff',
        margin: '1rem 0 0.5rem 0',
    },
    text: {
        fontSize: '1rem',
        color: '#c9d1d9',
        lineHeight: '1.6',
        margin: '0',
    },
    divider: {
        border: 'none',
        borderTop: '1px solid #30363d',
        margin: '2rem 0',
    },
    screenshotGrid: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem',
        marginTop: '1.5rem',
    },
    screenshotCard: {
        backgroundColor: '#1f1f1f',
        border: '1px solid #30363d',
        borderRadius: '12px',
        padding: '1.2rem',
    },
    imagePlaceholder: {
        width: '100%',
        height: '220px',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        border: '2px dashed #30363d',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholderText: {
        color: '#8b949e',
        fontSize: '0.9rem',
        fontStyle: 'italic',
    },
    caption: {
        fontSize: '0.9rem',
        color: '#8b949e',
        lineHeight: '1.4',
        margin: '0',
    },
    list: {
        paddingLeft: '1.2rem',
        margin: '0',
    },
    listItem: {
        fontSize: '1rem',
        color: '#c9d1d9',
        lineHeight: '1.6',
        marginBottom: '1rem',
    },
};