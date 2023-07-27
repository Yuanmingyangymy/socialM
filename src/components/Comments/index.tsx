import { useContext, useState, MouseEvent } from 'react';
import './index.scss'
import { AuthContext } from '../../context/authContext';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { makeRequest } from '../../axios';
import moment from 'moment';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

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

    const { isLoading, error, data } = useQuery(['comments'], () => {
        return makeRequest.get("/comments?postId=" + postId).then(res => {
            return res.data
        })
    })

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
    const handleComment = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            await makeRequest.post("/comments", { desc, postId }).then(res => {
                console.log(res);
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
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder='write a comment' onChange={e => setDesc(e.target.value)} value={desc} />
                <Button type="primary" size={size} onClick={handleComment}>
                    Send
                </Button>

            </div>
            {
                error
                    ? "加载有误，请稍后再试"
                    : isLoading
                        ? "加载中……"
                        : data
                            ? (data.map((comment: any) => (
                                <div className="comment" key={comment.id}>
                                    <img src={comment.profilePic} alt="" />
                                    <div className="info">
                                        <span>{comment.name}</span>
                                        <p>{comment.desc}</p>
                                    </div>
                                    <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                                </div>
                            )))
                            : "还没有评论~"
            }
        </div>
    )
}

export default Comments