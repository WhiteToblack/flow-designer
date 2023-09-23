import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Basic from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Basic';
import Backgrounds from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Backgrounds';
import ControlledUncontrolled from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/ControlledUncontrolled';
import CustomConnectionLine from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/CustomConnectionLine';
import CustomMiniMapNode from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/CustomMiniMapNode';
import CustomNode from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/CustomNode';
import DefaultNodes from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/DefaultNodes';
import DragHandle from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/DragHandle';
import DragNDrop from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/DragNDrop';
import EasyConnect from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/EasyConnect';
import Edges from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Edges';
import EdgeRenderer from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/EdgeRenderer';
import EdgeTypes from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/EdgeTypes';
import Empty from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Empty';
import Figma from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Figma';
import FloatingEdges from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/FloatingEdges';
import Hidden from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Hidden';
import Interaction from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Interaction';
import Intersection from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Intersection';
import Layouting from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Layouting';
import MultiFlows from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/MultiFlows';
import NestedNodes from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/NestedNodes';
import NodeExtent from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/NodeExtent';
import NodeResizer from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/NodeResizer';
import NodeTypeChange from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/NodeTypeChange';
import NodeTypesObjectChange from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/NodeTypesObjectChange';
import Overview from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Overview';
import Provider from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Provider';
import SaveRestore from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/SaveRestore';
import Stress from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Stress';
import Subflow from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Subflow';
import SwitchFlow from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Switch';
import TouchDevice from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/TouchDevice';
import Undirectional from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Undirectional';
import UpdatableEdge from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/UpdatableEdge';
import UpdateNode from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/UpdateNode';
import UseUpdateNodeInternals from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/UseUpdateNodeInternals';
import UseReactFlow from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/UseReactFlow';
import Validation from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/Validation';
import UseKeyPress from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/UseKeyPress';
import EdgeRouting from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/EdgeRouting';
import CancelConnection from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/CancelConnection';
import InteractiveMinimap from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/InteractiveMinimap';
import UseOnSelectionChange from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/UseOnSelectionChange';
import NodeToolbar from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/NodeToolbar';
import useNodesInitialized from './../../../internal-lib/react-flow-main/examples/vite-app/src/examples/UseNodesInit';
import ReactFlow from './../../../internal-lib/react-flow-main/packages/core/src/container/ReactFlow/index';

interface IRoute {
  name: string;
  path: string;
  component: React.ComponentType;
}

const routes: IRoute[] = [
  {
    name: 'Basic',
    path: '/',
    component: Basic,
  },
  {
    name: 'Backgrounds',
    path: '/backgrounds',
    component: Backgrounds,
  },
  {
    name: 'Cancel Connection',
    path: '/cancel-connection',
    component: CancelConnection,
  },
  {
    name: 'Controlled/Uncontrolled',
    path: '/controlled-uncontrolled',
    component: ControlledUncontrolled,
  },
  {
    name: 'Custom Connection Line',
    path: '/custom-connectionline',
    component: CustomConnectionLine,
  },
  {
    name: 'Custom Minimap Node',
    path: '/custom-minimap-node',
    component: CustomMiniMapNode,
  },
  {
    name: 'Custom Node',
    path: '/custom-node',
    component: CustomNode,
  },
  {
    name: 'Default Nodes',
    path: '/default-nodes',
    component: DefaultNodes,
  },
  {
    name: 'Drag Handle',
    path: '/draghandle',
    component: DragHandle,
  },
  {
    name: 'Drag and Drop',
    path: '/dragndrop',
    component: DragNDrop,
  },
  {
    name: 'EasyConnect',
    path: '/easy-connect',
    component: EasyConnect,
  },
  {
    name: 'Edges',
    path: '/edges',
    component: Edges,
  },
  {
    name: 'Edge Renderer',
    path: '/edge-renderer',
    component: EdgeRenderer,
  },
  {
    name: 'Edge Types',
    path: '/edge-types',
    component: EdgeTypes,
  },
  {
    name: 'Edge Routing',
    path: '/edge-routing',
    component: EdgeRouting,
  },
  {
    name: 'Empty',
    path: '/empty',
    component: Empty,
  },
  {
    name: 'Figma',
    path: '/figma',
    component: Figma,
  },
  {
    name: 'Floating Edges',
    path: '/floating-edges',
    component: FloatingEdges,
  },
  {
    name: 'Hidden',
    path: '/hidden',
    component: Hidden,
  },
  {
    name: 'Interaction',
    path: '/interaction',
    component: Interaction,
  },
  {
    name: 'Intersection',
    path: '/intersection',
    component: Intersection,
  },
  {
    name: 'Interactive Minimap',
    path: '/interactive-minimap',
    component: InteractiveMinimap,
  },
  {
    name: 'Layouting',
    path: '/layouting',
    component: Layouting,
  },
  {
    name: 'Multi Flows',
    path: '/multiflows',
    component: MultiFlows,
  },
  {
    name: 'Nested Nodes',
    path: '/nested-nodes',
    component: NestedNodes,
  },
  {
    name: 'Node Extent',
    path: '/nodeextent',
    component: NodeExtent,
  },
  {
    name: 'Node Type Change',
    path: '/nodetype-change',
    component: NodeTypeChange,
  },
  {
    name: 'nodeTypes Object Change',
    path: '/nodetypesobject-change',
    component: NodeTypesObjectChange,
  },
  {
    name: 'NodeToolbar',
    path: '/node-toolbar',
    component: NodeToolbar,
  },
  {
    name: 'NodeResizer',
    path: '/node-resizer',
    component: NodeResizer,
  },
  {
    name: 'Overview',
    path: '/overview',
    component: Overview,
  },
  {
    name: 'Provider',
    path: '/provider',
    component: Provider,
  },
  {
    name: 'Save/Restore',
    path: '/save-restore',
    component: SaveRestore,
  },
  {
    name: 'Stress',
    path: '/stress',
    component: Stress,
  },
  {
    name: 'Subflow',
    path: '/subflow',
    component: Subflow,
  },
  {
    name: 'Switch Flow',
    path: '/switch',
    component: SwitchFlow,
  },
  {
    name: 'Touch Device',
    path: '/touch-device',
    component: TouchDevice,
  },
  {
    name: 'Undirectional',
    path: '/undirectional',
    component: Undirectional,
  },
  {
    name: 'Updatable Edge',
    path: '/updatable-edge',
    component: UpdatableEdge,
  },
  {
    name: 'Update Node',
    path: '/update-node',
    component: UpdateNode,
  },
  {
    name: 'useNodesInitialized',
    path: '/use-nodes-initialized',
    component: useNodesInitialized,
  },
  {
    name: 'useOnSelectionChange',
    path: '/use-on-selection-change',
    component: UseOnSelectionChange,
  },
  {
    name: 'useReactFlow',
    path: '/usereactflow',
    component: UseReactFlow,
  },
  {
    name: 'useUpdateNodeInternals',
    path: '/useupdatenodeinternals',
    component: UseUpdateNodeInternals,
  },
  {
    name: 'Validation',
    path: '/validation',
    component: Validation,
  },
  {
    name: 'useKeyPress',
    path: '/use-key-press',
    component: UseKeyPress,
  },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const name = routes.find((route) => route.path === currentPath)?.name;
    document.title = `React Flow Examples${name ? ' - ' + name : ''}`;
    navigate(currentPath);
  }, [currentPath]);

  return (
    <header>
      <a className="logo" href="https://github.com/wbkd/react-flow">
        React Flow Dev
      </a>
      <select value={currentPath} onChange={(event) => setCurrentPath(event.target.value)}>
        {routes.map((route) => (
          <option value={route.path} key={route.path}>
            {route.name}
          </option>
        ))}
      </select>
    </header>
  );
};

export default () => (
  <BrowserRouter>
    <Header />
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} key={route.path} element={<route.component />} />
      ))}
    </Routes>
  </BrowserRouter>
);
