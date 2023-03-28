import { useEffect, useState } from "react";
// @web3-react
import * as Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { authenticate, getBalances } from "../utils/web3";

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
export function useBalances() {
  const { account, library } = useWeb3React();
  const [balances, setBalances] = useState(null);

  useEffect(() => {
    (async () => {
      if (library?.provider && account) {
        const web3 = new Web3(library?.provider);
        const { apiKey, accountId } = await authenticate(account, web3);

        const balances = await getBalances({ apiKey, accountId, web3 });
        const results = (balances.userNFTBalances ?? []).map((e) => e.nftId);
        console.log("BAL: ", balances);
        setBalances(results);
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [account, library]);

  return balances;
}
