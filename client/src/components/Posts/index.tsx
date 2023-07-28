
import { makeRequest } from '../../axios';
import Post from '../Post';

import './index.scss'

import { useQuery } from '@tanstack/react-query'


export const Posts: React.FC = () => {
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
        return makeRequest.get("/posts").then(res => {
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