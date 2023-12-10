import { getEthValue, getLusdValue } from "./core";
import { usersCollection } from "./firebase";

export const createUser = async (walletAddress) => {
  const user = usersCollection.doc(walletAddress);
  await user.set({ walletAddress });
};

export const addAccountMetadata = async (accountMetadata, userId) => {
  const user = usersCollection.doc(userId);
  const ethValue = await getEthValue();
  const lusdValue = await getLusdValue();
  await user.update({
    metadata: {
      ...accountMetadata,
      currentETH: accountMetadata.initialETH,
      currentLUSD: accountMetadata.initialLUSD,
      ethCost: ethValue,
      lusdCost: lusdValue,
      purchasedUSDT: 0,
    },
  });
};

export const getAccountMetadata = async (userId) => {
  const user = await usersCollection.doc(userId).get();
  return user.get("metadata");
};

export const getUsers = async () => {
  return usersCollection.get();
};
