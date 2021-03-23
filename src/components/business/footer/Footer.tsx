import React, { ReactNode } from "react";
import { Layout, Typography } from "antd";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const {t} = useTranslation()
  return (
      <Layout.Footer style={{textAlign: "center"}}>
        {/*<Typography.Title level={5} style={{textAlign: "center"}}>*/}

        {t("footer.detail") as ReactNode }
        {/*</Typography.Title>*/}
      </Layout.Footer>
  );
}
