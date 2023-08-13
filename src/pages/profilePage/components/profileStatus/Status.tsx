import { Input } from "antd";
import { useState } from "react";

import { useUpdateStatusRequestMutation } from "../../../../store/profileSlice/profileServises";

type Props = {
  status: string | undefined;
  isOwner: boolean;
};
export default function Status(props: Props) {
  const [isChanging, setIsChanging] = useState(false);

  const [userStatus, setUserStatus] = useState("");

  const [setNewStatus] = useUpdateStatusRequestMutation();

  function changeStatus(e: React.ChangeEvent<HTMLInputElement>) {
    setUserStatus(e.target.value);
  }

  function offChanging() {
    setNewStatus({ status: userStatus });
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
