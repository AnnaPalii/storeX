// THIS PAGE IS FOR "GUEST" USERS TO BOOK SPACE
import React, { useEffect, useState } from "react";
import Datapicker from "../components/Datapicker";
import { Link, useRouteMatch } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import API from "../utils/API";


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
  }

  function setBookingDates(dates){
    setFormObject({ ...formObject, ...dates, "requested": true });
  }

// Function that saves star and end date here, and pass it to child 
  

    return <>
            <h3>Booking Page</h3>
        <Container fluid>
        <p></p>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
            <Card heading={booking._id}>
              {booking.body}
              <Datapicker setBookingDates={setBookingDates} />
              <br/>
              <button onClick={book_store}>Request to book this listing</button>
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