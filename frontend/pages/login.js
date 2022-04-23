import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import config from "../config/config";

export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [rememberme, setRememberme] = useState("");

  const login = async (req, res) => {
    try {
      let result = await axios.post(
        `${config.URL}/login`,
        { username, password, rememberme },
        { withCredentials: true }
      );
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.status + ": " + result.data.user.username);
    } catch (e) {
      console.log("error: ", JSON.stringify(e.response));
      setStatus(JSON.stringify(e.response).substring(0, 20) + "Not Register");
    }
  };

  const loginForm = () => (
    <div class="px-4 flex items-center justify-center min-h-screen">
      <div class="w-96 px-8 py-6 mt-3 text-left bg-white opacity-95 shadow-lg rounded-lg">
        <h3 class=" mt-4 text-2xl font-bold text-center">Login Admin</h3>

        <div className="mt-8">
          Status: {status}
          <br /><br />
        </div>

        <div class="mt-2">
          <label class="block">Username</label>
          <input
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div class="mt-4">
          <label class="block">Password</label>
          <input
            type="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />
        </div>

        <div class="w-80 justify-items-center">
          <button
            class=" w-full h-10 px-6 py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-gray-900"
            onClick={login}>Login
          </button>
        </div>
      </div>
    </div>
  );

  const copyText = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />
      <body className="backgroundindex">{loginForm()}</body>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
