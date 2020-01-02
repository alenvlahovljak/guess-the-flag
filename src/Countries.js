import React, {Component} from "react";
import "./Countries.css";

const Country = ({country, getCountry}) =>{
  return(
    <span className="country-item">
      <input type="radio" name="country" value={country.name} onClick={()=> getCountry(country)}/>{country.name}
    </span>
  );
}

const ValidateBtn = ({makeReq, randCountry, pickedCountry, validate, isRight}) =>{
  if(pickedCountry.name){
    if(isRight===true || isRight===false) {return <button onClick={()=> makeReq()}>Next flag</button>}
    else {return <button onClick={()=> validate(randCountry, pickedCountry)}>Guess</button>}
  } else{
    return <button disabled>Guess</button>
  }
}

class Countries extends Component{
  render(){
    const {getCountry, isRight, randCountry} = this.props;
    const countries = this.props.countries.map((country, index)=> <Country key={index} country={country} getCountry={getCountry}/>); 
    if(countries && countries.length>0){
      if(isRight === true){
        return (
          <div className="countries-list">
            <span>You're right!</span>
            <ValidateBtn {...this.props} />
          </div>
        );
      } else if(isRight === false){
          return(
            <div className="countries-list">
              <span>Wrong! Correct answers was: {randCountry.name}</span>
              <ValidateBtn {...this.props} />
            </div>
          );
      } else{
          return(
            <div className="countries-list">
              {countries}
              <ValidateBtn {...this.props} />
            </div>
          );
      }

    } else{
      return <span>Loading...</span>
    }
  }
}

export default Countries;