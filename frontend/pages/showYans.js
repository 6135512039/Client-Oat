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
                { id: "001", band: 'Tesla', model: '3', hp: 450, price: "3,090,000" },
            ]
    })

    useEffect(() => {
        getYans()
    }, [])

    const getYans = async () => {
        let Yan = await axios.get(URL)
        setYans(Yan.data)
    }

    const addYan = async (band, model, hp, price) => {
        let result = await axios.post(URL, { band, model, hp, price })
        console.log(result.data)
        setYans(result.data)
    }

    const addCart = async (band, model, hp, price) => {
        let result = await axios.post(URL2, { band, model, hp, price })
        console.log(result.data)
        setCart(result.data)
    }
    const [Cart, setCart] = useState({})
    const printYans = () => {
        console.log('Yans:', Yans)
        if (Yans.list && Yans.list.length)
            return (Yans.list.map((Yan, index) =>
            (<li key={index} className={styles.listItem4}>
               <b>Band : {(Yan) ? Yan.band : '-'}</b> 
               <b>Model : {(Yan) ? Yan.model : '-'}</b>   
               <b>HP : {(Yan) ? Yan.hp : '-'}</b>  
               <b>Price : {(Yan) ? Yan.price : '-'}</b> 
               <a href="/BuyYans"><button onClick={() => addCart(Yan.band, Yan.model, Yan.hp, Yan.price)} className={`${styles.button} ${styles.btnEdit}`}>Add  Cart</button></a>
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
                <h1>Yans List</h1>
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