import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import style from "./Message.module.css";
type Props = {
  message: string;
  photo?: string;
  userName?: string;
  userId?: number;
};

export default function Message({ message, photo, userId, userName }: Props) {
  const avatar = photo ? (
    <Avatar shape="circle" size={50} src={<img src={photo} alt="avatar" />} />
  ) : (
    <Avatar shape="circle" size={50} icon={<UserOutlined />} />
  );

  return (
    <>
      <div className={style.wrapper}>
        <div>{avatar}</div>
        <p>
          {userName}: {message}
        </p>
      </div>
    </>
  );
}
