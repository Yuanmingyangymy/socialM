import { useEffect, useState, useContext } from 'react';
import { makeRequest } from '../../axios';
import Post from '../Post';
import './index.scss'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { PostSetContext } from '../../context/PostsContext'

type PostsProps = {
    userId?: number
    refresh?: boolean
    setRefresh?: React.Dispatch<React.SetStateAction<boolean>>
}


export const Posts: React.FC<PostsProps> = ({ userId, refresh, setRefresh }) => {
    
    // interface Post {
    //     id: number,
    //     desc?: string,
    //     img?: string,
    //     userId: number,
    //     createdAt?: Date,
    //     username: string,
    //     profilePic: string
    // }


    const navigate = useNavigate()
    const [data, setData] = useState([])
    // 添加加载状态
    const [isLoading, setIsLoading] = useState(true)
    // 获取地址栏中userId
    const set = useLocation().pathname.split("/")[1]

    // 外部context提供postset，用于刷新Posts
    const { postSet } = useContext(PostSetContext)
    const fetchPostsAll = async () => {
        try {
            const res = await makeRequest.get("/posts/all")
            
            setData(res.data)
            setIsLoading(false)
        } catch (error: any) {
            console.error(error);

            if (error.response.status === 401) {
                // 处理未登录的情况，跳转到登录页面或提示用户登录
                message.error('未登录！');
                navigate("/login")
                // 弹出提示框：message.error('请先登录！');
            } else if (error.response.status === 403) {
                // 处理登录过期的情况，跳转到登录页面或提示用户重新登录
                message.error('用户登录已过期，请重新登录');
                navigate("/login")

            }
        }
    }

    const fetchPosts = async (userId?: number | undefined) => {

        try {
            let url = ""
            if (typeof(userId) === 'undefined' || userId) {
                url = `/posts?userId=${userId}`
            }
            
            const res = await makeRequest.get(url)

            
            setData(res.data)
            setIsLoading(false)

        } catch (error: any) {
            console.error(error);

            if (error.response.status === 401) {
                // 处理未登录的情况，跳转到登录页面或提示用户登录
                message.error('未登录！');
                navigate("/login")
                // 弹出提示框：message.error('请先登录！');
            } else if (error.response.status === 403) {
                // 处理登录过期的情况，跳转到登录页面或提示用户重新登录
                message.error('用户登录已过期，请重新登录');
                navigate("/login")

            }
        }
    }
    // 在组件加载时根据地址栏中的参数判断获取哪种类型的帖子
    useEffect(() => {
        if (set === "all") {
            
            // 获取所有用户的帖子
            fetchPostsAll();
        } else {
            
            fetchPosts(userId);
        }
    }, [set, postSet, refresh]);
    return (
        <>
            {
                isLoading
                    ? <div className="posts"><h2>加载中……</h2></div>
                    : data.length === 0
                        ? <div className="posts"><h2>No posts found</h2></div>
                        : <div className="posts">
                            {data.map((post: any) => (
                                <Post key={post.id} post={post} refresh={refresh} setRefresh={setRefresh} />
                            ))
                            }

                        </div>

            }
        </>


    )
}

export default Posts