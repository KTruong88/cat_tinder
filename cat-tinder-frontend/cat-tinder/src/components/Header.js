import React, {Component} from 'react';

class Header extends Component {

  render(){
    return(
       <div>
       <h1>Cat Tinder</h1>
       <h3>...like tinder but for Cats!</h3>
        <ul className="nav-container">
          <a href="/" ><button id="button1" type="button" className="nav-button1"><li>Add a Cat</li></button></a>
            <a href="/cats" ><button id="button2" type="button" className="nav-button2"><li>Show me the Cats</li></button></a>
        </ul>
        </div>
    )}
}

export default Header
