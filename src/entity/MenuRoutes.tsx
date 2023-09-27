import FlowGroundScreen from "../screens/flow-ground/flow-ground-screen";
import HomeScreen from "../screens/home/home-screen";

interface IRoute {
    name: string;
    path: string;
    component: React.ComponentType;
}

const MenuRoutes: IRoute[] = [
    {
        name: 'Home',
        path: '/',
        component: HomeScreen,
    },
    {
        name: 'FlowGround',
        path: '/flowBackground',
        component: FlowGroundScreen,
    }
];

export { MenuRoutes };