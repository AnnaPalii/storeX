import React, { useState, useEffect} from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";


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
                    <p>ALL LISTINGS</p>
					</Col>

				</form>
			</Col>
		</Row>,
		<Row>
			<Col size='md-12'>
				{comments.length ? (
					<Table>
						{comments.map(comment => (
							<Tr key={comment._role}>
								<Td>
									<Link
										to={"/comments/" + comment._id}
										style={{ textAlign: "left", display: "block" }}>
										<strong>{comment.username}:</strong> {comment.body}
									</Link>
								</Td>
								<Td>{comment.date}</Td>
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