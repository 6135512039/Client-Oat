import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import BuyYans from './BuyYans'

export default function BuyYans2({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        BuyYans2()
    }, [])

    const BuyYans2 = async () => {
    }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title> 
            </Head>
            <Navbar />
            <div className={styles.container}>
                <h1>Buy Yans</h1>
                <h2>Buy successful !</h2>
            </div>
        </Layout>
    )
}
