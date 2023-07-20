import React from 'react'
import { Card, List } from 'antd';

import './index.css'

const MainContent: React.FC = () => {

    // 视频播放器
    interface VideoBoxProps {
        src: string;
    }
    
    function VideoBox( {src} : VideoBoxProps) {
        console.log(src);
        
        return (
            <div className="video-box">
                
                <video src={src} controls />
            </div>
    );
    }

    // 提示直播数据
    const data = [
        {
          title: 'Title 1',
        },
        {
          title: 'Title 2',
        },
        {
          title: 'Title 3',
        },
      ];
    return (
        <>
            {/* 主页面直播部分 */}
            <VideoBox src='http://localhost:3000/static/media/cblock.2510854a93b7f4758328.mp4'></VideoBox>
            {/* 提示直播（5个？） */}
            <List
                className='list'
                grid={{ gutter: 12, column: 3 }}
                dataSource={data}
                renderItem={(item) => (
                <List.Item>
                    <Card title={item.title} className='card'>Card content</Card>
                </List.Item>
                )}
            />
        </>
    )
}

export default MainContent

