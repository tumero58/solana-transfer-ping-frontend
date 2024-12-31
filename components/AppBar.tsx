import { FC } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'

export const AppBar: FC = () => {
    return (
        <div className={styles.AppHeader}>
            <Image src="/solanaLogo.png" height={30} width={200} />
            <Link href={"/"}>Trasnfer</Link>
            <Link href={"/ping"}>Ping</Link>
            <WalletMultiButton />
        </div>
    )
}