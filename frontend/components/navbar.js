//หากเข้าที่ /foo โดยที่ยังไม่ Login จะ Redirect ไปให้ Login ก่อน แต่ถ้า Login แล้ว ก็จะแสดงข้อความคำว่า  Foo 


const Navbar = () => (
<nav class="container flex justify-between px-5 py-8 mx-auto ">
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"></link>
  <div>
    <h3 class="text-2xl font-medium text-white">SUKYANS</h3>
  </div>
  <div class="hidden space-x-8 lg:flex text-white">
    <a href="/">Home</a>
    <a href="/editYans">Yan Shop</a>
    <a href="/register">Register</a>
    <a href="/login">Login</a>
    <a href="/logout">Logout</a>
  </div>
  <div class="flex lg:hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </div>
</nav>

)

export default Navbar
