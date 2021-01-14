import React, { useState, useEffect, useRef } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";
import { ForwardRefInput, FormBtn } from "../components/Form";
import Dashboard from "./Dashboard";

function Comments({ username }) {
	// Setting our component's initial state
	const [comments, setComments] = useState([]);
	const [formObject, setFormObject] = useState({
	body: "",
	username: "",
	zipcode: ""
	});
	
   // get input element ref for focus
   const titleInputElRef = useRef();

	// Load all comments and store them with setComments
	useEffect(() => {
      // set user after successful component mount
    setFormObject({
		body: "",
		zipcode: ""
	})

    loadComments();

      // focus on titleInputEl if ref exists
    titleInputElRef.current.focus()}, [username]);
   

	// Loads all comments and sets them to comments
	function loadComments() {
		API.getComments()
			.then((res) => setComments(res.data))
			.catch((err) => console.log(err));
	}

	// Deletes a comment from the database with a given id, then reloads comments from the db
	function deleteComment(id) {
		API.deleteComment(id)
			.then((res) => loadComments())
			.catch((err) => console.log(err));
	}

	// Handles updating component state when the user types into the input field
	function handleInputChange(event) {
		const { name, value } = event.target;
		setFormObject({ ...formObject, [name]: value });
	}

	// When the form is submitted, use the API.saveComment method to save the comment data
	// Then reload comments from the database
	function handleFormSubmit(event) {
		event.preventDefault();
		if (formObject.body) {
			// console.log(formObject.zipcode);
			API.saveComment({
				body: formObject.body,
				zipcode: formObject.zipcode
			})
            .then(loadComments)
            .then(() => setFormObject({
			body: "",
			zipcode: ""
            }))
		    .catch((err) => console.log(err));
		}
	}

	return <>
	<Row>
	<Link to='/dashboard' >
            <i class="fas fa-chart-area">View my Dashboard </i>
    </Link>

	</Row>

		<Row>
			<Col size='md-12'>
				<form>
					<Col size='sm-12'>
						<ForwardRefInput ref={ titleInputElRef } value={formObject.body} onChange={handleInputChange} name='body' placeholder='your space description here' />
						<ForwardRefInput ref={ titleInputElRef } value={formObject.zipcode} onChange={handleInputChange} name='zipcode' placeholder='your zip here' />
					</Col>
					<FormBtn
						disabled={!formObject.body}
						disabled={!formObject.zipcode}
						onClick={handleFormSubmit}>
						Submit your listing
					</FormBtn>
				</form>
			</Col>
		</Row>,
		<Row>
			<Col size='md-12'>
				{comments.length ? (
					<Table>
						<Tr>
							<Td>Description </Td>
						  <Td>Zip code </Td>
						 <Td> Date Posted</Td>
						  <Td>Delete Post </Td>
						  </Tr>
						{comments.map(comment => (
							<Tr key={comment._id}>
								<Td>
									<Link
										to={"/comments/" + comment._id}
										style={{ textAlign: "left", display: "block", padding: 20 }}>
										<strong>{comment.username}:</strong> {comment.body}
									</Link>
								</Td>
								<Td>{comment.zipcode}</Td>
								<Td>
									{new Date(comment.date).toDateString()}
									</Td>
								<Td>
									<DeleteBtn onClick={() => deleteComment(comment._id)} />
								</Td>
							</Tr>
						))}
					</Table>
				) : (
					<h3>No Results to Display</h3>
				)}
			</Col>
		</Row>,
	</>;
}

export default Comments;
