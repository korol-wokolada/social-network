import {
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
  MediumOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Messages from "./Components/Messages/Messages";
import News from "./Components/News/News";
import User from "./Components/Users/User";
import Setting from "./Components/Settings/Setting";
import { NavLink } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "./Redux-Toolkit/Redux-Toolkit-Store";
import { authThunk } from "./Redux-Toolkit/Auth-Reducer/Auth-slice";
import "./App.css";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const { isAuth, userId } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    dispatch(authThunk());
  }, [dispatch]);

  if (!isAuth) {
    return (
      <div className="spin-wrapper">
        <Spin />
      </div>
    );
  } else
    return (
      <>
        {!userId ? (
          <LoginPage />
        ) : (
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="demo-logo-vertical" />

              <Menu
                theme="dark"
                mode={"inline"}
                defaultSelectedKeys={["Profile"]}
                items={[
                  {
                    key: "Profile",
                    icon: <UserOutlined />,
                    label: <NavLink to="/Profile/*">Profile</NavLink>,
                  },
                  {
                    key: "Messages",
                    icon: <MailOutlined />,
                    label: <NavLink to="/Messages/">Messages</NavLink>,
                  },
                  {
                    key: "News",
                    icon: <MediumOutlined />,
                    label: <NavLink to="/News/">News</NavLink>,
                  },
                  {
                    key: "Users",
                    icon: <TeamOutlined />,
                    label: <NavLink to="/Users/">Users</NavLink>,
                  },
                  {
                    key: "Settings",
                    icon: <UnorderedListOutlined />,
                    label: <NavLink to="/Settings/">Settings</NavLink>,
                  },
                ]}
              />
            </Sider>
            <Layout>
              <Header style={{ padding: 0, background: colorBgContainer }}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Header>
              <Content
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  height: 600,
                  background: colorBgContainer,
                }}>
                <Routes>
                  <Route path="/Profile/:userID?" element={<Profile />} />
                  <Route path="/Messages/*" element={<Messages />} />
                  <Route path="/News/*" element={<News />} />
                  <Route path="/Users/*" element={<User />} />
                  <Route path="/Settings/*" element={<Setting />} />
                  <Route path="/Login/*" element={<LoginPage />} />
                  <Route path="*" element={<div>404 NOT FOUND</div>} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        )}
      </>
    );
};

export default App;
