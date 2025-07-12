import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import Layout from "./components/Layout/Layout"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home/Home"
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes"
import GuardRoute from "./components/GuardRoute/GuardRoute"
import TokenProvider from "./context/Token.context"
import CartProivder from "./context/Cart.context"
import Cart from "./pages/Cart/Cart"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import Checkout from "./pages/Checkout/Checkout"
import Orders from "./pages/Orders/Orders"
import Online from "./components/Online/Online"
import Offline from "./components/Offline/Offline"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/production';
import Products from "./pages/Products/Products"

// protectedRoutes    gaurd     
const routes = createBrowserRouter([
  {
    path: '', element: <ProtectedRoutes> <Layout /> </ProtectedRoutes>, children: [
      { path: '/home', element: <Home /> },
      { path: 'products', element: <Products/> },
      { path: 'cart', element: <Cart /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'Checkout', element: <Checkout /> },
      { path: 'allorders', element: <Orders /> },
    ]
  },

  {
    path: '', element: <GuardRoute> <Layout /> </GuardRoute>, children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ]
  }
])




const x = new QueryClient()

function App() {

  return (
    <>





      {/* provide data to all its children */}
      <QueryClientProvider client={x}>

        <TokenProvider>
          <CartProivder>
            <RouterProvider router={routes}></RouterProvider>
            <Toaster />
          </CartProivder>
        </TokenProvider>


        <ReactQueryDevtools  initialIsOpen={false}/>


      </QueryClientProvider>





    </>
  )
}

export default App
