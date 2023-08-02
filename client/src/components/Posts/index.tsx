import { useEffect, useState } from 'react';
import { makeRequest } from '../../axios';
import Post from '../Post';
import './index.scss'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';



type PostsProps = {
    userId?: number
    refresh?: boolean
    setRefresh?: React.Dispatch<React.SetStateAction<boolean>>
}


export const Posts: React.FC<PostsProps> = ({ userId, refresh, setRefresh }) => {
    
    interface Post {
        id: number,
        desc?: string,
        img?: string,
        userId: number,
        createdAt?: Date,
        username: string,
        profilePic: string
    }

    // const { isLoading, error, data } = useQuery(['posts'], () => {
    //     return makeRequest.get("/posts?userId=" + userId).then(res => {
    //         return res.data
    //     })
    // })
    const navigate = useNavigate()
    const [data, setData] = useState([])
    // const {posts, setPosts} = usePostsContext()
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await makeRequest.get("/posts?userId=" + userId)
                setData(res.data)
                
            } catch (error: any) {
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
        // 第一次加载时触发获取帖子数据
        fetchPosts()
        
    }, [refresh]);



    return (
        <div className="posts">
            {data.map((post: any) => (
                <Post key={post.id} post={post} refresh={refresh} setRefresh={setRefresh}/>
            ))
            }
        </div>
    )
}

export default Posts