import React from 'react'
import Stories from '../../components/Stories';
import Posts from '../../components/Posts';

import './index.scss'
import Share from '../../components/Share';

const Home: React.FC = () => {
    return (
        <div className="home">
            <Stories/>
            <Share/>
            <Posts/>
        </div>
    )
}
export default Home