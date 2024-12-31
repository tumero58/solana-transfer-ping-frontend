import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FC } from 'react'
import styles from '../styles/PingButton.module.css'
import { pingTransaction } from '../utils/pingTransaction';

export const PingButton: FC = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const onClick = async () => {
		await pingTransaction(connection, publicKey, sendTransaction);
	}

	return (
		<button style={{
			width: "120px",
			height: "60px",
			borderRadius: "16px",
			margin: "auto"
		}} onClick={onClick}>Ping!</button>
	)
}

