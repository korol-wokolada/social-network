import { Avatar, Button, Pagination } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from "./users.module.css";

import { useAppDispatch, useAppSelector } from "../../store/store";

import {
  followUserThunk,
  getUsersThunk,
  unfollowUserThunk,
} from "../../store/usersSlise/userThunk";

import { setCurrentPage } from "../../store/usersSlise/userSlice";

function UserPage() {
  const dispatch = useAppDispatch();

  const { users, totalUsersCount, pageSize, currentPage, followingProgress } =
    useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersThunk({ currentPage, pageSize }));
  }, [currentPage, dispatch, pageSize, followingProgress]);

  const follow = (userId: number) => {
    dispatch(followUserThunk(userId));
  };

  const unfollow = (userId: number) => {
    dispatch(unfollowUserThunk(userId));
  };

  return (
    <div className={style.wrapper}>
      <Pagination
        defaultCurrent={1}
        total={totalUsersCount}
        defaultPageSize={7}
        responsive={true}
        showSizeChanger={false}
        showQuickJumper={true}
        current={currentPage}
        onChange={(page) => {
          dispatch(setCurrentPage(page));
        }}
      />

      <div className={style.usersWrapper}>
        {users &&
          users.map((user) => (
            <div key={user.id}>
              <div className={style.flex}>
                <div className={style.avatarWithButton}>
                  <NavLink to={"/profile/" + user.id}>
                    {user.photos.small ? (
                      <Avatar
                        shape="square"
                        size={40}
                        src={<img src={user.photos.small} alt="avatar" />}
                      />
                    ) : (
                      <Avatar
                        shape="square"
                        size={40}
                        icon={<UserOutlined />}
                      />
                    )}
                  </NavLink>

                  {user.followed ? (
                    <Button
                      size={"small"}
                      onClick={() => {
                        unfollow(user.id);
                      }}>
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      size={"small"}
                      onClick={() => {
                        follow(user.id);
                      }}>
                      Follow
                    </Button>
                  )}
                </div>

                <div>
                  <div>{user.name}</div>
                  <div>{user.status}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserPage;
