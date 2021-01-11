import React, { useState, useEffect} from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";
import Moment from 'moment';


function Listings({ username }) {
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
   

	// Loads all comments and sets them to comments
	function loadComments() {
		API.getComments()
			.then((res) => setComments(res.data))
			.catch((err) => console.log(err));
	}




	return <>
		<Row>
			<Col size='md-12'>
				<form>
					<Col size='sm-12'>
                    <h3>ALL LISTINGS</h3>
					</Col>

				</form>
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
					<th scope="col">Your Action</th>
					</tr>
						{comments.map(comment => (
							<Tr key={comment._role}>
								<Td>{comment.username}</Td>
								<Td>
									<Link
										to={"/comments/" + comment._id}
										style={{ textAlign: "left", display: "block" }}>
										{comment.body}
									</Link>
								</Td>
								<Td>{comment.zipcode}</Td>
								<Td>
									
									{new Date(comment.date).toDateString()}
									</Td>
								<Td>
                                <Link to='/booking'>
                                    Book Space 
                                    <i class="fas fa-file-signature"></i>
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