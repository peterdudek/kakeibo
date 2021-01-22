import React, { useEffect, useState, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import API from "../utils/API";
import back from "../img/arrow-b.png";
import { ForwardRefInput, FormBtn } from "../components/Form";
import streamingAPI from "../utils/streamingAPI";
// import plus from "../img/plus.png";

function Subscription() {
  const [subscription, setSubscription] = useState({});
  const [formObject, setFormObject] = useState({
    paymentAmount: "",
  });

  const titleInputElRef = useRef();

  // const [userSubscription, setUserSubscription] = useState([]);
  // When this component mounts, grab the subscription with the _id of props.match.params.id
  // e.g. localhost:3000/subscriptions/599dcb67f0f16317844583fc
  const match = useRouteMatch('/subscriptions/:id');
  // const matchUser = useRouteMatch('/subscriptions/user/:id');

  useEffect(() => {
    setFormObject({
      paymentAmount: "",
    })

    API.getSubscription(match.params.id)
      .then(res => setSubscription(res.data))
      .catch(err => console.log(err));

    // API.getUserSubscription(matchUser.params.id)
    //   .then(res => setUserSubscription(res.data))
    //   .catch(err => console.log(err));
  }, [match.params.id])

  // console.log("That's it:", subscription._id)

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    // console.log("Good job: ", event);
    // showMovie();
    if (formObject.paymentAmount) {
      API.updateSubscription(
        subscription._id,
        {
          paymentAmount: formObject.paymentAmount,
        })

        .then(res => {
          console.log(res.data)
          setSubscription({ ...subscription, paymentAmount: formObject.paymentAmount })
        })
        .then(() => setFormObject({
          paymentAmount: "",
        }))
        .catch((err) => console.log(err));

      // alert("Your subscription price will be updated momentarily")
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
        <Col size="md-2">
        </Col>
        <Col size="md-4">
        <div
        // className="extraMargin"
        >

          <div className="text-center">
            <img src={subscription.logo} alt="company-logo" className="thumb" />
            {/* {props.children} */}

          </div>
          <div className="text-center">
            <strong><h1>
              {subscription.subscriptionName}
            </h1>

            </strong>
            {/* <strong>{props.heading}: </strong> */}
          </div>
          <p className="text-center">Cost per month: ${subscription.paymentAmount}</p>
        </div>
        </Col>
        <Col size="md-6">
        <Row>
        <Col size='md-4'>
          <form className="marginTopandBottom">
            <Row>
              <Col size='md-10'>
                <ForwardRefInput ref={titleInputElRef}
                  value={formObject.paymentAmount}
                  // id={subscription._id}
                  onChange={handleInputChange}
                  name='paymentAmount'
                  placeholder='payment amount'
                />
              </Col>
              <Col size='md-2'>
                <FormBtn
                  disabled={!formObject.paymentAmount}
                  onClick={handleFormSubmit}
                >
                  Update
                  {/* <img src={plus} alt="plus-sign" height="20px" /> */}
                </FormBtn>
              </Col>
            </Row>
          </form>

        </Col>
      </Row>
        </Col>
      </Row>

      {/* <Row>
        <Col size='md-4'>
          <form className="marginTopandBottom">
            <Row>
              <Col size='md-10'>
                <ForwardRefInput ref={titleInputElRef}
                  value={formObject.paymentAmount}
                  onChange={handleInputChange}
                  name='paymentAmount'
                  placeholder='payment amount'
                />
              </Col>
              <Col size='md-2'>
                <FormBtn
                  disabled={!formObject.paymentAmount}
                  onClick={handleFormSubmit}
                >
                  Update
                </FormBtn>
              </Col>
            </Row>
          </form>

        </Col>
      </Row> */}

      <Row>
        <Col size="md-12">
          <article>
            <Card
              subscription={subscription}
            />

          </article>
        </Col>
      </Row>

      


    </Container>
  );
}


export default Subscription;
