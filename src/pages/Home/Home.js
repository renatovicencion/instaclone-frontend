import React from 'react';

import useAuth from './../../hooks/useAuth';

import './Home.scss';
const Home = () => {

    const auth = useAuth();
    
    return (
        <div>
            Home
        </div>
    );
};

export default Home;
