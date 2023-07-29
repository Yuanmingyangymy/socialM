
import { type } from 'os';
import { makeRequest } from '../../axios';
import Post from '../Post';

import './index.scss'

import { useQuery } from '@tanstack/react-query'

type PostsProps = {
    userId?: number
}


export const Posts: React.FC<PostsProps> = ({userId}) => {
    interface Post {
        id: number,
        desc?: string,
        img?: string,
        userId: number,
        createdAt?: Date,
        username: string,
        profilePic: string
    }

    const { isLoading, error, data } = useQuery(['posts'], () => {
        return makeRequest.get("/posts?userId=" + userId).then(res => {
            return res.data
        })
    })
    // console.log(data);



    return (
        <div className="posts">
            {   error ?
                "出现错误，请稍后再试。" :
                isLoading ?
                    "加载中……" :
                    data.map((post: any) => (
                        <Post key={post.id} post={post} />
                    ))
            }
        </div>
    )
}

export default Posts