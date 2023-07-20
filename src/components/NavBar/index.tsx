import React from 'react'

import {HomeOutlined, AppstoreOutlined, SearchOutlined, PoweroffOutlined, CommentOutlined, FireOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'

import './index.scss'

const NavBar: React.FC = () => {
    return (
        <div className="Nav">
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className='logo'>Social.</span>
                </Link>
                <HomeOutlined/>
                <AppstoreOutlined/>
                <FireOutlined />
                <PoweroffOutlined />
                <div className="search">
                    <input type="text" placeholder='search here'/>
                    <SearchOutlined className='searchIcon'/>
                </div>
            </div>
            <div className="right">
                <CommentOutlined />
                <UserOutlined />
                <div className="user">
                    <img src="https://avatars.githubusercontent.com/u/106372033?s=400&u=6687fcedc05ecf0d4277e977d87e05de446dd89a&v=4" alt="用户头像" />
                    <span>Jay</span>
                </div>

            </div>
        </div>
    )
}
export default NavBar
