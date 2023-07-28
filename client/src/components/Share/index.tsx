import "./index.scss";
import { useContext, useState, MouseEvent, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import Posts from "../Posts";

const Share: React.FC = () => {

    const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'

    // 上传图片，写描述
    const [file, setFile] = useState<File | null>({} as File)
    const [desc, setDesc] = useState<string>("")

    const [refresh, setRefresh] = useState(false)

    const upload = async () => {
        try {
            const formData = new FormData()
            if (file) {
                formData.append("file", file)
                const res = await makeRequest.post("/upload", formData)
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

    const handleShare = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let imgUrl = ""
        if (file) imgUrl = await upload()
        console.log(imgUrl);
        
        try {
            makeRequest.post("/posts", { desc, img: imgUrl })
        } catch (error) {
            console.error(error);

        }

    }
    // 在需要刷新的部分页面组件中使用 refresh 值来触发重新渲染
    // useEffect(() => {
    //     // 处理页面内容的刷新逻辑
    //     <Posts/>

    //     // 清除标记值
    //     setRefresh(false);
    // }, [refresh]);

    // antd按钮
    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img
                        src={currentUser.profilePic}
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