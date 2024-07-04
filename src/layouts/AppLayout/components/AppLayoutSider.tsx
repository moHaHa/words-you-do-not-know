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
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import React, { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AppLayoutSiderProps {}
const AppLayoutSider: FC<AppLayoutSiderProps> = ({}) => {
  const location = useLocation();

  const items = [
    {
      key: 'words-new',
      label: <Link to={'/words-new'}>Words New</Link>,
      icon: <FileAddOutlined></FileAddOutlined>,
    },
    {
      key: 'words-unmemorized',
      label: <Link to={'/words-unmemorized'}>Words Unmemorized</Link>,
      icon: <FireOutlined></FireOutlined>,
    },
    {
      key: 'words-memorized',
      label: <Link to={'/words-memorized'}>Words Memorized</Link>,
      icon: <BookOutlined></BookOutlined>,
    },
  ];
  const activeItem = useMemo(() => {
    const item = items.find((e) => location.pathname.includes(e.key));
    if (item != undefined) {
      return item.key;
    } else {
      return undefined;
    }
  }, [location, items]);

  return (
    <Sider
      style={{ borderInlineEnd: '1px dashed gray' }}
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      width={240}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[...(activeItem ? [activeItem] : [])]}
        items={items}
      />
    </Sider>
  );
};
export default AppLayoutSider;
