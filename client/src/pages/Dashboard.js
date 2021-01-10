import React, { Component } from "react";
import userAPI from "../utils/userAPI";
import {  Redirect, Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";



//show mylistings 





//show host listings



class Dashboard extends Component {
    state = {
      comments: [],
      q: "",
      message: "Show My Listings"
    };
  
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
  

    //need to check this 
    showListings = () => {
      API.showListingss(this.state.q)
        .then(res =>
          this.setState({
            books: res.data
          })
        )
        .catch(() =>
          this.setState({
            books: [],
            message: "No New Listings Found, Try a Different Query"
          })
        );
    };
  
    handleFormSubmit = event => {
      event.preventDefault();
      this.showListings();
    };
  
    handleListingSave = id => {
      const listing = this.state.listingss.find(listings => listing.id === id);
  
    //  API.saveListing({
      //  googleId: book.id,
       // title: book.volumeInfo.title,
       // subtitle: book.volumeInfo.subtitle,
       // link: book.volumeInfo.infoLink,
       // authors: book.volumeInfo.authors,
      //  description: book.volumeInfo.description,
       // image: book.volumeInfo.imageLinks.thumbnail
    //  }).then(() => this.getListings());
   // };
  
    render() {
      return (
        <Container>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1 className="text-center">
                  <strong>(React) Store X</strong>
                </h1>
                <h2 className="text-center">Find the Space yu Need.</h2>
              </Jumbotron>
            </Col>
            <Col size="md-12">
              <Card title="Listing Search" icon="far fa-book">
                <Form
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  q={this.state.q}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <Card title="Results">
                {this.state.listings.length ? (
                  <List>
                    {this.state.listingss.map(book => (
                      <Book
                        key={book.id}
                        title={book.volumeInfo.title}
                        subtitle={book.volumeInfo.subtitle}
                        link={book.volumeInfo.infoLink}
                        authors={book.volumeInfo.authors.join(", ")}
                        description={book.volumeInfo.description}
                        image={book.volumeInfo.imageLinks.thumbnail}
                        Button={() => (
                          <button
                            onClick={() => this.handleBookSave(book.id)}
                            className="btn btn-primary ml-2"
                          >
                            Save
                          </button>
                        )}
                      />
                    ))}
                  </List>
                ) : (
                  <h2 className="text-center">{this.state.message}</h2>
                )}
              </Card>
            </Col>
          </Row>
          <Footer />
        </Container>
      );
    }
  }
  




export default Dashboard;