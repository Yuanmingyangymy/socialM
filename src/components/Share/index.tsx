import "./index.scss";
// import Image from "../../assets/img.png";
// import Map from "../../assets/map.png";
// import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const Share = () => {

    const { currentUser } = useContext(AuthContext)

    // antd按钮
    const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'
    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img
                        src={currentUser.profilePic}
                        alt=""
                    />
                    <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} />
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{ display: "none" }} />
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
                        <Button type="primary" size={size}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;