import { useState, useContext, useEffect } from 'react';
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
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { log } from 'console';
const Profile: React.FC = () => {
    // antd按钮
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    // 获取当前用户ID与当前个人信息页面用户ID比较，看是更新个人信息还是关注/取关
    const { currentUser } = useContext(AuthContext)

    // 获取地址栏中userId
    const userId = parseInt(useLocation().pathname.split("/")[2])

    interface User {
        id: number,
        username: string,
        email: string,
        profilePic?: string,
        coverPic?: string,
        city?: string,
        website?: string

    }


    const [data, setData] = useState<User>()
    const [follow, setFollow] = useState<number[]>([])

    // const { isLoading, error, data } = useQuery(['user'], () => {
    //     return makeRequest.get("/users/find/" + userId).then(res => {
    //         return res.data
    //     })
    // })

    useEffect(() => {
        makeRequest.get("/users/find/" + userId).then(res => {
            setData(res.data)
        })
        
    }, [])

    useEffect(() => {
        makeRequest.get("/relationships?followedUserId=" + userId).then(res => {
            
            // console.log(res.data);
            setFollow(res.data)           
        })
    }, [])


    // 关注事件
    const handleFollow = async () => {
        if(follow.includes(currentUser.id)) {
            await makeRequest.post("/relationships/delete", {userId}).then(res => {
                
                if(res.status === 200) {
                    setFollow(follow.filter(id => id !== currentUser.id))
                    // console.log("关注成功");                  

                } else {
                    return
                }
                
            })

        } else {
            await makeRequest.post("/relationships", {userId})
            setFollow([...follow, currentUser.id])
        }
    }

    return (
        <div className="profile">
            {
                !data ?
                    "Loading……" :
                    (
                        <>
                            <div className="images">
                                {/* {
                                    data && (
                                        <>
                                            <img src={data.coverPic} alt="" className="cover" />
                                            <img src={data.profilePic} alt="" className="profilePic" />
                                        </>
                                    )
                                } */}
                                {/* 个人主页背景图 */}
                                <img src={data?.coverPic} alt="" className="cover" />
                                {/* 用户头像 */}
                                <img src={data?.profilePic} alt="" className="profilePic" />
                            </div>
                            <div className="profileContainer">
                                <div className="linkInfo">
                                    <div className="left">
                                        {/* 外部链接 */}
                                        <TwitterOutlined style={{ cursor: "pointer" }} />
                                        <WechatOutlined style={{ cursor: "pointer" }} />
                                        <WeiboOutlined style={{ cursor: "pointer" }} />

                                    </div>
                                    <div className="center">
                                        <span className='name'>{data?.username}</span>
                                        <div className="items">
                                            <div className="item">
                                                <EnvironmentOutlined style={{ fontSize: "20px" }} />
                                                <span>{data?.city}</span>
                                            </div>
                                            <div className="item">
                                                <GlobalOutlined style={{ fontSize: "20px" }} />
                                                <span>{data?.website}</span>
                                            </div>
                                        </div>

                                        {/* 关注？该用户 或者更新信息 */}
                                        {
                                            userId === currentUser.id ?
                                                (<Button type="primary" size={size} className='follow'>
                                                    Update
                                                </Button>) :
                                                (<Button type="primary" size={size} className='follow' onClick={handleFollow}>
                                                    {follow?.includes(currentUser.id) ? "Following" : "Follow"}
                                                </Button>)
                                        }

                                    </div>
                                    <div className="right">
                                        {/* 私信 */}
                                        <MailOutlined style={{ cursor: "pointer" }} />
                                        <MoreOutlined style={{ cursor: "pointer" }} />
                                    </div>
                                </div>
                                <Posts />
                            </div>
                        </>
                    )

            }

        </div>
    )
}
export default Profile