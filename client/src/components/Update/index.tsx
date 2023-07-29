import { useState } from 'react'

import "./index.scss"

import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { makeRequest } from '../../axios';

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

const Update: React.FC<UpdateProps> = ({ setOpenUpdate, user }) => {

    // antd按钮
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'

    type textType = {
        username: string,
        city: string,
        website: string
    }
    const [text, setText] = useState<textType>({
        username: '',
        city: '',
        website: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    const [cover, setCover] = useState<File | null>({} as File)
    const [profile, setProfile] = useState<File | null>({} as File)

    const upload = async (file:any) => {
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


    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let coverUrl = cover ? await upload(cover) : user.coverPic
        let profileUrl = cover ? await upload(profile) :  user.profilePic
        
        try {
            makeRequest.put("/users", {...text, coverPic: coverUrl, profilePic: profileUrl})
            setOpenUpdate(false)
        } catch (error) {
            console.error(error);

        }

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
              onChange={(e) => setCover(e.target.files && e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files && e.target.files[0])}
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