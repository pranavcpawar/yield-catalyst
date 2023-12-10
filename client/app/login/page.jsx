"use client";
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";
import Link from "next/link";

export default function LogIn() {
  const customDarkTheme = darkTheme({
    colors: {
      primaryText: "#000000",
      secondaryText: "#181818",
      dropdownBg: "#FFAFCC",
      primaryButtonText: "#000000",
      secondaryButtonText: "#000000",
    }
  })

  return (
    <div className="min-h-screen grid place-content-center bg-[#B8E0D2]">
      <ConnectWallet theme={customDarkTheme} className="connect_button" dropdownPosition={{side:"left", align:"center"}} />
    </div>
  );
};