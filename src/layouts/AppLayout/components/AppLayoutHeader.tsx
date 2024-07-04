import { theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { FC } from 'react';
interface AppLayoutHeaderProps {}
const AppLayoutHeader: FC<AppLayoutHeaderProps> = ({}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          background: colorBgContainer,
          borderBottom: '1px dashed gray',
        }}
      >
        <div
          style={{
            display: 'flex',
            paddingInline: '30px',
            alignContent: 'center',
          }}
        >
          <div
            style={{
              paddingInline: '10px',
              paddingBlock: '6px',
              borderRadius: '4px',
              border: '1px  dashed gray',
              lineHeight: '18px',
            }}
          >
            Logo
          </div>
        </div>
      </Header>
    </>
  );
};
export default AppLayoutHeader;
