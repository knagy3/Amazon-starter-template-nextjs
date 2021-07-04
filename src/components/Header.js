import React, { useState } from 'react'
import Image from "next/image";
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { selectItems } from "../slices/basketSlice";

function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [ session ] = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);

    return (
        <header className="sticky top-0 z-50">
            {/* Top nav */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image
                        onClick={() => router.push("/")}
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40}
                        objectFit="contain"
                        className="cursor-pointer active:transform active:scale-90"
                    />
                </div>
            
                {/* Custom search bar */} 
                <div className="hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
                {/* hidden sm:flex hides it if it reaches the mobile size */}
                    <input
                        type="text"
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
                        placeholder={
                            router.route === "/"
                                ? "🔎 Search in products listed below…"
                                : ""
                        }
                        onInput={(event) =>
                            router.route === "/" &&
                            props.onSearchValue(event.target.value)
                        }
                    />
                    <SearchIcon className="h-12 p-4" />
                </div>
                {/* Custom search bar - end */}
                {/* Right divs*/}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div
                        onClick={!session ? signIn : signOut}
                        className="link cursor-pointer"
                    >
                        <p className="hover:underline">
                            {session
                                ? `Hello, ${session.user.name}`
                                : "Sign In"
                            }
                        </p>
                        <p className="font-extrabold md:text-sm">
                            Account & Lists
                        </p>
                    </div>
                    <div
                        className="link"
                        onClick={() => router.push("/orders")}
                    >
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <div
                        className="relative link flex items-center"
                        onClick={() => router.push("/checkout")}
                    >
                        <span
                            className={`absolute top-0 right-0 md:right-10 h-4 ${
                                items.length >= 10 ? "w-6" : "w-4"
                            } bg-yellow-400 text-center rounded-full text-black font-bold`}
                        >   
                            {items.length}
                        </span>
                        <ShoppingCartIcon className="h-10" />
                        {/* <p className="hidden md:inline font-extrabold md:text-sm mt-2">
                            Basket
                        </p> */}
                    </div>
                </div>
                {/* Right divs - end*/}
            </div>
            {/* Top nav - end */}
            {/* Bottom nav */}
            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p className="link flex cursor-pointer items-center">
                    <MenuIcon className="h-6 mr-1" onClick={() => setIsOpen(!isOpen)}/>
                </p>
                {isOpen && 
                    <><p className="link">All</p>
                    <p className="link">Prime Video</p>
                    <p className="link">Amazon Business</p>
                    <p className="link">Today's Deals</p>
                    <p className="link hidden lg:inline-flex">Electronics</p>
                    <p className="link hidden lg:inline-flex">Foods & Grocery</p>
                    <p className="link hidden lg:inline-flex">Prime</p>
                    <p className="link hidden lg:inline-flex">Buy Again</p>
                    <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                    <p className="link hidden lg:inline-flex">Health & Personal Care</p></>
                }
            </div>
            {/* Bottom nav - end */}
        </header>
    )
}

export default Header
