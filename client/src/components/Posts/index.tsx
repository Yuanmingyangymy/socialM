import { useEffect, useContext, useState } from 'react';
import { makeRequest } from '../../axios';
import Post from '../Post';
import { StateContext } from '../../context/stateChange';
import './index.scss'

import { useQuery } from '@tanstack/react-query'

type PostsProps = {
    userId?: number
}


export const Posts: React.FC<PostsProps> = ({ userId }) => {
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

    const { refresh, setRefresh } = useContext(StateContext)
    const [data, setData] = useState([])
    useEffect(() => {
        makeRequest.get("/posts?userId=" + userId).then(res => {
            setData(res.data)
            
        })
        
        setRefresh(false)
    }, [refresh, setRefresh])



    return (
        <div className="posts">
            {data.map((post: any) => (
                <Post key={post.id} post={post} />
            ))
            }
        </div>
    )
}

export default Posts