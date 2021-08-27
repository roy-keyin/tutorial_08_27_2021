import './App.css';
import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { useRef, useState } from 'react';

function NumberDisplayPage(props){
  return (<div className="number-output-container">
    <p>The numbers are: </p><output>{JSON.stringify(props.numbers)}</output>
  </div>)
}

function NumberInputPage(props){
  const inputRef = useRef()
  const [doRedirect, setDoRedirect] = useState(false);

  const addNumber = (e)=>{
    if(inputRef.current){
      let newNumbers = [...props.numbers];
      let inputNumber = parseFloat(inputRef.current.value) 
      
      newNumbers.push(inputNumber);
      props.setNumbers(newNumbers);
      setDoRedirect(true);
    }
  }
  const normal_html = (<form className="number-input-form">
      <label htmlFor="numbers">Input a number:</label>
      <input ref={inputRef} name="numbers" type="text" placeholder="123" />
      <button type="button" onClick={addNumber}>Submit Number!</button>
    </form>);

  if(doRedirect){
    return <Redirect to="/display"></Redirect>
  }else{
    return normal_html;
  }
}

function NavBar(){
  return (<nav className="main-navigation">
    <Link to="/">Input Numbers</Link>
    <Link to="/display">Display Numbers</Link>
  </nav>)
}

function App() {
  let initialState = []
  if(localStorage.getItem('scores') !== null){
    let currentScores = localStorage.getItem('scores');
    initialState = JSON.parse(currentScores);
  }

  let [numbers, setNumbers] = useState(initialState);

  const modifiedSetNumbers = (newNumbers)=>{
    setNumbers(newNumbers);
    localStorage.setItem('scores', JSON.stringify(newNumbers));
  }

  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/" render={()=><NumberInputPage numbers={numbers} setNumbers={modifiedSetNumbers}></NumberInputPage>}></Route>
        <Route exact path="/display" render={()=><NumberDisplayPage numbers={numbers}></NumberDisplayPage>}></Route>
      </Switch>
    </Router>
  );
}

export default App;
