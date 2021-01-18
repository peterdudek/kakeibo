import React, { useState, useEffect, useRef } from "react";
import DeleteBtn from "../components/DeleteBtn";
import AddBtn from "../components/AddBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";
import { ForwardRefInput, FormBtn } from "../components/Form";

import Total from "../components/Total";

function Subscriptions({ username }) {
	// console.log(username)
	// Setting our component's initial state
	// const [showBtn, setShowBtn] = useState(true);
	const [subscriptions, setSubscriptions] = useState([]);
	const [userName, setUsername] = useState({});
	const [userSubscriptions, setUserSubscriptions] = useState([]);
	const [formObject, setFormObject] = useState({
		subscriptionName: "",
		paymentAmount: "",
		username: username,
	});

	// get input element ref for focus
	const titleInputElRef = useRef();

	// Load all subscriptions and store them with setComments
	useEffect(() => {
		// set user after successful component mount
		setFormObject({
			subscriptionName: "",
			paymentAmount: "",
			username: username
		})

		loadSubscriptions();
		loadUserSubscriptions();

		// focus on titleInputEl if ref exists
		titleInputElRef.current.focus()
	}, [username]);

	// Loads all subscriptions and sets them to subscriptions
	function loadSubscriptions() {
		API.getSubscriptions()
			.then((res) => setSubscriptions(res.data))
			.catch((err) => console.log(err));
	}

	function loadUserSubscriptions() {
		API.getUserSubscriptions()
			.then((res) => {
				// console.log(res.data)
				setUsername(res.data[0].username)
				setUserSubscriptions(res.data[0].subscription)
			})
			.catch((err) => console.log(err));
	}


	// Deletes a subscription from the database with a given id, then reloads subscriptions from the db
	function deleteSubscription(id) {
		API.deleteSubscription(id)
			.then((res) => loadUserSubscriptions())
			.catch((err) => console.log(err));
	}

	function saveSubscription(subscription) {
		// console.log(subscription)
		const newSubscription = {
			paymentAmount: subscription.paymentAmount,
			subscriptionName: subscription.subscriptionName,
			username: username
		}

		API.saveSubscription(newSubscription)
			// .createIndex( { username: 1 }, { unique: true } )
			.then((res) => loadUserSubscriptions())
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
		if (formObject.subscriptionName && formObject.paymentAmount) {
			API.saveSubscription({
				subscriptionName: formObject.subscriptionName,
				paymentAmount: formObject.paymentAmount,
				username: formObject.username,
			})

				.then(loadUserSubscriptions)
				.then(() => setFormObject({
					subscriptionName: "",
					paymentAmount: "",
					username: username
				}))
				.catch((err) => console.log(err));
		}
	}

	return <>
		<Row>
			<Col size='md-4'>
				<h4 style={{ textAlign: "center", display: "block" }}>Most popular subscriptions</h4>
				{subscriptions.length ? (
					<Table>
						{subscriptions.map(subscription => (
							<Tr key={subscription._id}>
								<Td>
									<Link
										to={"/subscriptions/" + subscription._id}
										style={{ textAlign: "left", display: "block" }}>
										<strong>
											{/* Commented out for now */}
											{/* {subscription.username}: */}
										</strong> {subscription.subscriptionName} {"$"} {subscription.paymentAmount}
									</Link>
								</Td>
								<Td>
									{/* WE CAN ADD DATE TO SUBSCRIPTION MODEL */}
									{/* {subscription.date} */}
								</Td>
								<Td>
									<AddBtn onClick={() => {
										saveSubscription(subscription)
									}
									} />
								</Td>
							</Tr>
						))}
					</Table>
				) : (
						<h3>No Results to Display</h3>
					)}
			</Col>

			<Col size='md-2'>

			</Col>
			{/* USER SAVED SUBSCRIPTIONS */}
			<Col size='md-4'>
				<h4 style={{ textAlign: "center", display: "block" }}>My subscriptions</h4>
				{userSubscriptions.length ? (
					<>
						<Table>
							{userSubscriptions.map(subscription => (
								<Tr key={subscription._id}>
									<Td>
										<Link
											to={"/subscriptions/user" + subscription._id}
											style={{ textAlign: "left", display: "block" }}>
											<strong>
												{/* Commented out for now */}
												{/* {subscription.username}: */}
											</strong> {subscription.subscriptionName} {" $"} {subscription.paymentAmount}
										</Link>
									</Td>
									<Td>
										{/* WE CAN ADD DATE TO SUBSCRIPTION MODEL */}
										{/* {subscription.date} */}
									</Td>
									<Td>
										<DeleteBtn onClick={() => deleteSubscription(subscription._id)} />
									</Td>
								</Tr>
							))}
							{/* <Total
								userSubscriptions={userSubscriptions}
								username={username}
							/> */}
						</Table>
						<Total
							userSubscriptions={userSubscriptions}
							username={username}
						/>
					</>
				) : (
						<h3>No Results to Display</h3>
					)}
			</Col>
		</Row>

		<Row>
			<Col size='md-4'>
				<form className="marginTopandBottom">
					<Col size='md-12'>
						<ForwardRefInput ref={titleInputElRef}
							value={formObject.subscriptionName}
							onChange={handleInputChange}
							name='subscriptionName'
							placeholder='your subscription name'
						/>
						<ForwardRefInput ref={titleInputElRef}
							value={formObject.paymentAmount}
							onChange={handleInputChange}
							name='paymentAmount'
							placeholder='payment amount'
						/>
					</Col>
					<FormBtn
						disabled={!formObject.subscriptionName && !formObject.paymentAmount}
						onClick={handleFormSubmit}>
						Add Subscription
					</FormBtn>
				</form>
				<Row></Row>
			</Col>

			<Col size='md-2'> </Col>


			{/* USER'S TOTAL */}
			{/* <Col size='md-4'>
				<Total
					userSubscriptions={userSubscriptions}
					username={username}
				/>
			</Col> */}
		</Row>
	</>;
}

export default Subscriptions;
