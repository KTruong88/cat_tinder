import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { Grid, Row, Col, PageHeader } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Cats from './components/pages/Cats'
import NewCat from './components/pages/NewCat'
import Profile from './components/pages/CatProfile'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiUrl: "http://localhost:3000",
      cats: [],
      newCatSuccess: false,
      errors: null
    }
  }

    componentWillMount(){
    fetch(`${this.state.apiUrl}/cats`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((parsedResponse)=>{
      this.setState({cats: parsedResponse.cats})
    })
  }

  handleNewcat(params){
    fetch(`${this.state.apiUrl}/cats`,
      {
        body: JSON.stringify(params),  // <- we need to stringify the json for fetch
        headers: {  // <- We specify that we're sending JSON, and expect JSON back
          'Content-Type': 'application/json'
        },
        method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
      }
    )
    .then((rawResponse)=>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      if(parsedResponse.errors){ // <- Check for any server side errors
        this.setState({errors: parsedResponse.errors})
      }else{
        const cats = Object.assign([], this.state.cats)
        cats.push(parsedResponse.cat) // <- Add the new cat to our list of cats
        this.setState({
          cats: cats,  // <- Update cats in state
          errors: null, // <- Clear out any errors if they exist
          newCatSuccess: true // <- This is the new flag in state
        })
      }
    })
  }

  newCatSubmit(){
    this.NewCat.handleSubmit();
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
           <div>
             <Route exact path="/" render={props => (
               <Grid className="newCat">

               <NewCat onSubmit={this.handleNewcat.bind(this)}
                  errors={this.state.errors && this.state.errors.validations}
                />
                { this.state.newCatSuccess && <Redirect to="/cats" /> }
               </Grid>
             )} />

               <Route exact path="/cats" render={props => (
                <Grid>
                  <PageHeader>
                    <Row>
                      <Col xs={8}>
                        <h1 className='subtitle'>All the Cats</h1>
                        <Cats cats={this.state.cats} />
                        { !this.state.newCatSuccess && <Redirect to="/cats" /> }
                      </Col>
                    </Row>
                  </PageHeader>
                </Grid>
            )} />
            <Route path='/cats/:id' component={Profile} />

           </div>
         </Router>
      <Footer />
    </div>
    );
  }
}

export default App;
