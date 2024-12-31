import dynamic from 'next/dynamic'
import '../styles/globals.css'

const WalletContextProvider = dynamic(() => import('../components/WalletContextProvider'), {
  ssr:false
});

function MyApp({ Component, pageProps }) {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
    </WalletContextProvider>
  )
}

export default MyApp
