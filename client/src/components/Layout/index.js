import { Box, useMediaQuery } from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import { useGetUserQuery } from "../../store/api";

const Layout = () =>{
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const userId = useSelector((state)=>state.global.userId);
    const { data, isLoading, error } = useGetUserQuery(userId);
    console.log('Data', data);

    return (
        <Box
        display={isNonMobile? "flex":"block"}
        width="100%" 
        height = "100%"
        >
            <SideBar
             user={data || {}}
            isNonMobile={isNonMobile}
            drawerWidth= "250px"
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            />
            <Box flexGrow={1}>
                <NavBar  
                 user={data || {}}
                 isSideBarOpen= {isSideBarOpen}
                 setIsSideBarOpen = {setIsSideBarOpen}
                />
                 <Outlet />
            </Box>
        </Box>
    )
}

export default Layout;