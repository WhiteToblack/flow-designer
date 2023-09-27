import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import * as React from 'react';
import { MenuRoutes } from "../../entity/MenuRoutes";
import { useLocation, useNavigate } from "react-router-dom";

const FlowMenuComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentPath, setCurrentPath] = React.useState(location.pathname);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (event: any) => {       
        const { path } = event.currentTarget.dataset;
        setCurrentPath(path);
        setAnchorElUser(null);
    };

    React.useEffect(() => {
        const name = MenuRoutes.find((route) => route.path === currentPath)?.name;
        document.title = `Flow Page${name ? ' - ' + name : ''}`;
        navigate(currentPath);
    }, [currentPath]);

    return (<>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Menu">
                <Button variant="contained" onClick={handleOpenUserMenu}>Menu</Button>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {MenuRoutes.map((route) => (
                    <MenuItem key={route.path} data-path={route.path} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{route.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    </>);
};

export default FlowMenuComponent;
