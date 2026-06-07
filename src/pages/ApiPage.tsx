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
}

export default ApiPage;
