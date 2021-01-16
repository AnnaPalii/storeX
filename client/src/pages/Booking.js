// THIS PAGE IS FOR "GUEST" USERS TO BOOK SPACE
import React, { useEffect, useState } from "react";
import Datapicker from "../components/Datapicker";
import { Link, useRouteMatch } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import API from "../utils/API";

export const Booking = props => {
    const [booking, setBooking] = useState({})
    const match = useRouteMatch('/bookings/:id');

    console.log(match);
    useEffect(() => {
        API.getListing(match.params.id)
          .then(res => {
            console.log(res.data);
             setBooking(res.data);
        })
          .catch(err => console.log(err));
      }, [match.params.id])


    return <>
            <h3>Booking Page</h3>
        <Container fluid>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
            <Card heading={booking.username}>
              {booking.body}
              <Datapicker />
            </Card>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link className="text-dark" to="/comments">← Back to all listings</Link>
          </Col>
        </Row>
      </Container>
    </>
};

export default Booking;