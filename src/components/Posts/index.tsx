
import Post from '../Post';

import './index.scss'


export const Posts: React.FC = () => {

    const posts = [
        {
            id: 1,
            name: "yyyymy",
            userId: 1,
            profilePic: "https://images.unsplash.com/photo-1688649103581-efd21a8672e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTA4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60",
            desc: "Have a nice day!",
            img: "https://plus.unsplash.com/premium_photo-1682401101581-b6be0396b706?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
        },
        {
            id: 2,
            name: "yyyymy",
            userId: 2,
            profilePic: "https://images.unsplash.com/photo-1688649103581-efd21a8672e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTA4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60",
            desc: "Hello world!!!"

        }
    ]


    return (
        <div className="posts">
            {posts.map(post => (
                <Post key={post.id} post={post}/> 
            ))}
        </div>
    )
}

export default Posts