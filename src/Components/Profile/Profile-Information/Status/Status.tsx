import { Input } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../../../Redux-Toolkit/Redux-Toolkit-Store";
import { updateProfileStatusThunk } from "../../../../Redux-Toolkit/Profile-Reducer/Profile-thunk";

type Props = {
  status: string | undefined;
  isOwner: boolean;
};
export default function Status(props: Props) {
  const [isChanging, setIsChanging] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const dispatch = useAppDispatch();

  function changeStatus(e: React.ChangeEvent<HTMLInputElement>) {
    setUserStatus(e.target.value);
  }
  function offChanging() {
    dispatch(updateProfileStatusThunk(userStatus));
    setIsChanging(false);
  }
  function openChanging() {
    setIsChanging(true);
  }
  return (
    <>
      {props.isOwner ? (
        <>
          {isChanging ? (
            <Input
              onChange={changeStatus}
              onBlur={offChanging}
              value={userStatus}
            />
          ) : (
            <div onDoubleClick={openChanging}>
              {userStatus.length ? userStatus : props.status}
            </div>
          )}
        </>
      ) : (
        <div>{userStatus.length ? userStatus : props.status} </div>
      )}
    </>
  );
}
