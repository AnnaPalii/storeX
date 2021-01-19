import React, { useState, useEffect, useRef } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";
import { ForwardRefInput, FormBtn } from "../components/Form";
import axios from "axios"
import Button from 'react-bootstrap/Button'

//prop drill the userID as well so in our API call we can just simply findOne({ _id: UserId})
//then every comment associated with that id can showcase
function Comments({ username }) {
	// Setting our component's initial state
	const [comments, setComments] = useState([]);
	const [formObject, setFormObject] = useState({
	body: "",
	username: "",
	zipcode: "",
	image: ""
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
    console.log(username)

	// Loads all comments and sets them to comments
	function loadComments() {
		API.getComments()
			.then((res) => {
				const listings = res.data.filter(listing => listing.username == username);
				console.log(res);
				setComments(listings)
			})
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
			API.saveComment({
				body: formObject.body,
				zipcode: formObject.zipcode,
				imageUrl:formObject.image
			})
            .then(loadComments)
            .then(() => setFormObject({
			body: "",
			zipcode: ""
            }))
		    .catch((err) => console.log(err));
		}
	}

	function handleImage(e){
		const files = e.target.files[0];
		console.log(files)
		let formData = new FormData();
			formData.append("file", files)
			formData.append("upload_preset", "storexapp")
			console.log(formData);
			axios.post("https://api.cloudinary.com/v1_1/storexapp/image/upload", formData)
				.then(res => setFormObject({...formObject, image:res.data.url}))
				.then(res => console.log(formObject))
	}
	return <>

	<Row>
		<header style={{ textAlign: "center", fontSize:"70px", display: "block", padding: 20 }}>
			Post Your Space
		</header>
	</Row>

		<Row>
			<Col size='md-12'>
				<form>
					<Col size='sm-12'>
						<ForwardRefInput ref={ titleInputElRef } value={formObject.body} onChange={handleInputChange} name='body' placeholder='your space description here' />
						<ForwardRefInput ref={ titleInputElRef } value={formObject.zipcode} onChange={handleInputChange} name='zipcode' placeholder='your zip here' />
						<div className="input-group">
						<div className="input-group-prepend">
						<span className="input-group-text" id="inputGroupFileAddon01">
						Upload
						</span>
						</div>
						<div className="custom-file">
						<input
						type="file"
						className="custom-file-input"
						id="StorePicFile" 
						onChange={handleImage}
						aria-describedby="inputGroupFileAddon01"
						/>
						<label className="custom-file-label" htmlFor="inputGroupFile01">
						Choose file
						</label>
						</div>
						</div>
						<div>
						<Button
						variant="secondary" size="lg" 
						style={{marginTop: 10,
							padding: 10,}} 
						disabled={!formObject.body}
						disabled={!formObject.zipcode}
						onClick={handleFormSubmit}>
						Submit your listing
					   </Button>
					   </div>
					</Col>

				</form>
			</Col>
		</Row>,
		<Row>
			<Col size='md-12'>
				{comments.length ? (
					<Table>
						<Tr>
						<Td>Description</Td>
						<Td>Zip code</Td>
						<Td>Date Posted</Td>
						<Td>Requests</Td>
						<Td>Delete Post</Td>
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
								<Td> <Link to='/dashboard' >{comment.status.length} </Link></Td>
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
