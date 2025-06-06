import React from "react";
import {assets} from "../assets/assets";
import {useSelector, useDispatch } from "react-redux";
import {logout} from "../features/slices/authSlice";
import {NavLink, useNavigate,} from "react-router-dom";
import {FaShoppingCart, FaUser, FaFlagUsa} from "react-icons/fa";
import { RiAdminLine, RiUser2Fill } from "react-icons/ri";
import SearchBar from "./SearchBar";
import CartPopOver from "./CartPopOver";
import {useLogoutMutation} from "../features/slices/userApiSlice";



export default function TopNavBar() {

    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const {cartItems} = useSelector((state) => state.cartSlice);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate("/login")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/* Navbar Admin Icon */}
            <header>
                <div className={'flex items-center justify-between text-sm px-1 border-b border-b-gray-600'}>
                    <div className={'flex items-center justify-center px-1 mx-1 gap-2'}>
                        <img onClick={() => navigate("/")}
                             alt={"header-logo"}
                             className={"size-11 cursor-pointer justify-center mb-1"}
                             src={assets.admin_logo}/>
                        <div className={"flex items-center gap-2 px-2 mb-1 sm:hidden "}>
                            <FaFlagUsa size={22}/>
                            <h2>USD</h2>
                        </div>
                    </div>

                    {/* NavBar TabView HOME STORE CONTACT ABOUT */}
                    <ul className={"hidden md:flex items-start gap-16 font-medium justify-start"}>
                        <NavLink to={"/"}>
                            <li className={"py-2 md: text-md lg: text-lg xl: text-xl hover:text-blue-500"}>HOME</li>
                            <hr className={'border-b outline-none h-0.5 w-3/5 m-auto hidden '}/>
                        </NavLink>

                        <NavLink to={"/products"}>
                            <li className={"py-2 md: text-md lg: text-lg xl: text-xl hover:text-blue-500"}>STORE</li>
                            <hr className={'border-b outline-none h-0.5 bg-primary w-3/5 m-auto hidden'}/>
                        </NavLink>

                        <NavLink to={"/contactUs"}>
                            <li className={"py-2 md: text-md lg: text-lg xl: text-xl hover:text-blue-500"}>CONTACT</li>
                            <hr className={'border-b outline-none h-0.5 bg-primary w-3/5 m-auto hidden'}/>
                        </NavLink>

                        <NavLink to={"/aboutUs"}>
                            <li className={"py-2 md: text-md lg: text-lg xl: text-xl hover:text-blue-500"}>ABOUT</li>
                            <hr className={'border-b outline-none h-0.5 bg-primary w-3/5 m-auto hidden'}/>
                        </NavLink>
                    </ul>

                    {/* Search Bar Shopping Cart and Login */}
                    <div className={"flex items-center gap-6 px-4"}>
                        <SearchBar/>

                        {/*<NavLink to={"/carts"}>*/}
                        {/*    <FaShoppingCart size={26}/>*/}
                        {/*</NavLink>*/}
                        <div className={"flex items-center gap-3 cursor-pointer group relative "}>
                            <NavLink to={"/cart"}>
                                <FaShoppingCart size={26}/>
                                {cartItems.length > 0 && (
                                    <h3 className={"text-gray-800 font-semibold"} style={{marginLeft: "5px"}}>
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </h3>
                                )}

                                <div
                                    className={"absolute top-0 right-0 pt-12 text-base font-medium text-gray-800 z-20 hidden group-hover:block"}>
                                    <CartPopOver/>
                                </div>
                            </NavLink>
                        </div>

                        <div className={"flex items-center gap-3 cursor-pointer group relative"}>

                            {userInfo ? (
                                <div className={"flex items-center gap-3 cursor-pointer group relative"}>
                                        <RiUser2Fill size={26}/>
                                        <p className={"text-xs font-medium italic text-gray-800"}>{userInfo.name}</p>
                                        <div
                                            className={"absolute top-0 right-0 pt-16 text-base font-medium text-gray-800 z-20 hidden group-hover:block"}>
                                            <div className={"min-w-48 bg-stone-100 rounded flex flex-col gap-3 p-3"}>
                                                    <NavLink className={"hover:text-blue-500"} to={"/profile"}>
                                                       Profile
                                                    </NavLink>

                                                    <NavLink className={"hover:text-blue-500"} to={"/myOrders"}>
                                                        My Orders
                                                    </NavLink>


                                                    <NavLink
                                                        className={"hover:text-blue-500"}
                                                        to={"/logout"}
                                                    onClick={logoutHandler}>
                                                        Logout
                                                    </NavLink>

                                            </div>
                                        </div>
                                </div>

                            ) : (
                                <NavLink
                                    className={"hover:text-blue-500"}
                                    to={"/login"}>
                                    <FaUser size={26}/>
                                </NavLink>
                            )}
                        </div>

                        {/* User Login */}
                        {userInfo && userInfo.isAdmin && (
                            <div className={"flex items-center gap-3 cursor-pointer group relative"}>
                                    <RiAdminLine size={26}/>
                                    <div
                                        className={"absolute top-0 right-0 pt-16 text-base font-medium text-gray-800 z-20 hidden group-hover:block"}>
                                        <div className={"min-w-48 bg-stone-100 rounded flex flex-col gap-3 p-3"}>
                                            <p className={"hover:text-blue-500 cursor-pointer"}
                                            >
                                                <NavLink to={"/admin/ordertable"}>
                                                    Orders
                                                </NavLink>

                                            </p>
                                            <p className={"hover:text-blue-500  cursor-pointer"}
                                            >
                                                <NavLink to={"/admin/producttable"}>
                                                Products
                                                </NavLink>
                                            </p>
                                            <p className={"hover:text-blue-500  cursor-pointer"}
                                            >
                                                <NavLink to={"/admin/usertable"}>
                                                    Users
                                                </NavLink>

                                            </p>
                                        </div>
                                    </div>

                            </div>
                        )}
                        {/* Admin Login */}
                    </div>
                </div>
            </header>
        </>

    )
}