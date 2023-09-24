export default interface FlowNode {
    Id: string,
    Type: FlowNodeType,
    Source: string[],
    Destionation: string[],
    ExecutionText: string,
    ExecutionType: string,
    IsAsync: boolean,
    Css: string,
    Icon: string,
    EdgeType: string
}