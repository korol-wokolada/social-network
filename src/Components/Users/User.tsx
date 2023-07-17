import { Avatar, Button, Pagination } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  useAppDispatch,
  useAppSelector,
} from "../../Redux-Toolkit/Redux-Toolkit-Store";
import { useEffect } from "react";
import {
  followUserThunk,
  getUsersThunk,
  unfollowUserThunk,
} from "../../Redux-Toolkit/Users-Reducer/Users-thunk";
import { NavLink } from "react-router-dom";
import style from "./users.module.css";

export default function User() {
  const {
    users,
    totalUsersCount,
    pageSize,
    currentPage,
    isFetching,
    followingProgress,
  } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

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
        defaultPageSize={10}
        responsive={true}
        showSizeChanger={false}
        showQuickJumper={true}
        current={currentPage}
        onChange={(page, pageSize) => {
          dispatch(getUsersThunk({ currentPage: page, pageSize }));
        }}
      />

      <div className={style.usersWrapper}>
        {users
          ? users.map((user) => (
              <div key={user.id}>
                <div className={style.flex}>
                  <span>
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
                          disabled={followingProgress.some(
                            (id) => id === user.id
                          )}
                          onClick={() => {
                            unfollow(user.id);
                            console.log("onClick" + user.id);
                          }}>
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          size={"small"}
                          disabled={followingProgress.some(
                            (id) => id === user.id
                          )}
                          onClick={() => {
                            follow(user.id);
                            console.log("onClick" + user.id);
                          }}>
                          Follow
                        </Button>
                      )}
                    </div>
                  </span>
                  <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
