// THIS PAGE IS FOR "HOST" USERS TO TRACK THEIR EARNINGS/OTHER IDEAS

import React, { useState, useEffect }  from "react";
import API from "../utils/API";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";
import { DropdownButton, Dropdown } from 'react-bootstrap';


function Dashboard ({ username }) {
    const [requests, setRequests] = useState([]); 
    const [value,setValue]=useState({
        title:"Reply to Guest"
    });

// Load all comments and store them with setComments
useEffect(() => {
    // set user after successful component mount
    setRequests({
      body: "",
      zipcode: ""
  })

  loadComments();

    // focus on titleInputEl if ref exists
  }, [username]);



	// Loads all listings and sets them
    function loadComments() {
        API.getComments()
            .then((res) => {
                const listings = res.data.filter(listing => listing.username === username);
                console.log(listings);
                let requests = [];
                for(let l in listings){
                    for (let s in listings[l]['status']){
                        let status = listings[l]['status'][s];
                        let request = { 
                            'body': listings[l]['body'], 
                            ...status
                        }
                        requests.push(request);
                    }
                }
                setRequests(requests);
                console.log(requests);
            })
            .catch((err) => console.log(err));
    }

   function handleSelect(e){
  setValue(e)
  console.log(e);
    }

    return <>
        <Row><h3>Dashboard Page</h3></Row>
        <Row>
			<Col size='md-12'>
				{requests.length ? (
					<Table>
						<Tr>
						<Td>Description</Td>
						<Td>Requesting Guest</Td>
						<Td>Start Date</Td>
						<Td>End Date</Td>
						<Td>Answer to Request</Td>
						</Tr>
						{requests.map(requests => (
							<Tr key={requests._id}>
								<Td>{requests.body}</Td>
                                <Td>{requests.requestingUser}</Td>
								<Td>{new Date(requests.startDate).toDateString()}</Td>
                                <Td>{new Date(requests.endDate).toDateString()}</Td>
                                <Td>
                                <DropdownButton id="dropdown-basic-default" title={value.title} onSelect={handleSelect}>
                                <Dropdown.Item eventKey="Accepted">Accept</Dropdown.Item>
                                <Dropdown.Item eventKey="Declined">Decline</Dropdown.Item>
                                </DropdownButton>
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