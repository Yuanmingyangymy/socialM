
import { Link } from 'react-router-dom';
import './index.scss'

import { EllipsisOutlined, HeartOutlined, HeartFilled, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Comments from '../Comments';
import Share from '../Share';


interface PostProps {
    post: {
        id: number;
        name: string;
        userId: number;
        profilePic: string;
        desc: string;
        img?: string;
    };
}


const Post: React.FC<PostProps> = ({ post }) => {

    // 评论部分是否展开
    const [commentOpen, setCommentOpen] = useState(false)
    // 点赞功能未实现
    const [liked, setLiked] = useState(false)
    // 分享转发
    const [share, setShare] = useState(false)

    return (
        <div className="post">
            <div className="container">
                {/* 个人信息区域 */}
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className='name'>{post.name}</span>
                            </Link>
                            <div className="date">one minute ago</div>
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
                    <div className="item" onClick={() => setLiked(!liked)}>
                        {liked ? <HeartFilled style={{color: "red"}}/> : <HeartOutlined />}
                        88 likes
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
                {commentOpen && <Comments/>}
                {share && <Share/>}
            </div>

        </div>
    )
}

export default Post