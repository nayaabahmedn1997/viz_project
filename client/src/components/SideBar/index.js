import { 
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme 
} from '@mui/material';
import React, { useEffect, useState } from 'react'
import FlexBetween from '../FlexBetween'
import profileImage from '../../assets/profile.jpeg';

import { 
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    PointOfSaleOutlined
 } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />
    },
    {
        text: "Geography",
        icon: <PublicOutlined />
    },
    {
        text: "Sales",
        icon: null
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Daily",
        icon: <TodayOutlined />
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />
    },
    {
        text: "Management",
        icon: null
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />
    },

]


const SideBar = ({
    user,
    drawerWidth,
    isSideBarOpen,
    setIsSideBarOpen,
    isNonMobile
}) => {
    const {pathName} = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    useEffect(()=>{
        console.log(pathName)
        setActive(pathName?.subString(1));
    },[pathName]);
    return (
        <Box component="nav">
            {
                isSideBarOpen &&

                (
                    <Drawer
                        open={isSideBarOpen}
                        onClose={() => setIsSideBarOpen(false)}
                        variant="persistent"
                        anchor="left"
                        sx={{
                            width: drawerWidth,
                            "& .MuiDrawer-paper": {
                                color: theme.palette.secondary[200],
                                backgroundColor: theme.palette.background.alt,
                                boxSixing: "border-box",
                                borderWidth: isNonMobile ? 0 : "2px",
                                width: drawerWidth,
                               

                            },
                        }}
                    >
                        <Box width="100%" height="50px">
                            <FlexBetween >
                                <Box
                                 display="flex"
                                 alignItems="center"
                                 justifyContent="center"
                                  gap="0.5rem">
                                    <Typography variant="h4"
                                    
                                    fontWeight="bold">
                                        ECOMVISION
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <Divider />
                        <List>
                            {
                                navItems.map(({ text, icon }) => {
                                    if (!icon) {
                                        return (
                                            <Box>
                                           
                                            <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }} >
                                                {text}
                                            </Typography>
                                            <Divider />
                                            </Box>
                                        )
                                    }

                                    const lcText = text.toLocaleLowerCase();

                                    return (
                                        <ListItem
                                            key={text}
                                            disablePadding
                                        >
                            
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(`/${lcText}`);
                                                    setActive(lcText);
                                                }}
                                                sx={{
                                                    backgroundColor:
                                                        active === lcText
                                                            ? theme.palette.secondary[300]
                                                            : "transparent",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[100],
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        ml: "2rem",
                                                        color:
                                                            active === lcText
                                                                ? theme.palette.primary[600]
                                                                : theme.palette.secondary[200],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === lcText && (
                                                    <ChevronRightOutlined sx={{ ml: "auto" }} />

                                                )}
                                                  <Divider />
                                            </ListItemButton>
                                          
                                        </ListItem>
                                        
                                    )

                                })


                                
                            }
                            <Divider />
                            <Box 
                      
                      >
                        
                          <FlexBetween 
                          sx={{
                              display:"flex",
                              justifyContent:"center",
                              alignItems:"center",
                             
                          }}
                          textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                              <Box
                                  component="img"
                                  alt="profile"
                                  src={profileImage}
                                  height="40px"
                                  width="40px"
                                  borderRadius="50%"
                                  sx={{ objectFit: "cover" }}
                              />
                              <Box textAlign="left">
                                  <Typography
                                      fontWeight="bold"
                                      fontSize="0.9rem"
                                      sx={{ color: theme.palette.secondary[100] }}
                                  >
                                      {user.name}
                                  </Typography>
                                  <Typography
                                      fontSize="0.8rem"
                                      sx={{ color: theme.palette.secondary[200] }}
                                  >
                                      {user.occupation}
                                  </Typography>
                              </Box>
                              <SettingsOutlined
                                  sx={{
                                      color: theme.palette.secondary[300],
                                      fontSize: "25px ",
                                  }}
                              />
                          </FlexBetween>
                      </Box>
                        </List>
                        
                    </Drawer>
                )
            }
        </Box>
    )
}

export default SideBar