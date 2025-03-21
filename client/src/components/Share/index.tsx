import "./index.scss";
import { useContext, useState, MouseEvent } from "react";
import { AuthContext } from "../../context/authContext";
import { Button } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
// import { useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { message } from "antd";
import Posts from "../Posts";

const Share: React.FC = () => {
  const [size] = useState<SizeType>("middle"); // default is 'middle'

  // 上传图片，写描述
  const [file, setFile] = useState<File | null>(null);
  const [desc, setDesc] = useState<string>("");

  // const upload = async () => {
  //     try {
  //         const formData = new FormData()
  //         if (file) {
  //             formData.append("file", file)
  //             const res = await makeRequest.post("/upload", formData)
  //             if (res.status === 200) {
  //                 message.success('添加图片成功')
  //             } else {
  //                 message.error('添加图片失败')
  //             }

  //             return res.data

  //         }
  //     } catch (error) {
  //         console.log(error);

  //     }
  // }

  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  // 添加图片
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0] as File);
      message.success("添加图片成功");
    }
  };

  const [refreshPosts, setRefreshPosts] = useState(false);

  const handleShare = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // let imgUrl = ""
    // if (file) imgUrl = await upload()
    try {
      let postData: any = { desc };
      // postData.userPic = currentUser.profilePic
      if (file) {
        // 如果用户上传了图片，则调用上传图片接口，并将返回的文件名保存在 postData.img 中
        const formData = new FormData();
        formData.append("file", file);
        const response = await makeRequest.post("/upload", formData);

        if (response.status === 200) {
          message.success("添加图片成功");
          postData.img = response.data;
          // 图片上传成功后再发布帖子
          const postResponse = await makeRequest.post("/posts", postData);
          console.log(postResponse);

          if (postResponse.status === 200) {
            message.success("发布成功");
            // 发布成功后更新帖子数据的上下文
            setDesc("");
            setFile(null);
            setRefreshPosts(!refreshPosts);
          } else if (postResponse.status === 401) {
            message.error("未登录！");
          } else if (postResponse.status === 403) {
            message.error("用户登录已过期，请重新登录");
          }
        } else {
          message.error("添加图片失败");
        }
        // imgUrl = response.data;
      } else {
        const response = await makeRequest.post("/posts", postData);

        if (response.status === 200) {
          message.success("发布成功");
          // 发布成功后更新帖子数据的上下文
          // fetchPosts()
          setDesc("");
          setFile(null);
          setRefreshPosts(!refreshPosts);
        } else if (response.status === 401) {
          message.error("未登录！");
        } else if (response.status === 403) {
          message.error("用户登录已过期，请重新登录");
        }
      }
    } catch (error) {
      console.error(error);
      message.error("发布失败，请稍后重试。");
    }
  };
  // const fetchPosts = async () => {
  //     try {
  //       const response = await makeRequest.get("/posts?userId=" + currentUser.id);
  //       setPosts(response.data); // 更新帖子数据的上下文
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <>
      <div className="share">
        <div className="container">
          <div className="top">
            <img
              src={
                currentUser.profilePic
                  ? "/upload/" + currentUser.profilePic
                  : "/assets/user.jpg"
              }
              alt=""
            />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.username}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <hr />
          <div className="bottom">
            <div className="left">
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleImageSelect}
              />
              <label htmlFor="file">
                <div className="item">
                  <img
                    src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/img.png?raw=true"
                    alt=""
                  />
                  <span>Add Image</span>
                </div>
              </label>
              {/* <div className="item">
                                <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/map.png?raw=true" alt="" />
                                <span>Add Place</span>
                            </div>
                            <div className="item">
                                <img src="https://github.com/safak/youtube2022/blob/react-social-ui/src/assets/friend.png?raw=true" alt="" />
                                <span>Tag Friends</span>
                            </div> */}
            </div>
            <div className="right">
              <Button type="primary" size={size} onClick={handleShare}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Posts refresh={refreshPosts} setRefresh={setRefreshPosts} />
    </>
  );
};

export default Share;
