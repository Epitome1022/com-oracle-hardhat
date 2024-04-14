'use client'
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { CacheProvider } from "@chakra-ui/next-js";
import theme from './theme';
// import config from "./conf/config"
import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';

import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';

import {
    arbitrum,
    base,
    mainnet,
    optimism,
    polygon,
    sepolia,
    zora,
} from 'wagmi/chains';
import { DAppProvider } from '@usedapp/core';
import config from './conf/config';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const { wallets } = getDefaultWallets();

const getconfig = getDefaultConfig({
  appName: 'commune oracle frontend',
  projectId: 'YOUR_PROJECT_ID',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export default function providers({children} : { children: React.ReactNode}) {
  return (
    <DAppProvider config={config}>
      <WagmiProvider config={getconfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {/* <CacheProvider> */}
              {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
              <ChakraProvider resetCSS theme={theme}>{children}</ChakraProvider>
            {/* </CacheProvider> */}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </DAppProvider>
  )
}