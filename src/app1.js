import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;




const person ={
    name:"marianna",
    walk(){},
    talk(){}
}
person.talk();
person.name='';

const targetMember = 'name';
person[targetMember.value]='Sherry';

const square = function(number){
    return number * number;
}
const square2 = (number) => number * number;
console.log(square2(5));

const job = [
    { id:1, isActive:true},
    { id:2, isActive:true},
    { id:3, isActive:false},
]
const activeJobs = job.filter(function(job){return job.isActive;});
const activeJobs2 = job.filter(job => job.isActive);

const person2 = {
   talk() {
    setTimeout(function(){
        console.log('this',this);
    },1000)
   }
}
person2.talk();
