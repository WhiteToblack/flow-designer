import { FlowSymbolType } from "../../../internal-lib/flow-designer-entity/entity/node-type";

export default function CalculateNodeTypeBySymbol(symbolId: string) {
    switch (symbolId) {
        case 'oval':
            return FlowSymbolType.Oval;
        case 'circle':
            return FlowSymbolType.Circle;
        case 'cylinder':
            return FlowSymbolType.Cylinder;
        case 'rectangle':
            return FlowSymbolType.Rectangle;
        case 'pentagon':
            return FlowSymbolType.Pentagon;
        case 'parallelogram':
            return FlowSymbolType.Parallelogram;
        default:
            return FlowSymbolType.Oval;
    }
}