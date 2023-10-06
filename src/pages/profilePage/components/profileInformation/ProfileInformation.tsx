import style from "./ProfileInformation.module.css";

import Contacts from "../../../../components/contacts/Contacts";
import { Descriptions, Spin } from "antd";
import Status from "../profileStatus/Status";
import ProfileAvatar from "../profileAvatar/ProfileAvatar";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../store/store";

import {
  useGetStatusRequestQuery,
  useGetUserProfileRequestQuery,
  useSavePhotoFileRequestMutation,
} from "../../../../store/profileSlice/profileServises";

export default function ProfileInformation() {
  let location = useLocation();

  const userID = location.pathname.split("/")[2];

  // const { userID } = props.router.params;
  const userId = useAppSelector((state) => state.auth.userId);

  let newUserId = Number(userID);

  if (!newUserId) {
    newUserId = userId as number;
  }

  const { data, isLoading } = useGetUserProfileRequestQuery(newUserId);

  const statusInformation = useGetStatusRequestQuery(newUserId);

  const [uploadPhoto, photo] = useSavePhotoFileRequestMutation();

  const onMainPhotoSelected = (e: any): void => {
    const file = e.target.files[0];

    uploadPhoto(file);
  };

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <div className={style.wrapper}>
          <ProfileAvatar
            isOwner={userId === newUserId}
            photo={data?.photos.small}
            isPhotoLoading={photo.isLoading}
            onMainPhotoSelected={onMainPhotoSelected}
          />

          <div>
            <Descriptions title={data?.fullName}>
              <Descriptions.Item label="Status">
                <Status
                  status={statusInformation.data}
                  isOwner={userId === newUserId}
                />
              </Descriptions.Item>

              <Descriptions.Item label="About me">
                {data?.aboutMe}
              </Descriptions.Item>

              <Descriptions.Item label="Lookin for a job">
                {data?.lookingForAJob ? "yes" : "no"}
              </Descriptions.Item>
              <Descriptions.Item label="Lookin for a job description">
                {data?.lookingForAJobDescription}
              </Descriptions.Item>

              <Descriptions.Item label="Contacts">
                <Contacts contacts={data?.contacts} />
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      )}
    </>
  );
}
