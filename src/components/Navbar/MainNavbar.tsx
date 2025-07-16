import React from 'react'
import { MainNavType } from '@/types/types'
import Navbar from "./Navbar";
import fetchNavbarApiData from './services/fetchNavbarApiData';

const MainNavbar = async () => {
    const mainNav: MainNavType[] = await fetchNavbarApiData()
    return (
        <Navbar mainNav={mainNav} />
    )
}

export default MainNavbar
