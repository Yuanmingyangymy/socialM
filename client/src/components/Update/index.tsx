import { useState, useContext } from 'react'

import "./index.scss"
import { message } from 'antd';

import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';

type UpdateProps = {
  setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>
  user: {
    id: number,
    username: string,
    email: string,
    profilePic?: string,
    coverPic?: string,
    city?: string,
    website?: string

  }
}
type TextType = {
  username: string;
  city: string;
  website: string;
};

const initialTextState: TextType = {
  username: '',
  city: '',
  website: '',
};

const Update: React.FC<UpdateProps> = ({ setOpenUpdate, user }) => {


  const [text, setText] = useState<TextType>(initialTextState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const [cover, setCover] = useState<File | null>({} as File)
  const [profile, setProfile] = useState<File | null>({} as File)

  // 添加图片
  const handleImageSelectProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfile(e.target.files[0] as File);
      message.success('添加图片成功');
    }
  }
  const handleImageSelectCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCover(e.target.files[0] as File);
      message.success('添加图片成功');
    }
  }

  const upload = async (file: any) => {
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

  const { currentUser, setCurrentUser } = useContext(AuthContext)

  const updateUserDetails = async () => {

    try {
      let coverUrl = currentUser.coverPic;
      let profileUrl = currentUser.profilePic;

      // 上传新的封面图片和头像图片（如果有的话）
      if (cover) {
        coverUrl = await upload(cover);
      }
      if (profile) {
        profileUrl = await upload(profile);
      }
      // 构建更新后的用户信息对象
      const updatedUser: any = {};
      if (text.username.trim() !== '') {
        updatedUser.username = text.username;
      }
      if (text.city.trim() !== '') {
        updatedUser.city = text.city;
      }
      if (text.website.trim() !== '') {
        updatedUser.website = text.website;
      }
      updatedUser.coverPic = coverUrl;
      updatedUser.profilePic = profileUrl;
      await makeRequest.put("/users", updatedUser).then(res => {
        
        if(res.status === 200) {
          message.success('更新成功')
          setCurrentUser(res.data[0])
          
          
        }
      })
      setOpenUpdate(false)
    } catch (error) {
      console.error(error);

    }

  }
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateUserDetails();
  }
  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={handleImageSelectCover}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={handleImageSelectProfile}
            />
          </div>
          <label>Name</label>
          <input
            type="text"
            value={text.username}
            name="username"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={text.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={text.website}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>

  )
}

export default Update