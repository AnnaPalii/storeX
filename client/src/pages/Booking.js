// THIS PAGE IS FOR "GUEST" USERS TO BOOK SPACE

import React, { Component } from "react";
import Datapicker from "../components/Datapicker";
import userAPI from "../utils/userAPI";
import {  Redirect, Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

export const Booking = () => {
    return <>
            <h3>Booking Page</h3>

            <Datapicker />


    </>
};

export default Booking;