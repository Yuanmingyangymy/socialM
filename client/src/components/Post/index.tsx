
import { Link } from 'react-router-dom';
import './index.scss'

import { EllipsisOutlined, HeartOutlined, HeartFilled, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useState, useContext, useEffect } from 'react';
import Comments from '../Comments';
import Share from '../Share';
import moment from 'moment';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';


interface PostProps {
    post: {
        id: number;
        username: string;
        userId: number;
        profilePic: string;
        desc: string;
        img?: string;
        createdAt?: any
    };
}


const Post: React.FC<PostProps> = ({ post }) => {

    // 评论部分是否展开
    const [commentOpen, setCommentOpen] = useState(false)
    // 点赞功能未实现
    const [liked, setLiked] = useState(false)
    // 分享转发
    const [share, setShare] = useState(false)

    const {currentUser} = useContext(AuthContext)

    // const [data, setData] useState()

    // useEffect(() => {
    //     makeRequest.get("likes?postId"+post.id).then(res => {
    //         console.log(res.data);
            
    //     })
    // })

    const { isLoading, error, data } = useQuery(['likes', post.id], () => {
        return makeRequest.get("/likes?postId="+post.id).then(res => {
            return res.data
        })
    })
    // console.log(data);
    const handleLike = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        
        try {
            if(data.includes(currentUser.id)) return makeRequest.delete("/likes?postId=" + post.id)
            return makeRequest.post("/likes", {postId: post.id})
        } catch (error) {
            console.error(error);

        }

    }
    // 路由跳转的同时返回顶部
    const handleTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className="post">
            <div className="container">
                {/* 个人信息区域 */}
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className='name' onClick={handleTop}>{post.username}</span>
                            </Link>
                            <div className="date">{moment(post.createdAt).fromNow()}</div>
                        </div>
                    </div>
                    <EllipsisOutlined />
                </div>
                {/* 帖子内容 */}
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={"./upload/" + post.img} alt="" />
                </div>
                {/* 点赞，评论，转发分享 */}
                <div className="info">
                    <div className="item" onClick={handleLike}>
                        {
                            isLoading ? (
                                "Loading"
                            ) : data.includes(currentUser.id) ? (
                                <HeartFilled style={{color: "red"}}/>
                            ) : (<HeartOutlined/>)
                        }
                        {data && data.length} likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <MessageOutlined />
                        12 comments
                    </div>
                    <div className="item" onClick={() => setShare(!share)}>
                        <ShareAltOutlined />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id}/>}
                {share && <Share/>}
            </div>

        </div>
    )
}

export default Post