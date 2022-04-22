import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import axios from "axios";
import config from "../config/config";

export default function Register({ token }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const profileUser = async () => {
    console.log("token: ", token);
    const users = await axios.get(`${config.URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("user: ", users.data);
  };

  const register = async (req, res) => {
    try {
      let result = await axios.post(`${config.URL}/register`, {
        username,
        email,
        password,
      });
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(token);
  };

  const registerForm = () => (
    <div class="px-4 flex items-center justify-center min-h-screen">
      <div class=" h-50 w-50 px-8 py-6 mt-3 text-left bg-white opacity-95 shadow-lg rounded-lg">
        <h3 class="mt-4 text-2xl font-bold text-center">Register Admin</h3>
        <div class="mt-4">
          {token.substring(0, 15)}...
          <button onClick={copyText}> Copy token </button>
          <br />
          <button
            class=" w-full h-10 px-6 py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-gray-900"
            onClick={() => {
              navigator.clipboard.writeText(token);
            }}
          >
            Copy token
          </button>
        </div>
        <br></br>
        Status: {status}
        <div class="rounded-md">
          <div class="mt-4">
            <label>Username</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-darker"
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="mt-4">
            <label>Email</label>
            <input
              class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-darker mb-4"
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-darker mb-4"
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div class="w-96 grid justify-items-center">
              <button
                class=" w-full h-10 px-6 py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-gray-900"
                onClick={register}>Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <Navbar />
      <body className="backgroundindex">{registerForm()}</body>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
