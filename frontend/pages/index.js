import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'

export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>First Page</title>
    </Head>
    <Navbar />
    <body className="backgroundindex">
    <div className="show-icon">
      <div class="px-4 flex items-center justify-center min-h-screen">
        <h1>Home page</h1>
        No login required!
      </div>
    </div>
  </body>
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}