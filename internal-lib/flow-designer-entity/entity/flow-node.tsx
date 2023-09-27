export default interface FlowNode {
    Id: string,
    SymbolType: string,
    Source: string[],
    Destination: string[],
    CollectionName: string,
    PositionX: number,
    PositionY: number,
    Sequence: number,
    ExecutionType?: string,
    IsAsync?: boolean,
    Css?: string,
    Icon?: string,
    EdgeType?: string,
    ScriptData?: string,
    ScriptTextPath?: string
}