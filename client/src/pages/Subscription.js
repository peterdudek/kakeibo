import React, { useEffect, useState, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import API from "../utils/API";
import back from "../img/arrow-b.png";
import { ForwardRefInput, FormBtn } from "../components/Form";
// import streamingAPI from "../utils/streamingAPI";
// import plus from "../img/plus.png";
import refresh from "../img/refresh.png";

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
          // console.log(res.data)
          setSubscription({ ...subscription, paymentAmount: formObject.paymentAmount })
        })
        .then(() => setFormObject({
          paymentAmount: "",
        }))
        .catch((err) => console.log(err));

    }
  }

  return (
    <Container fluid>

      <Row>

        <Col size="md-1">
          <Link className="text-dark" to="/subscriptions">
            <img src={back} alt="back-btn" height="50px" className="blackBtn" />
          </Link>
        </Col>

        <Col size="md-3">
          <div
          // className="extraMargin"
          >

            <div className="text-center">
              <img src={subscription.logo} alt="company-logo" className="thumb" />
            </div>

          </div>
        </Col>

        <Col size="md-8">
          <Row>
            <Col size='md-4'>
              <div className="text-left">
                <div className="text-left">
                  <h2>{subscription.subscriptionName}</h2>
                </div>
                <div>
                  <p className="text-left">Price/month: ${subscription.paymentAmount}</p>
                </div>
              </div>
            </Col>

            <Col size='md-4'>
              <div className="customFormMargin">
                <form>
                  <Row>
                    {/* <Col size='md-1'>
                      </Col> */}
                    <Col size='md-6'>
                      <div className="cardShowMarg">
                        <ForwardRefInput ref={titleInputElRef}
                          value={formObject.paymentAmount}
                          // id={subscription._id}
                          onChange={handleInputChange}
                          name='paymentAmount'
                          placeholder='Update $'
                        />
                      </div>
                    </Col>
                    <Col size='md-2'>
                      <FormBtn
                        disabled={!formObject.paymentAmount}
                        onClick={handleFormSubmit}

                      >
                        <img src={refresh} alt="refresh-sign" height="20px" />
                      </FormBtn>
                    </Col>
                    <Col size='md-4'>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
            <Col size='md-4'>
            </Col>


          </Row>
        </Col>

      </Row>


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
