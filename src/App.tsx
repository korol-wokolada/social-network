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

import { NavLink } from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/loginPage/LoginPage";

import ProfilePage from "./pages/profilePage/ProfilePage";
import UserPage from "./pages/usersPage/UserPage";
import MessagesPage from "./pages/messagesPage/MessagesPage";
import NewsPage from "./pages/newsPage/News";
import SettingPage from "./pages/settingsPage/SettingPage";
import { RootState, useAppDispatch, useAppSelector } from "./store/store";
import { userAuthThunk } from "./store/authSlice/authThunk";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isAuth, userId } = useAppSelector((state: RootState) => state.auth);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    dispatch(userAuthThunk());
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
                  <Route path="/Profile/:userID?" element={<ProfilePage />} />
                  <Route path="/Messages/*" element={<MessagesPage />} />
                  <Route path="/News/*" element={<NewsPage />} />
                  <Route path="/Users/*" element={<UserPage />} />
                  <Route path="/Settings/*" element={<SettingPage />} />
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
