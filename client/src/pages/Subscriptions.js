import React, { useState, useEffect, useRef } from "react";
import DeleteBtn from "../components/DeleteBtn";
import AddBtn from "../components/AddBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { Table, Tr, Td } from "../components/Table";
import { ForwardRefInput, FormBtn } from "../components/Form";
import { Doughnut } from 'react-chartjs-2';
import movieAPI from "../utils/movieAPI";
import plus from "../img/plus.png";
// import defLogo from "../img/stream_icon.png";

import { Average, Total, Annual } from "../components/Total";

function Subscriptions({ username }) {
	// console.log(username)
	// Setting our component's initial state
	// const [showBtn, setShowBtn] = useState(true);
	// const [icon, setIcon] = useState({})
	const [subscriptions, setSubscriptions] = useState([]);
	const [userName, setUsername] = useState({});
	const [userSubscriptions, setUserSubscriptions] = useState([]);
	const [formObject, setFormObject] = useState({
		subscriptionName: "",
		paymentAmount: "",
		username: username,
		//logo: `https://logo.clearbit.com/${subscriptionName}.com`,
	});

	// console.log(userName);
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
		// API call result - "Where Watch"
		showMovie();
		if (formObject.subscriptionName && formObject.paymentAmount) {
			API.saveSubscription({
				subscriptionName: formObject.subscriptionName,
				paymentAmount: formObject.paymentAmount,
				username: formObject.username,
				// logo: "https://logo.clearbit.com/" + formObject.subscriptionName + ".com"
				logo: "https://raw.githubusercontent.com/Piotr72us/piotr-portfolio/master/assets/images/icons/stream2.png"
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
	}

	const reversedSubs = userSubscriptions.map(item => item).reverse();

	return (
		<>
			<Row>
				<Col size='md-12'>
					<Row>
						<Col size='md-4'>
							<div className="signupMargin" style={{ marginRight: "20px" }}>
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
							</div>
						</Col>

						<Col size='md-4'>
							<div className="signupMargin">
								<h4 style={{ textAlign: "center", display: "block" }}><strong>Monthly cost</strong></h4>
								<div className="scrollable">
									<div className="signupMargin">
										{userSubscriptions.length ? (
											<Doughnut
												data={pieState}
												options={{
													title: {
														display: false,
														text: 'Average cost',
														fontSize: 20,
														fontFamily: 'Roboto'
													},
													legend: {
														display: true,
														position: 'bottom'
													}
												}}
											/>
										) : (
												<div>
													<h4 style={{ textAlign: "center", display: "block" }} className="signupMargin">Nothing to display...</h4>
													<h4 style={{ textAlign: "center", display: "block" }} className="signupMargin">Start saving!</h4>
												</div>
											)}
									</div>
								</div>
							</div>
						</Col>

						{/* USER SAVED SUBSCRIPTIONS */}
						<Col size='md-4'>
							<div className="signupMargin" style={{ marginLeft: "20px"}}>
								<h4 style={{ textAlign: "center", display: "block" }}><strong>My subscriptions</strong></h4>
								{reversedSubs.length ? (
									<>
										<Table>
											{reversedSubs.map(subscription => (
												<Tr key={subscription._id}>
													<Td>
														<Link
															to={"/subscriptions/" + subscription._id}
															style={{ textAlign: "left", display: "block" }}>
															<div
																className="d-flex"
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
										{/* <Total
									userSubscriptions={userSubscriptions}
									username={username}
								/> */}
									</>
								) : (
										<div className="scrollable">
											<h4 style={{ textAlign: "center", display: "block" }} className="signupMargin">Nothing to display...</h4>
											<h4 style={{ textAlign: "center", display: "block" }} className="signupMargin">Start streaming!</h4>
										</div>
									)}
							</div>
						</Col>




						<Col size='md-4'>
							<div className="solidBorders cnFlex" style={{ marginRight: "20px"}}>
								<form className="extraMarg">
									<Row>
										<Col size='md-1'>
										</Col>

										<Col size='md-6'>
											<ForwardRefInput ref={titleInputElRef}
												value={formObject.subscriptionName}
												onChange={handleInputChange}
												name='subscriptionName'
												placeholder='Subscription name'
											/>
										</Col>

										<Col size='md-2'>
											<ForwardRefInput ref={titleInputElRef}
												value={formObject.paymentAmount}
												onChange={handleInputChange}
												name='paymentAmount'
												placeholder='$$$'
											/>
										</Col>

										<Col size='md-2'>

											<FormBtn
												disabled={!formObject.subscriptionName && !formObject.paymentAmount}
												onClick={handleFormSubmit}>
												<img src={plus} alt="plus-sign" height="20px" />
											</FormBtn>

										</Col>
										<Col size='md-1'>
										</Col>

									</Row>
								</form>
							</div>
						</Col>

						<Col size='md-4'>
							<div className="solidBorders cnFlex" >
								{/* AVERAGE: */}
								{userSubscriptions.length > 0 ?
								<div>
									<Average
										userSubscriptions={userSubscriptions}
										username={username}
									/>
									<Annual
									userSubscriptions={userSubscriptions}
									username={username}
								/>
								</div>

									: <div>
										<p>AVERAGE: $0.00</p>
										<p>ANNUAL COST: $0.00</p>
										</div>
								}

							</div>
						</Col>

						<Col size='md-4'>
							<div className="solidBorders cnFlex" style={{ marginLeft: "20px"}}>
								<Total
									userSubscriptions={userSubscriptions}
									username={username}
								/>
							</div>
						</Col>

					</Row>

				</Col>
			</Row>

			<Row>
			</Row>
		</>

	);
}

export default Subscriptions;
