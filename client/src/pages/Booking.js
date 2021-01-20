// THIS PAGE IS FOR "GUEST" USERS TO BOOK SPACE
import React, { useEffect, useState } from "react";
import Datapicker from "../components/Datapicker";
import { Link, useRouteMatch } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import API from "../utils/API";
import Button from 'react-bootstrap/Button'


function Booking (props) {
    console.log(props);
    const [booking, setBooking] = useState({});
    const [formObject, setFormObject] = useState({
      startDate: "",
      endDate: "",
      requestingUser: props.username,
      requestingUserId: props._id,
      requested: ""
      });

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
  
  function book_store(event){
    console.log(formObject);
    console.log(booking);
    booking.status.push(formObject);
    
    // save to database
    API.updateListing(booking._id, booking)
    .then((res)=> { console.log(res); })
    .catch((err)=> { console.log(err); });

    // show Success Massage
    alertSuccess ();
  }

  function  alertSuccess () {
    alert("Your message was sent to Host");

  }


  function setBookingDates(dates){
    setFormObject({ ...formObject, ...dates, "requested": "Requested" });
  }

// Function that saves star and end date here, and pass it to child 
  

    return <>

          <Col size='sm-12'>
          <header style={{ textAlign: "left", fontSize:"40px", display: "block", padding: 20 }}> Book This Space</header>
					</Col>
        <Container fluid>
        <p></p>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
            <Card heading={booking._id} imageUrl={booking.imageUrl}>
              {booking.body}
              <Datapicker setBookingDates={setBookingDates} />
              <br/>
              <Button variant="secondary" size="lg" style={{marginTop: 10, padding: 10,}} onClick={book_store} href="/listings">
              Request to book this listing
              </Button>
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