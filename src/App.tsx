import AboutPage from './pages/AboutPage';
import ApiPage from './pages/ApiPage';
import FeaturesPage from './pages/FeaturesPage';
import HomePage from './pages/HomePage';
import LookrPage from './pages/LookrPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';

    if (path === '/' || path === '/home') {
        return <HomePage />;
    }

    if (path === '/lookr') {
        return <LookrPage />;
    }

    if (path === '/features') {
        return <FeaturesPage />;
    }

    if (path === '/api') {
        return <ApiPage />;
    }

    if (path === '/about') {
        return <AboutPage />;
    }

    return <NotFoundPage />;
}

export default App;
