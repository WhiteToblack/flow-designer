import { useCallback, MouseEvent, useState, useMemo, useEffect } from 'react';
import './react-flow-base.css';
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
    Controls,
    applyEdgeChanges,
    EdgeChange,
    updateEdge,
    HandleType
} from 'reactflow';
import MainContextMenu from '../flow-context-menu/flow-context-menu';
import * as reactFlowCustomNodes from '../flow-base-component/custom-nodes/react-flow-custom-nodes';
import 'reactflow/dist/style.css';
import { Box, Button, TextField, Tooltip, styled } from '@mui/material';
import NodeContextMenu from './node-context-menu';
import FlowNode from '../../../internal-lib/flow-designer-entity/entity/flow-node';
import CollectionService from '../service/collection-service';
import SendIcon from '@mui/icons-material/Send';

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.palette.background.default};
`;

const ControlsStyled = styled(Controls)`
  button {
    background-color: ${(props) => props.theme.palette.background.default};
    color: ${(props) => props.theme.palette.background.default};
    border-bottom: 1px solid ${(props) => props.theme.palette.background.default};

    &:hover {
      background-color: '${(props) => props.theme.palette.background.default}';
    }

    path {
      fill: currentColor;
    }
  }
`;

let id = 1;
const startNode: Node[] = [
    {
        id: 'Start',
        type: 'oval',
        data: { label: 'Start', sequence: 0 },
        position: { x: 900, y: 50 },
        deletable: false
    }
];

const initialEdges: Edge[] = [];

const getId = () => `${id++}`;
const ruleService = new CollectionService();
let isServiceCalled = false;

const UseZoomPanHelperFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(startNode);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const [stateChanged, setStateChanged] = useState(false);
    // const onEdgesChange = useCallback(
    //     (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    //     [setEdges]
    // );
    const instance = useReactFlow();

    const onConnect = (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds));
    const {
        setCenter,
        addNodes,
        getNodes,
        getEdges,
        deleteElements,
    } = useReactFlow();

    const setInitialNodes = (_nodes: FlowNode[]) => {
        let newNodes = [];
        if (_nodes!.length > 0) {
            for (let i = 0; i < _nodes.length; i++) {
                const element = _nodes[i];
                const newNode = {
                    id: element.Id,
                    type: element.SymbolType,
                    data: { label: element.Id, sequence: getId(), script: element.ScriptData },
                    position: { x: element.PositionX, y: element.PositionY }
                };
                newNodes.push(newNode);
            }

            setNodes(newNodes);
        }
    }

    const onNodeClick = useCallback(
        (_: MouseEvent, node: Node) => {
            const { x, y } = node.position;
            setCenter(x, y, { zoom: 1, duration: 1200 });
        },
        [setCenter]
    );

    const onAddNode = useCallback((nodeId: string, text: string) => {
        var nodes = getNodes();
        var lastY = nodes[0].position.y;
        const newNode = {
            id: text,
            type: nodeId,
            data: { label: text, sequence: getId() },
            position: { x: 900, y: lastY + 120 }
        };

        addNodes(newNode);
    }, [addNodes]);

    const setInitialEdges = (data: FlowNode[]) => {
        let newEdges = [];

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            for (let x = 0; x < element.Destination.length; x++) {
                const targetEdge = element.Destination[x];
                let targetId = targetEdge.split('_')[0];

                let edge = {
                    source: element.Id,
                    sourceHandle: element.Source[x],
                    target: targetId,
                    targetHandle: targetEdge,
                    id: "reactflow__edge-" + element.Id + element.Id + '_source' + '-' + targetId + targetEdge,
                };
                newEdges.push(edge);
            }
        }
        setEdges(newEdges);
    }

    const CallCollectionService = async (cbMethod: () => void) => {
        if (!isServiceCalled) {
            isServiceCalled = true;
            ruleService.GetCollection(collectionName).then((res: any) => {
                if (res!.data!.length > 0) {
                    setInitialNodes(res.data);
                    setInitialEdges(res.data);
                }
            }).then(() => {
                setStateChanged(!stateChanged);
                cbMethod();
            }).finally(() => {
                isServiceCalled = true;
            });
        }
    }

    const setSummaryData = () => {
        let edges = getEdges();
        let spanText: string = '';
        edges.forEach(edge => {
            spanText += edge.source + ' -> ' + edge.target + '\n';
        });

        setSummary(spanText);
    }

    const getEdgeLogs = () => {
        isServiceCalled = false;
        CallCollectionService(setSummaryData);
    }

    const getSaveMessage = () => {
        let nodes = getNodes();
        let edges = getEdges();
        let message: FlowNode[] = [];
        nodes.forEach(node => {
            let flowNode: FlowNode = {
                Id: node.id,
                SymbolType: node.type!,
                Source: edges.filter((edge) => { return edge.source == node.id }).map((x) => x.sourceHandle!),
                Destination: edges.filter((edge) => { return edge.source == node.id }).map((x) => x.targetHandle!),
                CollectionName: collectionName,
                PositionX: node.position.x,
                PositionY: node.position.y,
                Sequence: node.data.sequence,
                ScriptData: node.data!.script!
            };

            message.push(flowNode);
        });

        return message;
    }

    const onSave = () => {
        let saveConfirm = confirm('Do you want to save Collection with this name: ' + collectionName);
        if (!saveConfirm) {
            return;
        }

        var message = getSaveMessage();
        // ruleService.GetRules(); 
        ruleService.Save(message);
    }

    const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) =>
        setEdges((els) => updateEdge(oldEdge, newConnection, els));

    const onRunClick = () => {
        let nodes = getNodes();
        let _edges = getEdges();
        nodes = nodes.sort((a, b) => parseInt(a.data.sequence) - parseInt(b.data.sequence))
        for (let x = 0; x < nodes.length; x++) {
            const node = nodes[x];

            for (let i = 0; i < _edges.length; i++) {
                if (_edges[i].source == node.id) {
                    _edges[i].animated = true;
                }

                _edges.filter((e) => e.id !== _edges[i].id).concat(_edges[i]);
                setEdges(_edges);
            }
            console.log(node.id + ' running !');
            eval(node.data.script!);
        }
    }

    const onContextMenuSelected = (symbolId: string, symbolTitle: string) => {
        onAddNode(symbolId, symbolTitle);
    }

    const onNodeContextMenu = (event: any, el: any) => {
        setSelectedNode(el.id);
        let selectedNodeIx = nodes.findIndex((a) => a.id == el.id);
        setSelectedNodeScript(nodes[selectedNodeIx].data.script!);
        let docEl = document.getElementById(el.id)!;
        setBoundElement(docEl);
        event.preventDefault();
    }

    const onNodeContextMenuDelete = (nodeId: string) => {
        if (nodeId == 'Start') {
            alert('Can not delete Start Node!');
            return;
        }

        const selectedNodes = nodes.filter((node) => node.id == nodeId);
        const selectedEdges = edges.filter((edge) => edge.id == nodeId);
        deleteElements({ nodes: selectedNodes, edges: selectedEdges });
        setBoundElement(document.getElementById('')!);
    }

    const onNodeMenuClose = () => {
        setSelectedNode('');
        setBoundElement(document.getElementById('')!);
    }

    const onNodeMenuSaveScript = (scriptText: any) => {
        let nodes = getNodes();
        let selectedNodeIx = nodes.findIndex((a) => a.id == selectedNode);
        nodes[selectedNodeIx].data.script = scriptText;
        setNodes(nodes);
    }

    const onCollectionChange = (e: any) => {
        setCollectionName(e.target.value);
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
            rectangle: reactFlowCustomNodes.default.RectangleNode,
            start: reactFlowCustomNodes.default.StartNode,
            end: reactFlowCustomNodes.default.EndNode
        };
    }

    const nodeTypes = useMemo(() => (getNodeTypes()), []);
    const [summary, setSummary] = useState('');
    const [collectionName, setCollectionName] = useState('');
    const [boundElement, setBoundElement] = useState(document.getElementById('')!);
    const [selectedNodeScript, setSelectedNodeScript] = useState('');
    const [selectedNode, setSelectedNode] = useState('');
    const onEdgeUpdateStart = (_: any, edge: Edge, handleType: HandleType) =>
        console.log(`start update ${handleType} handle`, edge);
    const onEdgeUpdateEnd = (_: any | TouchEvent, edge: Edge, handleType: HandleType) =>
        console.log(`end update ${handleType} handle`, edge);
    return (<>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <MainContextMenu onContextMenuSelected={onContextMenuSelected} />
            <NodeContextMenu boundElement={boundElement} nodeScript={selectedNodeScript} onClose={onNodeMenuClose} onSave={onNodeMenuSaveScript} onDelete={onNodeContextMenuDelete} />
            <Box position={'absolute'} top={0} left={0} zIndex={1000} width={400} marginLeft={5} marginTop={1}>
                <Box marginBottom={5}>
                    <div>
                        <TextField variant="filled" placeholder='Collection Name' style={{ height: '30 !important' }} onBlur={onCollectionChange}></TextField>
                        <Tooltip title="Save">
                            <Button variant="contained" onClick={onSave} style={{ height: 55, marginLeft: 5 }}>Save</Button>
                        </Tooltip>
                        <Button variant="contained" endIcon={<SendIcon />} style={{ height: 55, marginLeft: 5 }} onClick={onRunClick}>
                            Run
                        </Button>
                    </div>

                    <Tooltip title="Open Menu">
                        <Button variant="contained" onClick={getEdgeLogs} style={{ marginTop: 30 }}>Get Logs</Button>
                    </Tooltip>

                </Box>
                <TextField
                    label="Edge summary"
                    variant="outlined"
                    focused
                    value={summary}
                    multiline
                    fullWidth
                />
            </Box>
            <ReactFlowStyled
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                onConnect={onConnect}
                onNodeContextMenu={onNodeContextMenu}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                fitViewOptions={{ duration: 1200, padding: 0.1 }}
                maxZoom={50}
            >
                <ControlsStyled />
                <Background />
                <MiniMap />
            </ReactFlowStyled>
        </div>
    </>
    );
};

const ReactFlowBase = () => (
    <ReactFlowProvider>
        <UseZoomPanHelperFlow />
    </ReactFlowProvider>
);

export default ReactFlowBase;
