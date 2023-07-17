import style from "./ProfileInformation.module.css";
import { useEffect } from "react";

import Contacts from "./Contacts/Contacts";

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../Redux-Toolkit/Redux-Toolkit-Store";
import {
  getProfileInformationThunk,
  getProfileStatusThunk,
  saveProfilePhotoThunk,
} from "../../../Redux-Toolkit/Profile-Reducer/Profile-thunk";
import { Descriptions, Spin } from "antd";
import Status from "./Status/Status";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import { useLocation } from "react-router-dom";

export default function ProfileInformation() {
  let location = useLocation();
  const userID = location.pathname.split("/")[2];

  // const { userID } = props.router.params;
  const userId = useAppSelector((state) => state.auth.userId);
  const { profile, postsData, status, isProfileLoading, isPhotoLoading } =
    useAppSelector((state: RootState) => state.profile);
  const photo = useAppSelector(
    (state: RootState) => state.profile.profile?.photos?.small
  );

  const dispatch = useAppDispatch();

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
