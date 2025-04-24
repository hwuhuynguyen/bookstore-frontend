import { Image, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import appLogo from "./../../assets/AppLogo.png";

function AppLogo() {
  return (
    <Link
      className={`select-none flex flex-row items-center justify-center out-line-orange-100 out-line-4`}
      to="/"
    >
      <Image radius="md" h={56} src={appLogo} />
      <Text style={{ fontFamily: "Fascinate Inline, system-ui", fontSize: "xx-large", color: "darkcyan" }}>
        BookRec
      </Text>
    </Link>
  );
}

export default AppLogo;
