
import { Link } from 'react-router-dom';
import './index.scss'

import { HeartOutlined, HeartFilled, MessageOutlined } from '@ant-design/icons';
import { useState, useContext, useEffect } from 'react';
import Comments from '../Comments';
// import Share from '../Share';
import moment from 'moment';

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';
import { Button, Popconfirm } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { message } from 'antd';



interface PostProps {
    post: {
        id: number;
        username: string;
        userId: number;
        profilePic: string;
        desc: string;
        img?: string;
        createdAt?: any
        userPic?: string
    }
    refresh?: boolean
    setRefresh?: React.Dispatch<React.SetStateAction<boolean>> 

}


const Post: React.FC<PostProps> = ({ post, refresh, setRefresh }) => {
    
    // 评论部分是否展开
    const [commentOpen, setCommentOpen] = useState(false)
    // （删除）菜单
    // const [menuOpen, setMenuOpen] = useState(false)
    const [size] = useState<SizeType>('middle'); // default is 'middle'

    // 分享转发
    // const [share, setShare] = useState(false)

    const { currentUser } = useContext(AuthContext)

    // const [data, setData] useState()

    // useEffect(() => {
    //     makeRequest.get("likes?postId"+post.id).then(res => {
    //         console.log(res.data);

    //     })
    // })
    const [data, setData] = useState<object[]>([])
    // 判断是否点赞，如果点了，更新，useEffect监听
    const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);
    useEffect(() => {
        makeRequest.get("/likes?postId=" + post.id).then(res => {
            setData(res.data);
            // 使用some方法来判断是否有点赞记录包含当前登录用户的id
            setIsLikedByCurrentUser(res.data.some((like: { userId: string }) => like.userId === currentUser.id));
        });
    }, [currentUser.id, post.id]);


    const handleLike = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        try {
            if (isLikedByCurrentUser) {
                // 如果已经点赞过，则执行取消点赞操作
                await makeRequest.delete("/likes?postId=" + post.id);
            } else {
                // 否则，执行点赞操作
                await makeRequest.post("/likes", { postId: post.id });
            }
            // 更新点赞状态
            setIsLikedByCurrentUser(!isLikedByCurrentUser);
            // 重新获取最新的点赞数据，并更新data数组
            makeRequest.get("/likes?postId=" + post.id).then(res => {
                setData(res.data);
            });
        } catch (error) {
            console.error(error);
        }
    };
    // 路由跳转的同时返回顶部
    const handleTop = () => {
        window.scrollTo(0, 0)
    }

    // 删除帖子
    const handleDelete = () => {
        makeRequest.delete("/posts/" + post.id).then(res => {
            if (res.status === 401) {
                message.error('未登录！');
            } else if (res.status === 403) {
                message.error('用户登录已过期，请重新登录');
            } else if (res.status === 200) {
                message.success('删除成功');
                
                if(setRefresh) {                    
                    setRefresh(!refresh)                   
                }
            }
        })
    }

    return (
        <div className="post">
            <div className="container">
                {/* 个人信息区域 */}
                <div className="user">
                    <div className="userInfo">
                        <img src={post.userPic ? "/upload/"+post.userPic : "/assets/user.jpg"} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className='name' onClick={handleTop}>{post.username}</span>
                            </Link>
                            <div className="date">{moment(post.createdAt).fromNow()}</div>
                        </div>
                    </div>
                    {
                        post.userId === currentUser.id
                        &&
                        <Popconfirm
                            title="Delete the task"
                            description="确定删除?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={handleDelete}
                            onCancel={() => {
                                message.warning('取消删除')
                            }}
                        >
                            <Button type="primary" size={size} danger>
                                删除
                            </Button>
                        </Popconfirm>

                    }
                    {/* <EllipsisOutlined style={font ? {display: "none"} : {display: "block"}} onClick={handleClick} />
                    {menuOpen
                        && post.userId === currentUser.id
                        && <Button type="primary" size={size} danger  onClick={handleDelete}>
                            删除
                        </Button>
                    } */}
                </div>
                {/* 帖子内容 */}
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={"./upload/" + post.img} alt="" />
                </div>
                {/* 点赞，评论，转发分享 */}
                <div className="info">
                    <div className="item" onClick={handleLike}>
                        {isLikedByCurrentUser ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
                        {data && data.length} likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <MessageOutlined />
                        12 comments
                    </div>
                    {/* <div className="item" onClick={() => setShare(!share)}>
                        <ShareAltOutlined />
                        Share
                    </div> */}
                </div>
                {commentOpen && <Comments postId={post.id} />}
                {/* {share && <Share />} */}
            </div>

        </div>
    )
}

export default Post