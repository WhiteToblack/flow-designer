import { useState } from "react";
import './flow-context-menu.css'
import { Box, Button, Modal, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField, Typography } from "@mui/material";
import React from "react";
import { ChangeHistory, Circle, Crop169, CropPortrait, DiamondSharp, Pentagon, RectangleSharp } from "@mui/icons-material";

interface IMainContextMenuProps {
    onContextMenuSelected: (symbolId: string, symbolTitle: string) => void
}

const MainContextMenu: React.FC<IMainContextMenuProps> = (props) => {
    const [symbolId, setSymbolId] = useState('');
    const [symbolTitle, setSymbolTitle] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [modelOpen, setOpenModel] = React.useState(false);
    const handleOpenModel = () => setOpenModel(true);
    const handleCloseModel = () => setOpenModel(false);

    const onModalSaveClick = () => {
        onModelClosed(symbolTitle);
    }

    const onSymbolSelected = (symbolId: string) => {
        setSymbolId(symbolId);
        handleOpenModel();
    }

    const onModelClosed = (title: string) => {
        handleCloseModel();
        handleClose();
        props.onContextMenuSelected(symbolId, title);
    }

    const onSymbolTitleChange = (e: any) => {
        setSymbolTitle(e.currentTarget.value);
    }

    const actions = [
        { icon: <ChangeHistory />, name: 'customTriangle' },
        { icon: <Pentagon />, name: 'pentagon' },
        { icon: <CropPortrait />, name: 'cylinder' },
        { icon: <RectangleSharp />, name: 'rectangle' },
        { icon: <Circle />, name: 'circle' },
        { icon: <Crop169 />, name: 'parallelogram' },
        { icon: <DiamondSharp />, name: 'diamond' },
        { icon: <Circle />, name: 'oval' }
    ];

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return <>
        <Modal
            open={modelOpen}
            onClose={onModelClosed}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 600, textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4">Enter Symbol Title Via Selected Symbol</Typography>
                <TextField id="filled-basic" label="Please Enter" variant="standard" onBlur={onSymbolTitleChange} style={{ width: 200, marginLeft: 200 }} />
                <Button type="button" variant="contained" onClick={onModalSaveClick} style={{ marginTop: 10, width: 200, marginLeft: 200 }}>Save</Button>
            </Box>
        </Modal>
        <SpeedDial
            ariaLabel="SpeedDial controlled open example"
            sx={{ position: 'absolute', bottom: 16, left: 10 }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={onSymbolSelected.bind(this, action.name)}
                />
            ))}
        </SpeedDial>

    </>

}

export default MainContextMenu;