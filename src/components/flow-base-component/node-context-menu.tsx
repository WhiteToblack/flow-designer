import * as React from 'react';
import Popover, { PopoverProps } from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';

interface NodeContextMenuProps {
    boundElement?: Element,
    onDelete: (nodeId: string) => void,
    onSave: (nodeScript: string) => void,
    onClose: () => void,
    nodeScript: string
}

export default function NodeContextMenu(props: NodeContextMenuProps) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<PopoverProps['anchorEl']>(null);
    const [nodeScript, setNodeScript] = React.useState(props!.nodeScript!);
    const handleClose = () => {
        props.onClose();
        setNodeScript('');
        setOpen(false);
    };

    React.useEffect(() => {
        if (props.boundElement == null) {
            return;
        }

        if (props.nodeScript && props.nodeScript != null && props.nodeScript.length > 0) {
            setNodeScript(props.nodeScript);
        }

        handleOpen();
    }, [props.boundElement])

    const handleOpen = () => {
        const getBoundingClientRect = () => {
            return props.boundElement!.getBoundingClientRect();
        };

        setOpen(true);
        setAnchorEl({ getBoundingClientRect, nodeType: 1 });
    };

    const handleDeleteClick = () => {
        const id = props.boundElement?.id!;
        props.onDelete(id);
        handleClose();
    }

    const onSaveClick = () => {
        props.onSave(nodeScript);
        handleClose();
    }

    const onNodeScriptChange = (e: any) => {
        setNodeScript(e.target.value);
    }

    const id = open ? 'virtual-element-popover' : undefined;

    return (
        <div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                onClose={handleClose}
            >
                <Button onClick={handleDeleteClick} variant='contained' className='sencodary' style={{ width: '100%' }}>Delete</Button>
                <Button onClick={onSaveClick} variant='contained' className='sencodary' style={{ width: '100%', marginTop: 5 }}>Save</Button>
                <br></br>
                <TextField multiline variant='filled' value={nodeScript} onChange={onNodeScriptChange}></TextField>
            </Popover>
        </div>
    );
}