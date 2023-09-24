import { Handle, Position } from 'reactflow';
const diamondStyle = { backgroundColor: 'brown', height: 10, width: 10, zIndex: 1, color: 'white' };
function DiamondNode(props: any) {
    return (
        <>
            <Handle type="target" position={Position.Top} id="a" style={diamondStyle} />
            <Handle type="source" position={Position.Left} id="b" style={diamondStyle} />
            <div className='symbol diamond'>
                {props.data.label}
                <input type='textarea'></input>
            </div>
            <Handle type="source" position={Position.Right} id="c" style={diamondStyle} />
            <Handle type="source" position={Position.Bottom} id="d" style={diamondStyle} />
        </>
    );
}

const triangleStyleTop = { backgroundColor: 'brown', height: 5, width: 5, zIndex: 1, color: 'white', borderColor: 'wheat' };
const triangleStyleLeft = { backgroundColor: 'brown', height: 5, width: 5, zIndex: 1, color: 'white', borderColor: 'wheat', top: 130 };
const triangleStyleRight = { backgroundColor: 'brown', height: 5, width: 5, zIndex: 1, color: 'white', borderColor: 'wheat', top: 130 };
function CustomTriangleNode(props: any) {
    return (
        <>
            <Handle type="target" position={Position.Top} id="b" style={triangleStyleTop} />
            <div className='customTriangle'>
                <div style={{ top: 65, width: 50, height: 50, position: 'fixed', left: 50 }}>
                    <p>{props.data.label}</p>
                </div>
            </div>
            <Handle type="source" position={Position.Right} id="c" style={triangleStyleLeft} />
            <Handle type="source" position={Position.Left} id="d" style={triangleStyleRight} />
        </>
    );
}

const defaultStyle = { backgroundColor: 'brown', height: 5, width: 5, zIndex: 1 };

function DefaultNode(className: string, label: string) {

    return (
        <>
            <Handle type="target" position={Position.Top} id="a" style={defaultStyle} />

            <div className={'symbol ' + className}>
                {label}
            </div>

            <Handle type="source" position={Position.Bottom} id="b" style={defaultStyle} />
        </>
    );
}
function OvalNode(props: any) {
    return DefaultNode('oval', props.data.label);
}

function CircleNode(props: any) {
    return DefaultNode('circle', props.data.label);
}

function CylinderNode(props: any) {
    return DefaultNode('cylinder', props.data.label);
}

function PentagonNode(props: any) {
    return DefaultNode('pentagon', props.data.label);
}

function ParallelogramNode(props: any) {
    return DefaultNode('parallelogram', props.data.label);
}

function RectangleNode(props: any) {
    return DefaultNode('rectangle', props.data.label);
}


export default { DiamondNode, OvalNode, CircleNode, CylinderNode, PentagonNode, CustomTriangleNode, ParallelogramNode, RectangleNode }
