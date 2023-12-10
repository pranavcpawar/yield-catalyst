import axios from "axios";
import { getUsers } from "./firebase-functions";

export const startEthPoller = () => {
  checkEthValue();
  //   setInterval(checkEthValue, 10000);
};

export const getEthValue = async () => {
  const response = await axios.get(
    "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
  );
  const rates = response.data.data.rates;
  // return +rates["USDT"];
  return 1000;
};

export const getLusdValue = async () => {
  const response = await axios.get(
    "https://api.coinbase.com/v2/exchange-rates?currency=LUSD"
  );
  const rates = response.data.data.rates;
  return +rates["LUSD"];
};

const checkEthValue = async () => {
  const ethValue = await getEthValue();
  checkUsersForTransaction(ethValue);
};

const checkUsersForTransaction = async (currentEthCost) => {
  const users = await getUsers();

  users.docs.forEach((user) => {
    const userMetadata = user.get("metadata");
    const {
      currentETH,
      initialETH,
      tapInThreshold,
      ethCost,
      collateralBuyBackThreshold,
    } = userMetadata;

    const tapInValue = (ethCost * initialETH * tapInThreshold) / 100;
    const totalTapInValue = tapInValue + ethCost * initialETH;

    const collateralBuyBackValue =
      (ethCost * initialETH * collateralBuyBackThreshold) / 100;
    const totalCollateralBuyBackValue =
      collateralBuyBackValue + ethCost * initialETH;

    const currentEthHoldings = currentETH * currentEthCost;

    let updateMetadata = false;
    if (currentEthHoldings > totalTapInValue) {
      updateMetadata = true;
      const purchasedUSDT = currentEthHoldings - totalTapInValue;
      const ethToSell = purchasedUSDT;
      const ethUnitsToSell = ethToSell / currentEthCost;
      userMetadata.purchasedUSDT += purchasedUSDT;
      userMetadata.currentETH -= ethUnitsToSell;
    } else if (
      userMetadata.purchasedUSDT > 0 &&
      currentEthHoldings < totalCollateralBuyBackValue
    ) {
      updateMetadata = true;
      let pumpValue = totalCollateralBuyBackValue - currentEthHoldings;
      console.log(pumpValue, userMetadata.purchasedUSDT);
      if (pumpValue > userMetadata.purchasedUSDT) {
        pumpValue = userMetadata.purchasedUSDT;
      }

      userMetadata.purchasedUSDT -= pumpValue;
      userMetadata.currentETH += pumpValue / currentEthCost;
    }

    if (updateMetadata) {
      user.ref.update({
        metadata: userMetadata,
      });
    }
  });
};
