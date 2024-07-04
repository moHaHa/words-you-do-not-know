import {
  BookOutlined,
  FileAddOutlined,
  FireOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { FC } from 'react';

interface AppLayoutSiderProps {}
const AppLayoutSider: FC<AppLayoutSiderProps> = ({}) => {
  const items = [
    {
      key: 'words-new',
      label: 'Words New',
      icon: <FileAddOutlined></FileAddOutlined>,
    },
    {
      key: 'words-unmemorized',
      label: 'Words Unmemorized',
      icon: <FireOutlined></FireOutlined>,
    },
    {
      key: 'words-memorized',
      label: 'Words Memorized',
      icon: <BookOutlined></BookOutlined>,
    },
  ];
  return (
    <Sider
      style={{ borderInlineEnd: '1px dashed gray' }}
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      width={240}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={items}
      />
    </Sider>
  );
};
export default AppLayoutSider;
