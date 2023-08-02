import React from 'react'
import Stories from '../../components/Stories';

import './index.scss'
import Share from '../../components/Share';
import PostsProvider from '../../context/PostsContext';

const Home: React.FC = () => {
    return (
        <div className="home">
            <PostsProvider>
                <Stories/>
                <Share/>
                {/* <Posts/> */}
            </PostsProvider>

        </div>
    )
}
export default Home