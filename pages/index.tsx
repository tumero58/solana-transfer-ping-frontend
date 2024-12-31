import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import Head from 'next/head'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { transferTransaction } from '../utils/transferTransaction'

const Home: NextPage = (props) => {
  const {connection} = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const [amount, setAmount] = useState(0);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!connected) {
        return;
      }
      setLoading(true);
      const lamports = await connection?.getBalance(publicKey);
      setLoading(false);
      setBalance(lamports / LAMPORTS_PER_SOL);
    })()
  }, [connection, publicKey]);

  const onClick = async () => {
    await transferTransaction(connection,publicKey,sendTransaction,receiverAddress,amount);
  }

  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <AppBar />
      <div className={styles.AppBody}>
        <div style={{
          width: "100%",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {connected ? loading ? <>Loading ...</> : <h5>Balance: {balance} SOL</h5> : <h5>Please connect your wallet</h5>}
          <h5>Amount in SOL</h5>
          <input style={{ width: "100%", height: "42px", fontSize: "24px" }} type="number" onChange={(e) => {
            setAmount(Number(e.target.value))
          }} />
          <h5>Send SOL to</h5>
          <input style={{ width: "100%", height: "42px", fontSize: "24px" }} type="text" onChange={(e) => {
            setReceiverAddress(e.target.value);
          }} />
          <button style={{
            width: "120px",
            height: "60px",
            borderRadius: "16px",
            margin: "auto"
          }} onClick={onClick} >Send</button>
        </div>
      </div>
    </div>
  );
}

export default Home;