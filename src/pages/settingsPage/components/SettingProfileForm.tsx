import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Checkbox, Button } from "antd";
import style from "./settingProfielForm.module.css";
import { useSetProfileSettingsRequestMutation } from "../../../store/profileSlice/profileServises";

export type IfromInput = {
  aboutMe: string | undefined;
  github: string | undefined;
  vk: string | undefined;
  facebook: string | undefined;
  instagram: string | undefined;
  twitter: string | undefined;
  fullName: string | undefined;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
};

export default function SettingProfileForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IfromInput>();

  console.log(isSubmitSuccessful);
  const [putProfileChanges, { isLoading }] =
    useSetProfileSettingsRequestMutation();

  const onSubmit = (data: IfromInput) => {
    putProfileChanges(data);
  };

  return (
    <>
      <p>Profile settings</p>

      <div className={style.formOverflow}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.formLayout}>
          <label>About me</label>
          <Controller
            render={({ field }) => (
              <Input
                status={errors.aboutMe ? "error" : ""}
                {...field}
                className="antdInput"
              />
            )}
            name="aboutMe"
            control={control}
            rules={{
              maxLength: {
                value: 30,
                message: "напиши кратко о себе",
              },
            }}
          />
          {errors.aboutMe && (
            <p className={style.errors}>{errors.aboutMe.message}</p>
          )}

          <label>Git Hub</label>
          <Controller
            render={({ field }) => (
              <Input
                status={errors.github ? "error" : ""}
                {...field}
                className="antdInput"
              />
            )}
            name="github"
            control={control}
            rules={{
              pattern: {
                value:
                  /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([a-zA-Z0-9+._-]*)\/?([^\s]*)$/,
                message: "Некорректный формат ссылки",
              },
            }}
          />
          {errors.github && (
            <p className={style.errors}>{errors.github.message}</p>
          )}

          <label>Vk</label>
          <Controller
            render={({ field }) => (
              <Input
                status={errors.vk ? "error" : ""}
                {...field}
                className="antdInput"
              />
            )}
            name="vk"
            control={control}
            rules={{
              pattern: {
                value:
                  /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([a-zA-Z0-9+._-]*)\/?([^\s]*)$/,
                message: "Некорректный формат ссылки",
              },
            }}
          />
          {errors.vk && <p className={style.errors}>{errors.vk.message}</p>}

          <label>Facebook</label>
          <Controller
            render={({ field }) => (
              <Input
                status={errors.facebook ? "error" : ""}
                {...field}
                className="antdInput"
              />
            )}
            name="facebook"
            control={control}
            rules={{
              pattern: {
                value:
                  /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([a-zA-Z0-9+._-]*)\/?([^\s]*)$/,
                message: "Некорректный формат ссылки",
              },
            }}
          />
          {errors.facebook && (
            <p className={style.errors}>{errors.facebook.message}</p>
          )}

          <label>Instagram</label>
          <Controller
            render={({ field }) => (
              <Input
                status={errors.instagram ? "error" : ""}
                {...field}
                className="antdInput"
              />
            )}
            name="instagram"
            control={control}
            rules={{
              pattern: {
                value:
                  /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([a-zA-Z0-9+._-]*)\/?([^\s]*)$/,
                message: "Некорректный формат ссылки",
              },
            }}
          />
          {errors.instagram && (
            <p className={style.errors}>{errors.instagram.message}</p>
          )}

          <label>Twitter</label>
          <Controller
            render={({ field }) => (
              <Input
                status={errors.twitter ? "error" : ""}
                {...field}
                className="antdInput"
              />
            )}
            name="twitter"
            control={control}
            rules={{
              pattern: {
                value:
                  /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}([a-zA-Z0-9+._-]*)\/?([^\s]*)$/,
                message: "Некорректный формат ссылки",
              },
            }}
          />
          {errors.twitter && (
            <p className={style.errors}>{errors.twitter.message}</p>
          )}

          <label>Full Name</label>
          <Controller
            render={({ field }) => (
              <Input
                status={errors.fullName ? "error" : ""}
                {...field}
                className="antdInput"
              />
            )}
            name="fullName"
            control={control}
            rules={{
              maxLength: {
                value: 15,
                message: "превышена возможная длина",
              },
              required: { value: true, message: " заполни обязательно" },
            }}
          />
          {errors.fullName && (
            <p className={style.errors}>{errors.fullName.message}</p>
          )}

          <label>Looking for a job</label>
          <Controller
            name="lookingForAJob"
            control={control}
            defaultValue={false}
            render={({ field }) => <Checkbox {...field} />}
          />

          <label>Looking for a job description</label>
          <Controller
            render={({ field }) => (
              <Input
                status={errors.lookingForAJobDescription ? "error" : ""}
                {...field}
                className="antdInput"
              />
            )}
            name="lookingForAJobDescription"
            control={control}
            rules={{
              required: { value: true, message: " заполни обязательно" },
            }}
          />
          {errors.lookingForAJobDescription && (
            <p className={style.errors}>
              {errors.lookingForAJobDescription.message}
            </p>
          )}

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isSubmitSuccessful}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
