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
                            <img src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "/assets/user.jpg"}/>
                            <span>{currentUser.username}</span>
                        </div>
                    </Link>
                    
                    <div className="item">
                        <Link to='/all' style={{textDecoration: "none", color: "inherit"}}>
                            <img src="/assets/1.png" alt="" />
                            <span className='check'>Everything</span>
                        </Link>

                    </div>
                    <div className="item">
                        <img src="/assets/2.png" alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src="/assets/3.png" alt="" />
                        <span>Marketplace</span>
                    </div>
                    <div className="item">
                        <img src="/assets/4.png" alt="" />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src="/assets/5.png" alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your Shortcuts</span>
                    <div className="item">
                        <img src="/assets/6.png" alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src="/assets/7.png" alt="" />
                        <span>Games</span>
                    </div>
                    <div className="item">
                        <img src="/assets/8.png" alt="" />
                        <span>Photos</span>
                    </div>
                    <div className="item">
                        <img src="/assets/9.png" alt="" />
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <img src="/assets/10.png" alt="" />
                        <span>Mails</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src="/assets/11.png" alt="" />
                        <span>Fundraiser</span>
                    </div>
                    <div className="item">
                        <img src="/assets/12.png" alt="" />
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src="/assets/13.png" alt="" />
                        <span>Courses</span>
                    </div>
                </div>
                

            </div>
        </div>
    )
}
export default LeftBar