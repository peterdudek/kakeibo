import React, { useState, useEffect, useRef } from "react";
import DeleteBtn from "../components/DeleteBtn";
import AddBtn from "../components/AddBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";
import { ForwardRefInput, FormBtn } from "../components/Form";
import { Pie, Doughnut } from 'react-chartjs-2';
import movieAPI from "../utils/movieAPI";

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
		//logo: `https://logo.clearbit.com/${subscriptionName}.com`,
	});

	// get input element ref for focus
	const titleInputElRef = useRef();

	// Load all subscriptions and store them with setComments
	useEffect(() => {
		// set user after successful component mount
		setFormObject({
			subscriptionName: "",
			paymentAmount: "",
			username: username,
			//logo: `https://logo.clearbit.com/${subscriptionName}.com`,
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
			username: username,
			logo: subscription.logo

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
		showMovie();
		if (formObject.subscriptionName && formObject.paymentAmount) {
			API.saveSubscription({
				subscriptionName: formObject.subscriptionName,
				paymentAmount: formObject.paymentAmount,
				username: formObject.username,
				logo: "https://logo.clearbit.com/" + formObject.subscriptionName + ".com"
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


	// var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	const pieState = {

		labels: userSubscriptions.map(subscription => (subscription.subscriptionName)),
		datasets: [
			{
				label: 'Subscription Cost',
				backgroundColor: [
					'#B21F00',
					'#C9DE00',
					'#2FDE00',
					'#00A6B4',
					'#6800B4'
				],
				// userSubscriptions.map(subscription => ("#" + Math.floor(Math.random() * 16777215).toString(16)))
				hoverBackgroundColor: [
					'#501800',
					'#4B5000',
					'#175000',
					'#003350',
					'#35014F'
				],
				data: userSubscriptions.map(subscription => (subscription.paymentAmount))
			}
		]
	}

	function showMovie() {
		movieAPI.findMovie()
		// .then((res) => console.log(res))
		// .catch((err) => console.log(err));
	}

	return (
		<>
			<Row>
				<Col size='md-4'>
					<h4 style={{ textAlign: "center", display: "block" }}><strong>Trending subscriptions</strong></h4>
					{subscriptions.length ? (
						<Table>
							{subscriptions.map(subscription => (
								<Tr key={subscription._id}>
									<Td>
										<Link
											to={"/subscriptions/" + subscription._id}
											style={{ textAlign: "left", display: "block" }}
										>
											<div
												className="d-flex"
											// className="row justify-content-between"
											>
												<div className="p-2">
													<img className="thumb" alt={subscription.subscriptionName} src={subscription.logo} height="30px" />
												</div>
												<div className="p-2">{subscription.subscriptionName}</div>
												<div className="ml-auto p-2">{" $"}{subscription.paymentAmount}</div>
											</div>

										</Link>
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
							<h4>Nothing to Display. Start streaming!</h4>
						)}
				</Col>

				<Col size='md-4'></Col>

				{/* USER SAVED SUBSCRIPTIONS */}
				<Col size='md-4'>
					<h4 style={{ textAlign: "center", display: "block" }}><strong>My subscriptions</strong></h4>
					{userSubscriptions.length ? (
						<>
							<Table>
								{userSubscriptions.map(subscription => (
									<Tr key={subscription._id}>
										<Td>
											<Link
												to={"/subscriptions/" + subscription._id}
												style={{ textAlign: "left", display: "block" }}>

												<div
													className="d-flex"
												// className="row justify-content-between"
												>
													<div className="p-2">
														<img className="thumb" alt={subscription.subscriptionName} src={subscription.logo} height="30px" />
													</div>
													<div className="p-2">{subscription.subscriptionName}</div>
													<div className="ml-auto p-2">{" $"}{subscription.paymentAmount}</div>
												</div>

											</Link>
										</Td>
										<Td>

										</Td>
										<Td>
											<DeleteBtn onClick={() => deleteSubscription(subscription._id)} />
										</Td>
									</Tr>
								))}
							</Table>
							<Total
								userSubscriptions={userSubscriptions}
								username={username}
							/>
						</>
					) : (
							<h4>Nothing to Display. Start streaming!</h4>
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

				<Col size='md-6'>
					<div>
						{/* <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        /> */}

						<Doughnut
							data={pieState}
							options={{
								title: {
									display: true,
									text: 'Average Subscription cost/month',
									fontSize: 20
								},
								legend: {
									display: true,
									position: 'right'
								}
							}}
						/>
					</div>

				</Col>
			</Row>

		</>
	);
}

export default Subscriptions;
