import React, { useState, useEffect} from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";


// pass the _id of the user
function Listings({ username, _id }) {
	// Setting our component's initial state
	const [comments, setComments] = useState([]);
	const [formObject, setFormObject] = useState({
	body: "",
	username: ""
	});
	
	// Load all comments and store them with setComments
	useEffect(() => {
      // set user after successful component mount
    setFormObject({
		body: "",
		username: ""})
    loadComments();
      // focus on titleInputEl if ref exists
    }, [username]);
   

	// Loads all comments, set them and show status/request booking 
	function loadComments() {
		API.getComments()
			.then((res) => setComments(res.data))
			.catch((err) => console.log(err));
	}

	return <>
		<Row>
			<Col size='md-12'>
				<section>
					<Col size='sm-12'>
                    <header style={{ textAlign: "left", fontSize:"40px", display: "block", padding: 20 }}> Available Listings</header>
					</Col>
				</section>
				
			</Col>
		</Row>,
		<Row>
			<Col size='md-12'>
				{comments.length ? (
					<Table>
					<tr>
					<th scope="col">Host Name</th>
					<th scope="col">Description</th>
					<th scope="col">Zip code</th>
					<th scope="col">Date Posted</th>
					<th scope="col">Click to Book</th>
					</tr>
						{comments.map(comment => (
							<Tr key={comment._role}>
								<Td>{comment.username}</Td>
								<Td>
									<Link
										to={"/comments/" + comment._id}
										style={{ color: '#000', textAlign: "center"}}>
										{comment.body}
									</Link>
								</Td>
								<Td>{comment.zipcode}</Td>
								<Td>
									
									{new Date(comment.date).toDateString()}
									</Td>
								<Td>
								<Link to=
								{{pathname:'/bookings/'+comment._id,
								state:{id:comment._id,
								body:comment.body}}}
								style={{ color: '#000', textAlign: "center"}}>
									{ comment.status.filter(s => s.requestingUserId === _id).length > 0
									? comment.status.filter(s => s.requestingUserId === _id)[0]['requested']
									: "Request Booking" }
                                    </Link>
								</Td>
							</Tr>
						))}
					</Table>
				) : (
					<h3>No listings are available at the moment</h3>
				)}
			</Col>
		</Row>,
	</>;
}

export default Listings;