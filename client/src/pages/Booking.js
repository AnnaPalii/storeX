// THIS PAGE IS FOR "GUEST" USERS TO BOOK SPACE
import React, { useEffect, useState } from "react";
import Datapicker from "../components/Datapicker";
import { Link, useRouteMatch } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import API from "../utils/API";
import userAPI from "../utils/userAPI";

function Booking () {
    const [booking, setBooking] = useState({});
    const match = useRouteMatch('/bookings/:id');
    console.log(match);

// Search for selected listing 
    useEffect(() => {
    API.getListing(match.params.id)
      .then(res => {
        console.log(res.data);
        setBooking(res.data);
    })
      .catch(err => console.log(err));
    }, [match.params.id])

// Search for current user name 
    useEffect(() => { 
      authenticate() 
    }, []);

//user authentication
	function authenticate() {
		return userAPI.authenticateUser()
			.then(({ data }) => {
			console.log('user:', data );
			})
			.catch((err) => console.log('registered user:', err.response));
	}

// Function that saves star and end date here, and pass it to child 
  

    return <>
            <h3>Booking Page</h3>
        <Container fluid>
          <p>{booking._id}</p>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
            <Card heading={booking._id}>
              {booking.body}
              <Datapicker />
              <br/>
              <button>Request to book this listing</button>
            </Card>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link className="text-dark" to="/listings">← Back to all listings</Link>
          </Col>
        </Row>
      </Container>
    </>
};

export default Booking;