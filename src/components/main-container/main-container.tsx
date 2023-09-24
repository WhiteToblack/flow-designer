import { useCallback, MouseEvent, useEffect, DragEvent, useState, useMemo } from 'react';
import './main-container.css';
import ReactFlow, {
    Background,
    MiniMap,
    Node,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
    Connection,
    Edge,
    useNodesState,
    useEdgesState
} from 'reactflow';
import MainContextMenu from '../flow-context-menu/flow-context-menu';
import * as reactFlowCustomNodes from '../flow-base-component/custom-nodes/react-flow-custom-nodes';

const initialNodes: Node[] = [
    {
        id: 'Start',
        type: 'oval',
        data: { label: 'Start' },
        position: { x: 600, y: 50 }

    }
];

const initialEdges: Edge[] = [
    // { id: 'e1-2', source: '1', target: '2', animated: true },
    // { id: 'e1-3', source: '1', target: '3' },
    // { id: 'e3-4', source: '3', target: '4' }
];

let id = 5;

const getId = () => `${id++}`;

const UseZoomPanHelperFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds));
    const {
        project,
        setCenter,
        zoomIn,
        zoomOut,
        fitView,
        addNodes,
        setNodes: setNodesHook,
        addEdges,
        getNodes,
        getEdges,
        deleteElements,
    } = useReactFlow();

    const onPaneClick = useCallback(
        (evt: MouseEvent) => {
            const projectedPosition = project({
                x: evt.clientX,
                y: evt.clientY - 40,
            });

            setNodes((nds) =>
                nds.concat({
                    id: getId(),
                    position: projectedPosition,
                    data: {
                        label: `${projectedPosition.x}-${projectedPosition.y}`,
                    },
                })
            );
        },
        [project, setNodes]
    );

    const onNodeClick = useCallback(
        (_: MouseEvent, node: Node) => {
            const { x, y } = node.position;
            setCenter(x, y, { zoom: 1, duration: 1200 });
        },
        [setCenter]
    );



    const logNodes = useCallback(() => {
        console.log('nodes', getNodes());
        console.log('edges', getEdges());
    }, [getNodes, getEdges]);

    const deleteSelectedElements = useCallback(() => {
        const selectedNodes = nodes.filter((node) => node.selected);
        const selectedEdges = edges.filter((edge) => edge.selected);
        deleteElements({ nodes: selectedNodes, edges: selectedEdges });
    }, [deleteElements, nodes, edges]);

    const onAddNode = useCallback((nodeId: string, text: string) => {
        var nodes = getNodes();
        var lastY = nodes[0].position.y;
        const newNode = {
            id: nodeId + new Date().toString(),
            type: nodeId,
            data: { label: text },
            position: { x: 50, y: lastY + 100 },
            //className: "symbol " + nodeId,
            // style: { width: 100, height: 70, backgroundColor: 'GrayText', textAlign: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 20, fontSize: 20, borderRadius: 20 },
        };

        addNodes(newNode);
    }, [addNodes]);

    const getEdgeValues = () => {
        let edges = getEdges();
        let summarySpan = document.getElementById('summary')!;
        let spanText: string = '';
        edges.forEach(edge => {
            spanText += edge.source + ' -> ' + edge.target;
        });
        summarySpan.innerHTML = JSON.stringify(spanText);
    }

    const [contextMenuToggleState, setContextMenuToggleState] = useState(false);
    const onContextMenu = (event: any): void => {
        setContextMenuToggleState(!contextMenuToggleState);
        event.preventDefault();
    }

    const onContextMenuSelected = (symbolId: string) => {
        onAddNode(symbolId, 'test');
    }
    const getNodeTypes = () => {
        return {
            diamond: reactFlowCustomNodes.default.DiamondNode,
            circle: reactFlowCustomNodes.default.CircleNode,
            cylinder: reactFlowCustomNodes.default.CylinderNode,
            oval: reactFlowCustomNodes.default.OvalNode,
            pentagon: reactFlowCustomNodes.default.PentagonNode,
            customTriangle: reactFlowCustomNodes.default.CustomTriangleNode,
            parallelogram: reactFlowCustomNodes.default.ParallelogramNode,
            rectangle: reactFlowCustomNodes.default.RectangleNode
        };

    }
    const nodeTypes = useMemo(() => (getNodeTypes()), []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <MainContextMenu isVisible={contextMenuToggleState} onContextMenuSelected={onContextMenuSelected}></MainContextMenu>

            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                //    onNodeClick={onNodeClick}
                onConnect={onConnect}
                //    onPaneClick={onPaneClick}               
                fitViewOptions={{ duration: 1200, padding: 0.1 }}
                maxZoom={50}
                onContextMenu={onContextMenu}
            >

                <Background />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};

const MainContainer = () => (
    <ReactFlowProvider>
        <UseZoomPanHelperFlow />
    </ReactFlowProvider>
);

export default MainContainer;
