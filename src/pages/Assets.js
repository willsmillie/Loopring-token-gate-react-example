// @mui
import { Container, Typography, Grid, Stack } from "@mui/material";
// @web3-react
import { useWeb3React } from "@web3-react/core";
import { authenticate, getBalances } from "../utils/web3";

// components
import ConnectPopover from "../components/ConnectPopover";
import TokenCard from "../components/TokenCard";
import TokenGate from "../data";
import { useBalances } from "../hooks/useBalances";

export default function PageOne() {
  const { active } = useWeb3React();

  // sort the tokens by date
  const tokens = Object.values(TokenGate.tokens).sort(
    (a, b) => a.updatedAt > b.updatedAt
  );

  // use web3 to get the users balances (once connected)
  const balances = useBalances();

  // find tokens provided by our data file, and held by the connected wallet
  const tokensHeldByUser = (tokens ?? [])
    .filter((e) => (balances ?? []).includes(e.nftId))
    .sort((a, b) => a.updatedAt < b.updatedAt);

  return (
    <Container maxWidth={"xl"}>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" component="h1" paragraph>
            L2 Token Gated Assets
          </Typography>
          <ConnectPopover />
        </Stack>
        {!active ? (
          <>
            <Typography variant="h5" align="center">
              Connect your wallet to view your assets!
            </Typography>
            <Typography color="text.secondary" align="center">
              Only tokens provided in data/index.js will be displayed
            </Typography>
          </>
        ) : (
          <Grid container spacing={2}>
            {tokensHeldByUser.map((token) => (
              <Grid item key={token.nftId} xs={6} sm={4} md={3}>
                <TokenCard token={token} />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
