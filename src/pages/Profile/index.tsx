import { useState } from 'react';
import './index.scss'

import {
    TwitterOutlined,
    WechatOutlined,
    WeiboOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
    MailOutlined,
    MoreOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import Posts from '../../components/Posts';
const Profile: React.FC = () => {
    // antd按钮
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    return (
        <div className="profile">
            <div className="images">
                {/* 个人主页背景图 */}
                <img src="https://images.unsplash.com/photo-1549138144-42ff3cdd2bf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60" alt="" className="cover" />
                {/* 用户头像 */}
                <img src="https://images.unsplash.com/photo-1682704109522-56a6fbc1962e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60" alt="" className="profilePic" />
            </div>
            <div className="profileContainer">
                <div className="linkInfo">
                    <div className="left">
                        {/* 外部链接 */}
                        <TwitterOutlined style={{cursor:"pointer"}}/>
                        <WechatOutlined style={{cursor:"pointer"}}/>
                        <WeiboOutlined style={{cursor:"pointer"}}/>

                    </div>
                    <div className="center">
                        <span className='name'>Jane Coe</span>
                        <div className="items">
                            <div className="item">
                                <EnvironmentOutlined style={{ fontSize: "20px" }} />
                                <span>China</span>
                            </div>
                            <div className="item">
                                <GlobalOutlined style={{ fontSize: "20px" }} />
                                <span>Social.dev</span>
                            </div>
                        </div>

                        {/* 关注该用户 */}
                        <Button type="primary" size={size} className='follow'>
                            Follow
                        </Button>
                    </div>
                    <div className="right">
                        {/* 私信 */}
                        <MailOutlined style={{cursor:"pointer"}}/>
                        <MoreOutlined style={{cursor:"pointer"}}/>
                    </div>
                </div>
                <Posts />
            </div>
        </div>
    )
}
export default Profile