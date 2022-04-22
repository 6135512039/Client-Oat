import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Carlist.module.css'
import axios from 'axios'
import yanAuth from '../components/yanAuth'
import config from '../config/config'

const URL = `${config.URL}/Yans`
const editYans = ({ token }) => {

    const [Yans, setYans] = useState({
        list:
            [
                { id: "001", band: 'Tesla', model: '3', hp: 450, price: "3,090,000" },
            ]
    })
    const [band, setBand] = useState('')
    const [model, setModel] = useState('')
    const [hp, setHP] = useState('')
    const [price, setPrice] = useState(0)

    useEffect(() => {
        getYans()
    }, [])

    const getYans = async () => {
        let Yan = await axios.get(URL)
        setYans(Yan.data)
    }
    const printYans = () => {
        console.log('Yans:', Yans)
        if (Yans.list && Yans.list.length)
            return (Yans.list.map((Yan, index) =>
            (<li key={index} className={styles.listItem2}>
                <b>Band : {(Yan) ? Yan.band : '-'} </b>
                <b>Model : {(Yan) ? Yan.model : '-'}</b> 
                <b>HP : {(Yan) ? Yan.hp : '-'} </b> 
                <b>Price : {(Yan) ? Yan.price : '-'} </b>
                <button onClick={() => updateYan(Yan.id)} className={`${styles.button} ${styles.btnEdit}`}>Update</button>
                <button onClick={() => deleteYan(Yan.id)} className={`${styles.button} ${styles.btnDelete}`}> Delete </button>
            </li>)
            ))
        else {
            return (<h2>No Yans</h2>)
        }
    }

    const addYan = async (band, model, hp, price) => {
        let result = await axios.post(URL, { band, model, hp, price })
        console.log(result.data)
        setYans(result.data)
    }

    const deleteYan = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        setYans(result.data)
    }
    const updateYan = async (id) => {
        const result = await axios.put(`${URL}/${id}`, {
            band,
            model,
            hp,
            price
        })
        console.log('Yan id update: ', result.data)
        setYans(result.data)
    }

    return (
        <Layout>
            <Head>
                <title>Yans</title>
            </Head>
            <Navbar />
            <div className={styles.container}>
                <br></br>
                {JSON.stringify(Yans.Yans)}
                <br></br><br></br><br></br>
                <h1>Yans List</h1>
                <ul  className={styles.list}> {printYans()}</ul>
                <div className={styles.form}>
                    <h1>Add New Yan</h1>
                    <br></br>
                    Band : <input type="text" onChange={(e) => setBand(e.target.value)} className={styles.textInput} />
                    Model : <input type="text" onChange={(e) => setModel(e.target.value)} className={styles.textInput}/>
                    HP : <input type="text" onChange={(e) => setHP(e.target.value)}className={styles.textInput} />
                    Price : <input type="text" onChange={(e) => setPrice(e.target.value)} className={styles.textInput}/>
                    <br></br><br></br>
                    <button onClick={() => addYan(band, model, hp, price)}>Add New Yan</button>
                </div>

            </div>
        </Layout>
    )
}

export default yanAuth(editYans)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}