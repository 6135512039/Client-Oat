import Head from "next/head";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import styles from "../styles/Carlist.module.css";
import axios from "axios";
import yanAuth from "../components/yanAuth";
import config from "../config/config";

const URL = `${config.URL}/Yans`;
const editYans = ({ token }) => {
  const [Yans, setYans] = useState({
    list: [
      { id: "001", name: 'ยันต์ฉัตรเพชร', detail: 'โดดเด่นด้านโชคลาภการเงิน แก้ดวงชะตาที่ตกต่ำ และเสริมดวงชะตา เหมาะสำหรับผู้ที่ทำงานห้างร้าน ค้าขาย บริษัท มีบริวาร (ลูกน้อง) เยอะ ควบคุมอยู่', price: "5000" },
    ],
  });
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getYans();
  }, []);

  const getYans = async () => {
    let Yan = await axios.get(URL);
    setYans(Yan.data);
  };
  const printYans = () => {
    console.log("Yans:", Yans);
    if (Yans.list && Yans.list.length)
      return Yans.list.map((Yan, index) => (
        <li key={index} className={styles.listItem2}>
          <b>Name : {Yan ? Yan.name : "-"} </b>
          <br/>
          <b>Detail : {Yan ? Yan.detail : "-"}</b>
          <br/>
          <b>Price : {Yan ? Yan.price : "-"} </b>
          <br/>
          <button
            onClick={() => updateYan(Yan.id)}
            className={`${styles.button} ${styles.btnEdit}`}
          >
            Update
          </button>
          <button
            onClick={() => deleteYan(Yan.id)}
            className={`${styles.button} ${styles.btnDelete}`}
          >
            {" "}
            Delete{" "}
          </button>
        </li>
      ));
    else {
      return (<h2>No Yans</h2>);
    }
  };

  const addYan = async (name, detail, price) => {
    let result = await axios.post(URL, { name, detail, price });
    console.log(result.data);
    setYans(result.data);
  };

  const deleteYan = async (id) => {
    const result = await axios.delete(`${URL}/${id}`);
    console.log(result.data);
    setYans(result.data);
  };
  const updateYan = async (id) => {
    const result = await axios.put(`${URL}/${id}`, {
      name,
      detail,
      price
    });
    console.log("Yan id update: ", result.data);
    setYans(result.data);
  };

  return (
    <Layout>
      <Head>
        <title>Yans</title>
      </Head>
      <Navbar />
      <h1 className="text-3xl mt-48 text-center text-white">YAN Shop</h1>
      <body className="background grid justify-items-center">
          <br></br>
          {JSON.stringify(Yans.Yans)}
          <br></br>
          <br></br>
          <br></br>
          <ul className={styles.list}> {printYans()}</ul>
          <div class="px-4 flex items-center justify-center min-h-screen">
        <div class="w-96 px-8 py-6 mt-3 text-left bg-white opacity-95 shadow-lg rounded-lg">
          <h3 class=" mt-4 text-2xl font-bold text-center">Add New Yan</h3>
            <br></br>
            
            <div class="mt-4">
            <label class="block">Name</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"  
              type="text"
              onChange={(e) => setName(e.target.value)}
              
            />
            </div>
            <div class="mt-4">
            <label class="block">Detail</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"  
              type="text"
              onChange={(e) => setDetail(e.target.value)}    
            />
            </div>
            <div class="mt-4">
            <label class="block">Price</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" 
              type="text"
              onChange={(e) => setPrice(e.target.value)}
            />
            </div>
            <div className="mt-4">
            <button
            class=" w-full h-10 px-6 py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-gray-900"
            onClick={() => addYan(name, detail, price)}>
              Add New Yan
            </button>
            </div>
        </div>
        </div>
        </body>
    </Layout>
  );
};

export default yanAuth(editYans);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
