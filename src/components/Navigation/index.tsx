import React, { useState } from 'react';
import { AppstoreOutlined, HomeOutlined, CommentOutlined, AudioOutlined, UserOutlined, SearchOutlined,VideoCameraAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Input, Space, Avatar } from 'antd';

import './index.css';

// 菜单数据
const items: MenuProps['items'] = [
  {
    label: '首页',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: '分类',
    key: 'sort',
    icon: <AppstoreOutlined />,
    disabled: true,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        动态
      </a>
    ),
    key: 'chat',
    icon: <CommentOutlined />
  },
];
// 搜索框部分
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const onSearch = (value: string) => console.log(value);



const Navigation: React.FC = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };


  return (
    <div className='main'>
      {/* logo */}
      <div className='logo'></div>
      {/* 导航栏 */}
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='Navi'/>

      {/* 搜索框 */}
      <input type="text" className='MyInput'/>
      <SearchOutlined className='search'/>

      {/* 开播 */}
      <VideoCameraAddOutlined className='startLive'/>
      <span className='start'>开播</span>

      {/* 个人中心 */}
      <Avatar size="large" icon={<UserOutlined />} className='User'/>
    </div>
  )
};

export default Navigation;
