import PageShell from '../components/PageShell';
import { TopographicMap as TopographicsMap } from './topograpficstest';


function FeaturesPage() {
    return (
        <PageShell title="features" subtitle="tools">
            <div style={{
                padding: '40px 20px',
                backgroundColor: '#0f111a',
                color: '#fff',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{ width: '100%', maxWidth: '1200px', marginBottom: '30px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '12px', fontSize: '28px', fontWeight: 500 }}>background map generator</h2>
                    <p style={{ marginBottom: '24px', color: '#687089' }}>make maps and test maps</p>
                </div>

                <section style={{ width: '100%', maxWidth: '1200px', marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '13px', color: '#687089', marginBottom: '10px', letterSpacing: '1px' }}>
                        1. header version
                    </h3>
                    <TopographicsMap width={1200} height={220} lines={16} />
                </section>

                <div style={{
                    display: 'flex',
                    gap: '30px',
                    flexWrap: 'wrap',
                    width: '100%',
                    maxWidth: '1200px',
                    justifyContent: 'center'
                }}>
                    <section style={{ flex: '2', minWidth: '500px' }}>
                        <h3 style={{ fontSize: '13px', color: '#687089', marginBottom: '10px', letterSpacing: '1px' }}>
                            2. big square
                        </h3>
                        <TopographicsMap width={770} height={450} lines={28} />
                    </section>

                    <section style={{ flex: '1', minWidth: '300px' }}>
                        <h3 style={{ fontSize: '13px', color: '#687089', marginBottom: '10px', letterSpacing: '1px' }}>
                            3. smoll square
                        </h3>
                        <TopographicsMap width={400} height={450} lines={20} />
                    </section>
                </div>
            </div>
        </PageShell>
    );
}

export default FeaturesPage;
