import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';

type BoxProps = {
    children: React.ReactNode; // 👈️ type children
};
function FlowToolbar(props: BoxProps) {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="poster"
                        noWrap
                        component="a"
                        href="/"
                        color={'white'}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            letterSpacing: '.3rem',                           
                            textDecoration: 'none'
                        }}
                    >
                        WTB
                    </Typography>
                    {/* ScreenMenu */}
                    {props.children}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default FlowToolbar;