import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import API from "../utils/API";

function Subscription() {
  const [subscription, setSubscription] = useState({})
  // When this component mounts, grab the subscription with the _id of props.match.params.id
  // e.g. localhost:3000/subscriptions/599dcb67f0f16317844583fc
  const match = useRouteMatch('/subscriptions/:id');

  useEffect(() => {
    API.getSubscription(match.params.id)
      .then(res => setSubscription(res.data))
      .catch(err => console.log(err));
  }, [match.params.id])

  return (
    <Container fluid>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <Card 
            subscription={subscription}
            />

          </article>
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link className="text-dark" to="/subscriptions">← Back to all subscriptions</Link>
        </Col>
      </Row>
    </Container>
  );
}


export default Subscription;
