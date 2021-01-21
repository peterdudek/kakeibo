import React, { useEffect, useState, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import API from "../utils/API";
import back from "../img/backarrow.png";
import { ForwardRefInput, FormBtn } from "../components/Form";
import streamingAPI from "../utils/streamingAPI";

function Subscription() {
  const [subscription, setSubscription] = useState({});
  const [formObject, setFormObject] = useState({
		// subscriptionName: "",
		paymentAmount: "",
		// username: username,
  });

  const titleInputElRef = useRef();
  
  
	function loadSth() {
    console.log("DONE!!!!!!!")
	}

  // const [userSubscription, setUserSubscription] = useState([]);
  // When this component mounts, grab the subscription with the _id of props.match.params.id
  // e.g. localhost:3000/subscriptions/599dcb67f0f16317844583fc
  const match = useRouteMatch('/subscriptions/:id');
  // const matchUser = useRouteMatch('/subscriptions/user/:id');

  useEffect(() => {
    setFormObject({
			// subscriptionName: "",
			paymentAmount: "",
			// username: username
		})


    API.getSubscription(match.params.id)
      .then(res => setSubscription(res.data))
      .catch(err => console.log(err));

    // API.getUserSubscription(matchUser.params.id)
    //   .then(res => setUserSubscription(res.data))
    //   .catch(err => console.log(err));
  }, [match.params.id])

  console.log("That's it:", subscription._id)

  function handleInputChange(event) {
		const { name, value } = event.target;
		setFormObject({ ...formObject, [name]: value });
	}

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Good job: ", event.target.value);
		// showMovie();
		if (formObject.paymentAmount) {
			API.updateSubscription(
        subscription._id,
        {
				// subscriptionName: formObject.subscriptionName,
				paymentAmount: formObject.paymentAmount,
				// username: formObject.username,
			})

				.then(res => {
          console.log(res.data)
          setSubscription({...subscription, paymentAmount: formObject.paymentAmount})
        })
				.then(() => setFormObject({
					// subscriptionName: "",
					paymentAmount: "",
					// username: username
        }))
        .catch((err) => console.log(err));
        
        alert("Your subscription price will be updated momentarily")
		}
	}

  return (
    <Container fluid>
      <Row>
        <Col size="md-2">
          <Link className="text-dark" to="/subscriptions">
            <img src={back} alt="back-btn" height="50px" />

          </Link>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <Card
              subscription={subscription}
              // userSubscription={userSubscription}
            />

          </article>
        </Col>
      </Row>



      <Row>
      <Col size='md-4'>
					<form className="marginTopandBottom">
						<Col size='md-12'>
							{/* <ForwardRefInput ref={titleInputElRef}
								value={formObject.subscriptionName}
								onChange={handleInputChange}
								name='subscriptionName'
								placeholder='your subscription name'
							/> */}
							<ForwardRefInput ref={titleInputElRef}
                value={formObject.paymentAmount}
                // id={subscription._id}
								onChange={handleInputChange}
								name='paymentAmount'
								placeholder='payment amount'
							/>
						</Col>
						<FormBtn
							// disabled={!formObject.subscriptionName && !formObject.paymentAmount}
							onClick={handleFormSubmit}>
							Update Price
					</FormBtn>
					</form>
					<Row></Row>
				</Col>
      </Row>

    </Container>
  );
}


export default Subscription;
