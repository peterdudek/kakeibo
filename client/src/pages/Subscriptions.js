import React, { useState, useEffect, useRef } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";
import { ForwardRefInput, FormBtn } from "../components/Form";

function Subscriptions({ username }) {
	console.log(username)
	// Setting our component's initial state
	const [subscriptions, setSubscriptions] = useState([]);
	const [formObject, setFormObject] = useState({
		// body: "",
		subscriptionName: "",
		paymentAmount: "",
		username: username
	});

	// get input element ref for focus
	const titleInputElRef = useRef();

	// Load all subscriptions and store them with setComments
	useEffect(() => {
		// set user after successful component mount
		setFormObject({
			// body: "",
			subscriptionName: "",
			paymentAmount: "",
			username: username
		})

		loadSubscriptions();

		// focus on titleInputEl if ref exists
		titleInputElRef.current.focus()
	}, [username]);


	// Loads all subscriptions and sets them to subscriptions
	function loadSubscriptions() {
		API.getSubscriptions()
			.then((res) => setSubscriptions(res.data))
			.catch((err) => console.log(err));
	}

	// Deletes a subscription from the database with a given id, then reloads subscriptions from the db
	function deleteSubscription(id) {
		API.deleteSubscription(id)
			.then((res) => loadSubscriptions())
			.catch((err) => console.log(err));
	}

	// Handles updating component state when the user types into the input field
	function handleInputChange(event) {
		const { name, value } = event.target;
		setFormObject({ ...formObject, [name]: value });
	}

	// When the form is submitted, use the API.saveSubscription method to save the subscription data
	// Then reload subscriptions from the database
	function handleFormSubmit(event) {
		event.preventDefault();
		// if (formObject.body) {
			if (formObject.subscriptionName && formObject.paymentAmount) {
			API.saveSubscription({
				// body: formObject.body,
				subscriptionName: formObject.subscriptionName,
				paymentAmount: formObject.paymentAmount,
				username: formObject.username,
			})
			// the "loadSubscriptions below changed the color from blue to yellow when I switched it from loadComments" ???????
				.then(loadSubscriptions)
				.then(() => setFormObject({
					// body: "",
					subscriptionName: "",
					paymentAmount: "",
					username: username
				}))
				.catch((err) => console.log(err));
		}
	}

	return <>
		<Row>
			<Col size='md-12'>
				<form>
					<Col size='sm-12'>
						{/* <ForwardRefInput ref={titleInputElRef} 
							value={formObject.body} 
							onChange={handleInputChange} 
							name='body' 
							placeholder='your subscription here' 
						/> */}
						<ForwardRefInput ref={titleInputElRef} 
							value={formObject.subscriptionName} 
							onChange={handleInputChange} 
							name='subscriptionName' 
							placeholder='your subscription name here' 
						/>
						<ForwardRefInput ref={titleInputElRef} 
							value={formObject.paymentAmount} 
							onChange={handleInputChange} 
							name='paymentAmount' 
							placeholder='your subscription payment amount here' 
						/>
					</Col>
					<FormBtn
						disabled={!formObject.subscriptionName && !formObject.paymentAmount}
						onClick={handleFormSubmit}>
						Submit Subscription
					</FormBtn>
				</form>
			</Col>
		</Row>,
		<Row>
			<Col size='md-12'>
				{subscriptions.length ? (
					<Table>
						{subscriptions.map(subscription => (
							<Tr key={subscription._id}>
								<Td>
									<Link
										to={"/subscriptions/" + subscription._id}
										style={{ textAlign: "left", display: "block" }}>
										<strong>{subscription.username}:</strong> {subscription.subscriptionName} {subscription.paymentAmount} 
									</Link>
								</Td>
								<Td>
									{/* ADD DATE TO SUBSCRIPTION MODEL */}
									{/* {subscription.date} */}
								</Td>
								<Td>
									<DeleteBtn onClick={() => deleteSubscription(subscription._id)} />
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

export default Subscriptions;
