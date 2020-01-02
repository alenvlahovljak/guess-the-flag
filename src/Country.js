import React, {Component} from "react";
import "./Country.css";

const RandomFlag = (props)=>{
    return(
      <img className="flag" src={props.country.flag} alt={"Random flag"}/>
    );
}

class Country extends Component{
  render(){
    const {randCountry} = this.props; 
    return(
      <RandomFlag key={0} country={randCountry}/>
    );
  }
}

export default Country;