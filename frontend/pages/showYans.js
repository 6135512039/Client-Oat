import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import yanAuth from '../components/yanAuth'
import config from '../config/config'
import styles from '../styles/Carlist.module.css'
const URL = `${config.URL}/Yans`
const URL2 = "http://localhost/api/BuyYans"

const showYans = ({ token }) => {

    const [Yans, setYans] = useState( {
        list:
            [
                { id: "001", name: 'ยันต์ฉัตรเพชร', detail: 'โดดเด่นด้านโชคลาภการเงิน แก้ดวงชะตาที่ตกต่ำ และเสริมดวงชะตา เหมาะสำหรับผู้ที่ทำงานห้างร้าน ค้าขาย บริษัท มีบริวาร (ลูกน้อง) เยอะ ควบคุมอยู่', price: "5000" },
            ]
    })

    useEffect(() => {
        getYans()
    }, [])

    const getYans = async () => {
        let Yan = await axios.get(URL)
        setYans(Yan.data)
    }

    const addYan = async (name, detail, price) => {
        let result = await axios.post(URL, { name, detail, price })
        console.log(result.data)
        setYans(result.data)
    }

    const addCart = async (name, detail, price) => {
        let result = await axios.post(URL2, { name, detail, price })
        console.log(result.data)
        setCart(result.data)
    }
    const [Cart, setCart] = useState({})
    const printYans = () => {
        console.log('Yans:', Yans)
        if (Yans.list && Yans.list.length)
            return (Yans.list.map((Yan, index) =>
            (<li key={index} className={styles.listItem4}>
               <b>Name : {(Yan) ? Yan.name : '-'}</b> 
               <br/>
               <b>Detail : {(Yan) ? Yan.detail : '-'}</b> 
               <br/>  
               <b>Price : {(Yan) ? Yan.price : '-'}</b> 
               <br/>
               <a href="/BuyYans"><button onClick={() => addCart(Yan.name, Yan.detail, Yan.price)} className={`${styles.button} ${styles.btnEdit}`}>Add  Cart</button></a>
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
            <Navbar />
            <div className={styles.container}>
                {JSON.stringify(Yans.Yans)}
                <br></br><br></br><br></br>
                <h1 className="text-2xl">Yans Shop</h1>
                <ul className={styles.list}>
                    {printYans()}
                </ul>  
            </div>
        </Layout>
    )
}

export default yanAuth(showYans)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}