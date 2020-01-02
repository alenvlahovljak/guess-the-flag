import React, {Component} from 'react';
import Countries from "./Countries";
import Country from "./Country";
import Background from "./background.jpg";
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {countries: [""], randCountry: {flag: "Loading..."}, pickedCountry: "Country isn't picked", isRight: "none"};
  }
  componentDidMount(){
   this.makeReq(); 
  }
  makeReq = async () =>{
    const URL = "https://restcountries.eu/rest/v2/all";
    const countries = await fetch(URL).then(res => res.json()).then(countries => countries);
    let arr = [];
    let set = new Set();
    while(set.size<4) {set.add(Math.floor(Math.random()*countries.length))}
    for(let i of set) {arr.push(countries[i])}
    this.setState({countries: arr, isRight: "none"}, ()=>{
      const rand = Math.floor(Math.random()*arr.length);
      const randCountry = arr.filter((country, i)=> i===rand)[0];
      this.setState({randCountry});
    });
  }
  pickedCountry = (val)=>{
    this.setState({pickedCountry: val});
  }
  validate = (rand, picked)=>{
    if(rand.name && picked.name){
      if(rand.name===picked.name){
        this.setState({isRight: true});
      }
      else{
        this.setState({isRight: false});
      }
    } else {return};
  }
  render(){
    let view = "Loading flag";
    if(this.state.countries && this.state.countries.length>0) {view = <Country {...this.state} />}
    return(
      <main className="App" style={{backgroundImage:`url(${Background})`}}>
        <Countries {...this.state} getCountry={this.pickedCountry} validate={this.validate} makeReq={this.makeReq} randCountry={this.state.randCountry} />
        {view}
      </main>
    );
  }
}

export default App;
