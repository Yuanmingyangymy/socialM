import { useContext, useState, useEffect } from 'react';
import './index.scss'
import { AuthContext } from '../../context/authContext';
import { Button, message } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { makeRequest } from '../../axios';
import moment from 'moment';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface CommentProps {
    postId: number
}

const Comments: React.FC<CommentProps> = ({ postId }) => {

    interface commentType {
        id: number;
        username: string;
        userId: number;
        profilePic: string;
        desc: string;
        img?: string;
        createdAt?: any
    }

    const [desc, setDesc] = useState<string>(" ")

    // const { isLoading, error, data } = useQuery(['comments'], () => {
    //     return makeRequest.get("/comments?postId=" + postId).then(res => {
    //         return res.data
    //     })
    // })

    // const queryClient = useQueryClient()
    // const mutation = useMutation(
    //     (newComment) => {
    //         return makeRequest.post("/comments", newComment)
    //     },
    //     {
    //         onSuccess: () => {
    //             // Invalidate and refetch
    //             queryClient.invalidateQueries(["comments"])
    //         },
    //     })

    // const handleComment = async (e: MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     mutation.mutate({ desc, postId})
    //     setDesc("")
    // }
    const [data, setData] = useState([])
    useEffect(() => {
        makeRequest.get("/comments?postId=" + postId).then(res => {
            setData(res.data)
        })
    }, [])
    const handleComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            await makeRequest.post("/comments", { desc, postId }).then(res => {
                if (res.status === 401) {
                    message.error('未登录！');
                } else if (res.status === 403) {
                    message.error('用户登录已过期，请重新登录');
                } else if (res.status === 200) {
                    message.success('评论成功');
                }
                setDesc("")
            })
        } catch (error) {
            console.error(error);

        }

    }
    // 获取当前用户信息
    const { currentUser } = useContext(AuthContext)

    // antd按钮
    const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'



    return (
        <div className="comments">
            <div className="write">
                <img src={"/upload/" + currentUser.profilePic} alt="" />
                <input type="text" value={desc} onChange={e => setDesc(e.target.value)} />
                <Button type="primary" size={size} onClick={handleComment}>
                    Send
                </Button>

            </div>
            {!data ? '加载中' : ''}
            {
                (data.map((comment: any) => (
                    <div className="comment" key={comment.id}>
                        <img src={"/upload/" + comment.profilePic} alt="" />
                        <div className="info">
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                )))
            }
        </div>
    )
}

export default Comments