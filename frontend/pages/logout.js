import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout Successful")
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
                    <h2 class="text-white text-4xl">{status}</h2>
                </div>
            </div>
            </body>
        </Layout>
    )
}
