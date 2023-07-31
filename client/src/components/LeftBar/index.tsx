import { useContext } from 'react'
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';



import './index.scss'

const LeftBar: React.FC = () => {

    const { currentUser } = useContext(AuthContext)

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <Link to={`/profile/${currentUser.id}`} style={{textDecoration: "none", color: "inherit"}}>
                        <div className="user">
                            <img src={"/upload/" + currentUser.profilePic}/>
                            <span>{currentUser.username}</span>
                        </div>
                    </Link>
                    
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/1.png?raw=true" alt="" />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/2.png?raw=true" alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/3.png?raw=true" alt="" />
                        <span>Marketplace</span>
                    </div>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/4.png?raw=true" alt="" />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/5.png?raw=true" alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your Shortcuts</span>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/6.png?raw=true" alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/7.png?raw=true" alt="" />
                        <span>Games</span>
                    </div>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/8.png?raw=true" alt="" />
                        <span>Photos</span>
                    </div>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/9.png?raw=true" alt="" />
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/10.png?raw=true" alt="" />
                        <span>Mails</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/11.png?raw=true" alt="" />
                        <span>Fundraiser</span>
                    </div>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/12.png?raw=true" alt="" />
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/13.png?raw=true" alt="" />
                        <span>Courses</span>
                    </div>
                </div>
                

            </div>
        </div>
    )
}
export default LeftBar