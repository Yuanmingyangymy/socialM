import { Suspense, lazy, useContext } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";

import './App.scss'
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
// 使用react query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import Posts from './components/Posts';
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Profile from './pages/Profile';
// import Home from './pages/Home';
import NavBar from './components/NavBar';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';

const Home = lazy(() => import("./pages/Home"))
const Profile = lazy(() => import("./pages/Profile"))
const Register = lazy(() => import("./pages/Register"))
const Login = lazy(() => import("./pages/Login"))
const Posts = lazy(() => import("./components/Posts"))



const queryClient = new QueryClient()
// 判断路由的类型是否正确
interface RouterConfig {
  path: string;
  element: React.ReactNode;
}

const App: React.FC = () => {
  // 暗夜模式
  const { darkMode } = useContext(DarkModeContext)
  // 用户信息(判断是否登录)
  const { currentUser } = useContext(AuthContext)


  const Layout: React.FC = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
          <NavBar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>

    )
  }

  interface ProtectedRouterProps {
    children: React.ReactNode;
  }

  // 判断登录，若没有则Login
  const ProtectedRouter = ({ children }: ProtectedRouterProps) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return <>{children}</>
  }

  // 创建路由
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <ProtectedRouter>
          <Layout />
        </ProtectedRouter>,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Home />
            </Suspense>
          )
        },
        {
          path: "/profile/:id",
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Profile />
            </Suspense>
          )
        },
        {
          path: "/all",
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Posts />
            </Suspense>
          )
        }
      ]
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<div>loading...</div>}>
          <Login />
        </Suspense>
      )
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<div>loading...</div>}>
          <Register />
        </Suspense>
      )
    },
  ]);


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}



export default App

