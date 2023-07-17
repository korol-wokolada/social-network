import style from "./ProfileAvatar.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Spin } from "antd";
type Props = {
  photo: string | null | undefined;
  isPhotoLoading: boolean;
  onMainPhotoSelected: (e: any) => void;
  isOwner: boolean;
};

export default function ProfileAvatar({
  photo,
  isPhotoLoading,
  onMainPhotoSelected,
  isOwner,
}: Props) {
  const avatar = photo ? (
    <Avatar shape="square" size={100} src={<img src={photo} alt="avatar" />} />
  ) : (
    <Avatar shape="square" size={100} icon={<UserOutlined />} />
  );

  return (
    <div className={style.avatarForm}>
      {isPhotoLoading ? <Spin /> : avatar}
      {isOwner ? (
        <>
          <input
            type={"file"}
            accept=".jpeg,.png"
            onChange={onMainPhotoSelected}
            id="input_file"
            className={style.input}
          />
          <label htmlFor="input_file" className={style.inputLabel}>
            Изменить
          </label>
        </>
      ) : null}
    </div>
  );
}
