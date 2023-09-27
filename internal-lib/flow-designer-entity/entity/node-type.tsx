enum FlowNodeType {
    // (Oval):Represents the beginning or end of a process.  Usually depicted as an oval shape.
    Start,
    // (Oval): Represents the beginning or end of a process.  Usually depicted as an oval shape.
    End,
    //(Rectangle):    
    // Represents a specific step or action in the process.
    // Usually depicted as a rectangle.
    Process,
    // (Diamond):    
    // Represents a point in the process where a decision is made.
    // Usually depicted as a diamond shape.
    // It has two or more arrows coming out, each indicating a possible path based on the decision.
    Decision,
    //(Parallelogram):    
    // Represents input data or output results.
    // Usually depicted as a parallelogram shape.
    Input,
    //(Parallelogram):    
    // Represents input data or output results.
    // Usually depicted as a parallelogram shape.
    Output,
    //(Circle):    
    // Indicates a connection point between different parts of the flowchart.
    // Usually depicted as a circle shape.
    Connector,
    //(Rectangle with Folded Corner):    
    // Represents a document or report.
    // Usually depicted as a rectangle with a folded corner.
    Document,
    //(Rectangle with Double Lines):    
    // Represents a process that is defined elsewhere, often in a separate document.
    // Usually depicted as a rectangle with double lines.
    PredefinedProcess,
    //(Wavy Lines):    
    // Indicates a delay or waiting period in the process.
    // Usually depicted with wavy lines inside a rectangle.
    Delay,
    //(Cylinder):    
    // Represents data storage or a database.
    // Usually depicted as a cylinder shape.
    Data,
    // (Tape):    
    // Represents direct access storage like a hard drive.
    // Usually depicted as a rectangle with a perpendicular line (representing the read/write head).
    DirectAccessStorage,
    // (Pentagon):    
    // Represents manual input from a user.
    // Usually depicted as a pentagon shape.
    ManualInput,
    //(Monitor):    
    // Represents the display of information.
    // Usually depicted as a monitor or screen shape.
    Display,
    // (Two Vertical Bars):    
    // Indicates a connection to another part of the process on a different page.
    // Usually depicted as two vertical bars.
    OffPageConnector,
    //(Semi-circle):    
    // Represents a logical OR condition.
    // Usually depicted as a semi-circle.
    Or,
    // (Circle with a Plus Sign):    
    // Represents a point where multiple paths converge into one.
    // Usually depicted as a circle with a plus sign.
    SummingJunction,
}

enum FlowSymbolType {
    Oval,
    Rectangle,
    Diamond,
    Parallelogram,
    Circle,
    Cylinder,
    Pentagon
}

export { FlowNodeType, FlowSymbolType };