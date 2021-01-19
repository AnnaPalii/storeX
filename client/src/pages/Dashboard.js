// THIS PAGE IS FOR "HOST" USERS TO TRACK THEIR EARNINGS/OTHER IDEAS

import React, { useState, useEffect }  from "react";
import API from "../utils/API";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";
import { DropdownButton, Dropdown } from 'react-bootstrap';


function Dashboard ({ username }) {
    const [requests, setRequests] = useState([]); 
    const [origListings, setListings] = useState([]);
 
// Load all comments and store them with setComments
useEffect(() => {
    // set user after successful component mount
    setRequests({
    body: "", 
    zipcode: ""})

    loadComments();
    // focus on titleInputEl if ref exists

}, [username]);



	// Loads Host Listings 
    function loadComments() {
        API.getComments()
            .then((res) => {
                const listings = res.data.filter(listing => listing.username === username);
                // console.log(listings);
                setListings(listings);
                let requests = {};
                for(let l in listings){
                    for (let s in listings[l]['status']){
                        let status = listings[l]['status'][s];
                        let request = { 
                            'body': listings[l]['body'], 
                            'listingId': listings[l]['_id'],
                            ...status
                        }
                        requests[status._id.toString()] = request;
                    }
                }
                setRequests(requests);
                // console.log(requests);
            })
            .catch((err) => console.log(err));
    }


// Fetch status id and update status in DB
   function handleSelect(key, e, id){
        console.log(requests);
        let status = requests[id];
        status["requested"] = key;
        let req = {};
        req[id] = status;
        setRequests({...requests, ...req});
        let listing = origListings.filter(ol => ol._id == [status['listingId']])[0];
        for (let s in listing['status']){
            if (listing['status'][s]['_id'] == id){
                listing['status'][s]['requested'] = status['requested'];
                break;
            }
        }
    
        console.log(listing);
        API.updateListing(listing._id, listing)
        .then((res)=>{console.log(res);})
        .catch((err)=> {console.log(err);});

    }



    return <>
        <Row>
		<header style={{ textAlign: "center", fontSize:"70px", display: "block", padding: 20 }}>
			My Requests
		</header>
        </Row>
        
        <Row>
			<Col size='md-12'>
				{Object.keys(requests).length ? (
					<Table>
						<Tr>
						<Td>Description</Td>
						<Td>Requesting Guest</Td>
						<Td>Start Date</Td>
						<Td>End Date</Td>
						<Td>Answer to Request</Td>
						</Tr>
						{Object.values(requests).map(request => (
							<Tr key={request._id}>
								<Td>{request.body}</Td>
                                <Td>{request.requestingUser}</Td>
								<Td>{new Date(request.startDate).toDateString()}</Td>
                                <Td>{new Date(request.endDate).toDateString()}</Td>
                                <Td>
                                { request.requested != "Requested" ? request.requested : <DropdownButton id="dropdown-basic-default" title="Options" onSelect={(key, event) => handleSelect(key, event, request._id)}>
                                <Dropdown.Item eventKey="Accepted">Accept</Dropdown.Item>
                                <Dropdown.Item eventKey="Declined">Decline</Dropdown.Item>
                                </DropdownButton>}
                                </Td>
								<Td></Td>
                                <Td></Td>
							</Tr>
						))}
					</Table>
				) : (
					<h3>No Results to Display</h3>
				)}
			</Col>
		</Row>

        </>;
};

export default Dashboard;