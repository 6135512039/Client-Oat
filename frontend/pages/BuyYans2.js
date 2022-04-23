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
            <body className="backgroundindex2">
            <div class="flex items-center justify-center min-h-screen">
                <br></br>
                <div>
                    <h2 class="text-white text-4xl">Buy Successful</h2>
                </div>
            </div>
            </body>
        </Layout>
    )
}
