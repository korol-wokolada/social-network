import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Typography } from "antd";
import { ContactsType } from "../../store/profileSlice/types";

type Props = {
  contacts: ContactsType | null | undefined;
};

export default function Contacts({ contacts }: Props) {
  if (contacts === null || contacts === undefined) {
    return <div>add your contacts</div>;
  }

  const items: MenuProps["items"] = Object.entries(contacts as ContactsType)
    .filter(([__, socialInf]) => {
      return socialInf !== null;
    })
    .map(([social, socialInf]) => {
      return {
        key: social,
        label: <a href={socialInf}>{social}</a>,
      };
    });

  return (
    <>
      <Dropdown
        menu={{
          items,
          selectable: true,
        }}>
        <Typography.Link>
          <Space>
            Contacts
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </>
  );
}
