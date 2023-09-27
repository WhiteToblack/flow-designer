import './main-container.css';
import FlowToolbar from '../flow-toolbar/flow-toolbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuRoutes } from '../../entity/MenuRoutes';
import FlowMenuComponent from './../flow-menu/flow-menu-component';
import { ThemeProvider } from '@mui/material';
import DarkTheme from '../../theme/dark-theme';

const MainContainer = () => (<>
    <ThemeProvider theme={DarkTheme}>
        <BrowserRouter>
            <FlowToolbar>
                <FlowMenuComponent />
            </FlowToolbar>
            <Routes>
                {MenuRoutes.map((route) => (
                    <Route path={route.path} key={route.path} element={<route.component />} />
                ))}
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
</>
);

export default MainContainer;
