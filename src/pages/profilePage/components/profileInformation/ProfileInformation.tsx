import style from "./ProfileInformation.module.css";
import { useEffect } from "react";

import Contacts from "../../../../components/contacts/Contacts";
import { Descriptions, Spin } from "antd";
import Status from "../profileStatus/Status";
import ProfileAvatar from "../profileAvatar/ProfileAvatar";
import { useLocation } from "react-router-dom";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../../store/store";
import {
  getProfileInformationThunk,
  getProfileStatusThunk,
  saveProfilePhotoThunk,
} from "../../../../store/profileSlice/profileThunk";

export default function ProfileInformation() {
  const dispatch = useAppDispatch();

  let location = useLocation();

  const userID = location.pathname.split("/")[2];

  const { profile, status, isProfileLoading, isPhotoLoading } = useAppSelector(
    (state: RootState) => state.profile
  );

  const photo = useAppSelector(
    (state: RootState) => state.profile.profile?.photos?.small
  );

  // const { userID } = props.router.params;
  const userId = useAppSelector((state) => state.auth.userId);

  let newUserId = Number(userID);

  if (!newUserId) {
    newUserId = userId as number;
  }

  useEffect(() => {
    dispatch(getProfileInformationThunk(newUserId));
    dispatch(getProfileStatusThunk(newUserId));
  }, [dispatch, newUserId, photo, userID, userId]);

  const onMainPhotoSelected = (e: any) => {
    const file = e.target.files[0];

    if (e.target.files.length) {
      dispatch(saveProfilePhotoThunk(file));
    }
  };

  return (
    <>
      {isProfileLoading ? (
        <Spin />
      ) : (
        <div className={style.wrapper}>
          <ProfileAvatar
            isOwner={userId === newUserId}
            photo={photo}
            isPhotoLoading={isPhotoLoading}
            onMainPhotoSelected={onMainPhotoSelected}
          />

          <div>
            <Descriptions title={profile?.fullName}>
              <Descriptions.Item label="Status">
                <Status status={status} isOwner={userId === newUserId} />
              </Descriptions.Item>

              <Descriptions.Item label="About me">
                {profile?.aboutMe}
              </Descriptions.Item>
              <Descriptions.Item label="Lookin for a job">
                {profile?.lookingForAJob ? "yes" : "no"}
              </Descriptions.Item>
              <Descriptions.Item label="Contacts">
                <Contacts contacts={profile?.contacts} />
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      )}
    </>
  );
}
