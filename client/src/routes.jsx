import Routing from "./Routing";
import Flexbox from "./Flexbox";
import Login from "./Login";
import Products from "./Products";
import Signup from "./Signup";
import { Child1,Child2, Child3, Parent } from "./parent";
import { Children } from "react";
import ProtectedRoute from "./ProtectedRoute";
import UserCart from "./UserCart";
import Order from "./Order";

const routes = [
    {
        path: "",
        element: <Products />
    },
    {
        path: "routing/:productid",
        element: <Routing />
    },
    {
        path: "parent",
        element: <Parent />,
        children:[
            {
                path: 'Child1',
                element: <Child1 />
            },
            {
                path: 'Child2',
                element: <Child2 />
            },
            {
                path: 'Child3',
                element: <Child3 />
            },
        ]
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "signup",
        element: <Signup />
    },
    {
        path: "flex",
        element: <Flexbox />
    },
    {
        path: "user",
        element: <ProtectedRoute />,
        children: [
            {
                path: 'cart', element: <UserCart />
            },
            {
                path: 'order', element: <Order/>
            }
        ]
    }
]

export default routes;