import { ContactsType } from "../../../../Redux-Toolkit/Profile-Reducer/Profile-Reducer";
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Typography } from "antd";

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

// const items: MenuProps["items"] = [
//   {
//     key: "1",
//     label: "Item 1",
//   },
//   {
//     key: "2",
//     label: "Item 2",
//   },
//   {
//     key: "3",
//     label: "Item 3",
//   },
// ];

// const array = Object.entries(contacts as ContactsType)
// .filter(([__, socialInf]) => {
//   return socialInf !== null;
// })
// .map(([social, socialInf]) => {
//   return (
//     <li className="li" key={social}>
//       {social}:{socialInf}
//     </li>
//   );
// });

// return (
// <div>
//   <ul>{array}</ul>
// </div>
// );
