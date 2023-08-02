import React, { useState } from 'react';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

import './index.scss'

const RightBar: React.FC = () => {
    // antd按钮
    const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'

    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span className='intro'>Suggestions For You</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <span>Jay</span>
                        </div>
                        <div className="buttons">
                            <Button type="primary" size={size}>
                                Follow
                            </Button>
                            <Button type="primary" danger size={size}>
                                Dismiss
                            </Button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <span>Jay</span>
                        </div>
                        <div className="buttons">
                            <Button type="primary" size={size}>
                                Follow
                            </Button>
                            <Button type="primary" danger size={size}>
                                Dismiss
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <span className='intro'>Lastest Activities</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <p>
                                <span>Jay Chou</span> changed username
                            </p>
                        </div>
                        <span className='time'>1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <p>
                                <span>Jay Chou</span> updated action
                            </p>
                        </div>
                        <span className='time'>1 hour ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <p>
                                <span>Jay Chou</span> changed pic
                            </p>
                        </div>
                        <span className='time'>1 min ago</span>
                    </div>
                    
                </div>
                <div className="item">
                    <span className='intro'>Online Friends</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <div className="online"></div>
                            <span>Jay Chou</span> 
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <div className="online"></div>
                            <span>Jay Chou</span> 
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <div className="online"></div>
                            <span>Jay Chou</span> 
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <div className="online"></div>
                            <span>Jay Chou</span> 
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <div className="online"></div>
                            <span>Jay Chou</span> 
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <div className="online"></div>
                            <span>Jay Chou</span> 
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <div className="online"></div>
                            <span>Jay Chou</span> 
                        </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="/assets/user.jpg" alt="用户头像" />
                            <div className="online"></div>
                            <span>Jay Chou</span> 
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default RightBar