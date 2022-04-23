import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Carlist.module.css'
import styles2 from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'


const URL2 = "http://localhost/api/BuyYans"


export default function BuyYans({ token }) {

    const [status, setStatus] = useState('')
    const [Yans, setYans] = useState( {
        list:
            [
                { id: "001", name: 'ยันต์ฉัตรเพชร', detail: 'โดดเด่นด้านโชคลาภการเงิน แก้ดวงชะตาที่ตกต่ำ และเสริมดวงชะตา เหมาะสำหรับผู้ที่ทำงานห้างร้าน ค้าขาย บริษัท มีบริวาร (ลูกน้อง) เยอะ ควบคุมอยู่', price: "5000" },
            ]
    })

    useEffect(() => {
        BuyYans()
    }, [])

    const BuyYans = async () => {
        let result = await axios.get(URL2)
        setYans(result.data)
    }

    const deleteYan = async (id) => {
        const result = await axios.delete(`${URL2}/${id}`)
        setYans(result.data)
    }

    const printYans = () => {
        console.log('Yans:', Yans)
        if (Yans.list && Yans.list.length)
            return (Yans.list.map((Yan, index) =>
            (<li key={index} className={styles.listItem3}>
               <b>Name : {(Yan) ? Yan.name : '-'}</b> 
               <br/>
               <b>Detail : {(Yan) ? Yan.detail : '-'}</b> 
               <br/>  
               <b>Price : {(Yan) ? Yan.price : '-'}</b>
               <br/>
               <button onClick={() => deleteYan(Yan.id)} className={`${styles.button} ${styles.btnDelete}`}> Delete </button>
            </li>)
            ))
        else {
            return (
            <div className={styles.container}>
            <h2>No Yans</h2>
            </div>
            )
        }
      }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title> 
            </Head>
            <Navbar />
            <div className={styles.container}>
                <br></br><br></br><br></br>
                <h1 className="text-2xl">Add Cart Yan Shop</h1>
                <br></br><br></br><br></br>
                <ul className={styles.list}>
                    {printYans()}
                </ul>                
                <a href="/BuyYans2" className={`${styles.button2} ${styles.btnEdit}`}><button className={`${styles.button2} ${styles.btnEdit}`}>Buy Yan</button></a>
                <br></br><br></br><br></br>  
            </div>
        </Layout>
    )
}