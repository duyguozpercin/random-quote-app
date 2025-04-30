
import { quotes } from './quotes.js';
import './App.css';
import { QuoteCArd } from './components/QuoteCard/index.js';

function App() {
  return (
    <div className="App">
      <QuoteCArd quote='test quote' author='test author'/>
    </div>
  );
}

export default App;
