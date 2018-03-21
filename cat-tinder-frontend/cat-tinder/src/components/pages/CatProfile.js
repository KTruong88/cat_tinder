import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';


class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiUrl: "http://localhost:3000",
      cat: [],
      views: 0
      }
    }

    componentWillMount(){
      const id = this.props.match.params.id
      fetch(`${this.state.apiUrl}/cats/` + id)
      .then((rawResponse) =>{
        return rawResponse.json()
      })
      .then((parsedResponse)=>{
        this.setState({cat: parsedResponse.cat})
      })
    }

  //   componentWillMount(){
  //   let cat = this.state.cat.find(function(listing){
  //     return listing.id === parseInt(id)
  //   })
  //   if(cat){
  //     this.setState({cat: cat})
  //   }
  // }

  newView() {
    let counter = this.state.views += 1;
    this.setState({views: counter})
  }

  render(){
    // debugger
    return(
      <div>
      <ListGroup>

              <ListGroupItem
                header={
                  <h4>
                    <span className='cat-name'>
                      {this.state.cat.name}
                    </span>
                    - <small className='cat-age'>{this.state.cat.age} years old</small>
                  </h4>
                }>
                <span className='cat-enjoys'>
                  {this.state.cat.enjoys}
                </span>
              </ListGroupItem>
                  <span className='profile-views'>
                  Profile views: {this.state.views}
                  </span>
        </ListGroup>
      </div>
    )
  }
}

export default Profile;
