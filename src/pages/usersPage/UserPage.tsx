import { Avatar, Button, Pagination } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { NavLink } from "react-router-dom";
import style from "./users.module.css";

import { useAppDispatch, useAppSelector } from "../../store/store";

import { setCurrentPage } from "../../store/usersSlise/userSlice";
import {
  useFollowUserRequestMutation,
  useGetUsersRequestQuery,
  useUnFollowUserRequestMutation,
} from "../../store/usersSlise/userServises";
import { UsersType } from "../../store/usersSlise/types";

function UserPage() {
  const dispatch = useAppDispatch();

  const { pageSize, currentPage } = useAppSelector((state) => state.users);

  const { data, error } = useGetUsersRequestQuery({
    currentPage,
    pageSize,
  });

  const [follow, followInfomation] = useFollowUserRequestMutation();
  const [unFollow, unFollowInformation] = useUnFollowUserRequestMutation();

  return (
    <div className={style.wrapper}>
      <Pagination
        defaultCurrent={1}
        total={data?.totalCount}
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
        {data?.items &&
          data?.items.map((user: UsersType) => (
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
                      disabled={unFollowInformation.isLoading}
                      onClick={async () => {
                        await unFollow(user.id);
                      }}>
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      size={"small"}
                      disabled={followInfomation.isLoading}
                      onClick={async () => {
                        await follow(user.id);
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
