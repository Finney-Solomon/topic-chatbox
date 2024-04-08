import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-use-history";
export const Header = () => {
    const userDetails = useSelector((state) => state?.user);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLoginLogout = (e) => {
        if (userDetails?.email === undefined) {
            history.push("/");
        } else {
            history.push("/homepage");
        }
    }

    return (

        <AppBar position="static" sx={{ width: "100vw", top: "0" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Topic Chat Box
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            sx={{ width: 56, height: 56 }}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>{userDetails.user}</MenuItem>
                            <MenuItem onClick={handleClose}>{userDetails.email}</MenuItem>
                            <MenuItem onClick={handleLoginLogout}>{userDetails?.email === undefined
                                ? "Login" : "Logout"}</MenuItem></Menu>
                    </div>

                </Toolbar>
            </Container>
        </AppBar >

    );
}
