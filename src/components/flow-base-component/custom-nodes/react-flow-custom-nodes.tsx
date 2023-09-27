import { Handle, Position } from 'reactflow';

const diamondStyle = { backgroundColor: 'brown', height: 5, width: 5, zIndex: 1, color: 'white' };
function DiamondNode(props: any) {    
    return (
        <>            
            <Handle type="target" position={Position.Top} id={props.id + '_target'}  style={diamondStyle} />
            <Handle type="source" position={Position.Left} id={props.id + '_source'}  style={diamondStyle} />
            <div id={props.id} className='symbol diamond'>
                <strong>{props.data.label}</strong>
            </div>
            <Handle type="source" position={Position.Right} id={props.id + '_source1'}  style={diamondStyle} />
            <Handle type="source" position={Position.Bottom} id={props.id + '_source2'}  style={diamondStyle} />
        </>
    );
}

const triangleStyleTop = { backgroundColor: 'brown', height: 5, width: 5, zIndex: 1, color: 'white', borderColor: 'wheat' };
const triangleStyleLeft = { backgroundColor: 'brown', height: 5, width: 5, zIndex: 1, color: 'white', borderColor: 'wheat', top: 100 };
const triangleStyleRight = { backgroundColor: 'brown', height: 5, width: 5, zIndex: 1, color: 'white', borderColor: 'wheat', top: 100 };
function CustomTriangleNode(props: any) {
    return (
        <>
            <Handle type="target" position={Position.Top} id={props.id + '_target'} style={triangleStyleTop} />
            <div id={props.id} className='customTriangle'>
                <div style={{ top: 65, width: 50, height: 50, position: 'fixed', left: 35 }}>
                    <strong>{props.data.label}</strong>
                </div>
            </div>
            <Handle type="source" position={Position.Right} id={props.id + '_source'} style={triangleStyleLeft} />
            <Handle type="source" position={Position.Left} id={props.id + '_source2'}  style={triangleStyleRight} />
        </>
    );
}

function StartNode() {
    return (
        <>
            <div id={'startSymbol'} className={'symbol oval'}>
                <strong>START</strong>
            </div>
            <Handle type="source" position={Position.Bottom} id={'start_source'} style={defaultStyle} />
        </>
    );
}

function EndNode() {
    return (
        <>
            <Handle type="target" position={Position.Top} id="a" style={defaultStyle} />
            <div id={'endSymbol'} className={'symbol oval'}>
                <strong>END</strong>
            </div>
        </>
    );
}

const defaultStyle = { backgroundColor: 'brown', height: 5, width: 5, zIndex: 1 };

function DefaultNode(className: string, label: string, id: string) {
    return (
        <>
            <Handle type="target" position={Position.Top} id={id + '_target'} style={defaultStyle} />

            <div id={id} className={'symbol ' + className}>
                <strong>{label}</strong>
            </div>

            <Handle type="source" position={Position.Bottom} id={id + '_source'} style={defaultStyle} />
        </>
    );
}

function OvalNode(props: any) {
    return DefaultNode('oval', props.data.label, props.id);
}

function CircleNode(props: any) {
    return DefaultNode('circle', props.data.label, props.id);
}

function CylinderNode(props: any) {
    return DefaultNode('cylinder', props.data.label, props.id);
}

function PentagonNode(props: any) {
    return DefaultNode('pentagon', props.data.label, props.id);
}

function ParallelogramNode(props: any) {
    return DefaultNode('parallelogram', props.data.label, props.id);
}

function RectangleNode(props: any) {
    return DefaultNode('rectangle', props.data.label, props.id);
}

export default { DiamondNode, OvalNode, CircleNode, CylinderNode, PentagonNode, CustomTriangleNode, ParallelogramNode, RectangleNode, StartNode, EndNode }
