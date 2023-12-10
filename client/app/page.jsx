"use client";
import {
	ConnectWallet,
	darkTheme,
	useConnectionStatus,
} from "@thirdweb-dev/react";

import LogIn from "./login/page";
import { useEffect, useState } from "react";
import Trove from "@/components/Trove";

export default function Home() {
	const [eth, setEth] = useState(0);
	const [lusd, setLusd] = useState(0);

	useEffect(() => {
		(async () => {
			const res = await fetch(
				"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
			);

			const items = (await res.text())
				.replace('{"ethereum":{"usd":', "")
				.replace("}}", "");
			const eth = parseFloat(items);
			setEth(eth);
			console.log("ethereum", eth);
		})();
	}, []);
	useEffect(() => {
		// set time
		(async () => {
			const res = await fetch(
				"https://api.coingecko.com/api/v3/simple/price?ids=liquity-usd&vs_currencies=usd"
			);

			const items = (await res.text())
				.replace('{"liquity-usd":{"usd":', "")
				.replace("}}", "");
			const lusd = parseFloat(items);
			setLusd(lusd);
			console.log("lusd", lusd);
		})();
	}, []);
	const connectionStatus = useConnectionStatus();
	const isAuthenticated = connectionStatus === "connected" ? true : false;
	const customDarkTheme = darkTheme({
		colors: {
			primaryText: "#000000",
			secondaryText: "#181818",
			dropdownBg: "#CDB4DB",
			primaryButtonText: "#000000",
			secondaryButtonText: "#000000",
		},
	});
	const data = [
		{ column1: "Borrowing Fee", column2: "0.56%" },
		{ column1: "TVL", column2: "337K ETH ($792M)" },
		{ column1: "Troves", column2: "898" },
	];

	if (!isAuthenticated) return <LogIn />;

	return (
		<main className="flex fixed w-full gap-10 min-h-screen flex-row bg-[#B8E0D2] p-10">
			<Trove eth_price={eth} lusd_price={lusd} />
			<div className="flex-col flex-1 place-content-center mx-auto hidden space-y-8 sm:flex">
				<div className="flex flex-row space-x-5 items-center justify-center">
					<ConnectWallet
						theme={customDarkTheme}
						className="connect_button"
						dropdownPosition={{ side: "left", align: "center" }}
					/>
					<div className="md:flex h-[64px] hidden bg-[#CDB4DB] border-2 border-black place-content-center shadow-[4px_4px_black] p-4">
						<h2 className="text-black text-md font-semibold">{eth / lusd}</h2>
					</div>
				</div>
				<div className="flex flex-1 bg-[#CDB4DB] border-2 border-black place-content-center shadow-[4px_4px_black]">
					<h2 className="text-black text-xl font-semibold">Protocol Stats</h2>
				</div>
				<div className="flex h-[120px] sm:hidden md:hidden bg-[#CDB4DB] border-2 border-black place-content-center shadow-[4px_4px_black]">
					<h2 className="text-black text-xl font-semibold">{eth / lusd}</h2>
				</div>
			</div>
		</main>
	);
}
