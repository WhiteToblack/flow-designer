import { useCallback, MouseEvent, useEffect } from 'react';
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
    useEdgesState,
    Panel,
} from 'reactflow';

const initialNodes: Node[] = [
    {
        id: 'Start',
        // type: 'input',
        data: { label: 'Start' },
        position: { x: 600, y: 50 },
        className: "node-body",
        type: 'triangle',
        style: { width: 100, height: 70, backgroundColor: 'GrayText', textAlign: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 20, fontSize: 20, borderRadius: 20 },

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

    const onAddNode = useCallback((ruleId: string) => {
        const newNode = {
            id: getId(),
            position: { x: 200, y: 100 },
            data: {
                label: 'New Node - ' + ruleId,
            },
        };

        addNodes(newNode);
    }, [addNodes]);

    const _addNode = (event: any) => {
        onAddNode(event.target.getAttribute('rule-id'));
    }

    const getEdgeValues = () => {
        let edges = getEdges();
        let summarySpan = document.getElementById('summary')!;
        let spanText: string = '';
        edges.forEach(edge => {
            spanText += edge.source + ' -> ' + edge.target;
        });
        summarySpan.innerHTML = JSON.stringify(spanText);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', position: 'relative', height: '100%', width: 'auto' }}>
            <div style={{ flexDirection: 'column', float: 'left', width: 300 }}>
                <ul>
                    <li><a href="#" rule-id='1' onClick={_addNode}>Rule 1</a></li>
                    <li><a href="#" rule-id='2' onClick={_addNode}>Rule 2</a></li>
                    <li><a href="#" rule-id='3' onClick={_addNode}>Rule 3</a></li>
                    <li><a href="#" rule-id='4' onClick={_addNode}>Rule 4</a></li>
                    <li><input type='button' className='primary' value={'Get Data'} onClick={getEdgeValues}></input></li>
                    <li><span id='summary'></span></li>
                </ul>
            </div>
            <div style={{ flexDirection: 'column', float: 'left', width: '100%', height: '100%' }}>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    //    onNodeClick={onNodeClick}
                    onConnect={onConnect}
                    //    onPaneClick={onPaneClick}
                    //  fitView
                    fitViewOptions={{ duration: 1200, padding: 0.2 }}
                    maxZoom={Infinity}
                >

                    <Background />
                    <MiniMap />
                </ReactFlow>

            </div>
        </div>
    );
};

const MainContainer = () => (
    <ReactFlowProvider>
        <UseZoomPanHelperFlow />
    </ReactFlowProvider>
);

export default MainContainer;
