import { useContext, useState } from 'react';
import './index.scss'
import { AuthContext } from '../../context/authContext';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';


const Comments: React.FC = () => {

    // 获取当前用户信息
    const { currentUser } = useContext(AuthContext)

    // antd按钮
    const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'

    const comments = [
        {
            id: 1,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
            name: "John Doe",
            userId: 1,
            profilePicture:
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 2,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
            name: "Tom Coe",
            userId: 2,
            profilePicture:
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
    ];

    return (
        <div className="comments">
            <div className="write">
                <img src={ currentUser.profilePic } alt="" />
                <input type="text" placeholder='write a comment'/>
                <Button type="primary" size={size}>
                    Send
                </Button>

            </div>
            {comments.map(comment => (
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePicture} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>1 hour ago</span>
                </div>
            ))}
        </div>
    )
}

export default Comments