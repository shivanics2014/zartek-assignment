import './App.css';
import { DraggableList } from './DraggableList';
import { TypingTest } from './TypingTest';

function App() {

  return(
		<div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
		<b>Draggable List</b>
        <DraggableList />
		<br />
		<b>Typing Test</b>
		<TypingTest testParagraph={'Hi, My name is Shivani and I have graduated from APJ Abdul Kalam Technical University in 2018.'}/>
		</div>
		)
}

export default App;