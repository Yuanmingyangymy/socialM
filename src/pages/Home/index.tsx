import React from 'react'
import Stories from '../../components/Stories';
import Posts from '../../components/Posts';

import './index.scss'

const Home: React.FC = () => {
    return (
        <div className="home">
            <Stories/>
            <Posts/>
        </div>
    )
}
export default Home