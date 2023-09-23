
import MainContainer from './components/main-container/main-container';
import FlowDesignerDb from './components/database-connnector/mongo-operation';

function App() {
  debugger;
  FlowDesignerDb.Run();
  return (
    <>
      <MainContainer></MainContainer>
    </>
  )
}

export default App
