import "./index.scss";
import { useContext, useState, MouseEvent, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
// import { useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { StateContext } from '../../context/stateChange';
import { message } from 'antd';


const Share: React.FC = () => {

    const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'

    // 上传图片，写描述
    const [file, setFile] = useState<File | null>({} as File)
    const [desc, setDesc] = useState<string>("")


    const upload = async () => {
        try {
            const formData = new FormData()
            if (file) {
                formData.append("file", file)
                const res = await makeRequest.post("/upload", formData)
                if(res.status === 200) {
                    message.success('添加图片成功')
                } else {
                    message.error('添加图片失败')
                }
                
                return res.data
                
            }
        } catch (error) {
            console.log(error);

        }
    }

    const { currentUser } = useContext(AuthContext)

    // const queryClient = useQueryClient()
    // const mutation = useMutation(
    //     (newPost) => {
    //         return makeRequest.post("/posts", newPost)
    //     },
    //     {
    //         onSuccess: () => {
    //             // Invalidate and refetch
    //             queryClient.invalidateQueries({ queryKey: ['posts'] })
    //         },
    //     })

    // const handleShare = async (e: MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     let imgUrl = ""
    //     if(file) imgUrl = await upload()
    //     // mutation.mutate({desc, img: imgUrl}) 
    //     try {
    //         await mutation.mutate({ desc, img: imgUrl });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const { setRefresh } = useContext(StateContext)

    const handleShare = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let imgUrl = ""
        if (file) imgUrl = await upload()
        
        try {
            makeRequest.post("/posts", { desc, img: imgUrl }).then(res => {
                if (res.status === 401) {
                    message.error('未登录！');
                } else if (res.status === 403) {
                    message.error('用户登录已过期，请重新登录');
                } else if (res.status === 200) {
                    message.success('发布成功');
                }
            })
            e.preventDefault()
            setDesc('')
            setFile({} as File)
            setRefresh(true)
            
        } catch (error) {
            console.error(error);

        }

    }

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img
                        src={"/upload/" + currentUser.profilePic}
                        alt=""
                    />
                    <input
                        type="text"
                        placeholder={`What's on your mind ${currentUser.username}?`}
                        onChange={e => setDesc(e.target.value)}
                    />
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={e => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setFile(e.target.files[0] as File);
                                }
                            }} />
                        <label htmlFor="file">
                            <div className="item">
                                <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/img.png?raw=true" alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/map.png?raw=true" alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/friend.png?raw=true" alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <Button type="primary" size={size} onClick={handleShare}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;