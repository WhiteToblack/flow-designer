import { useEffect, useLayoutEffect, useState } from "react";
import './flow-context-menu.css'
interface IMainContextMenuProps {
    isVisible: boolean,
    onContextMenuSelected: (symbolId: string) => void
}

const MainContextMenu: React.FC<IMainContextMenuProps> = (props) => {
    const [isVisible, setVisible] = useState(false);
    let allEventBinded = false;
    useEffect(() => {
        setVisible(props.isVisible);
        togglePopup();
    }, [props.isVisible]);

    useLayoutEffect(() => {
        if (allEventBinded) {
            return;
        }
        var popup = document.getElementById("popupContainer")!;
        popup.parentElement?.addEventListener('click', () => {
            togglePopup();
        })
        var symbols = Array.from(popup.getElementsByClassName('symbol'));
        symbols.forEach((element: any) => {
            element.addEventListener('click', (e: any) => {
                props.onContextMenuSelected(e.target.getAttribute('symbol-id'));
            })
        });
        allEventBinded = true;
    }, [])

    const togglePopup = () => {
        setVisible(!isVisible);
        var popup = document.getElementById("popupContainer")!;
        popup.style.display = isVisible ? "flex" : "none";
    }

    return <>
        <div className="popup-container" id="popupContainer">
            <div className="popup-content">
                <div className="symbol oval" symbol-id={'oval'} title="Start/End"></div>
                <div className="symbol customTriangle" symbol-id={'customTriangle'} title="customTriangle"></div>
                <div className="symbol diamond" symbol-id={'diamond'} title="Decision">
                </div>
                <div className="symbol parallelogram" symbol-id={'parallelogram'} title="Input/Output"></div>
                <div className="symbol circle" symbol-id={'circle'} title="Connector"></div>
                <div className="symbol rectangle" symbol-id={'rectangle'} title="Direct Access Storage - Process - Document - Predefined Process - Delay"></div>
                <div className="symbol cylinder" symbol-id={'cylinder'} title="Data"></div>
                <div className="symbol pentagon" symbol-id={'pentagon'} title="Manual Input"></div>               
            </div>
        </div>
    </>

}

export default MainContextMenu;