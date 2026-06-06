import PageShell from '../components/PageShell';
import { TopographicMap as TopographicsMap } from './topograpficstest';


function FeaturesPage() {
    return (
        <PageShell title="features" subtitle="tools">
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '12px', fontSize: '24px' }}>background map generator</h2>
                <p style={{ marginBottom: '24px' }}>generate background maps</p>
                <TopographicsMap width={800} height={500} />
            </div>
        </PageShell>
    );
}

export default FeaturesPage;
