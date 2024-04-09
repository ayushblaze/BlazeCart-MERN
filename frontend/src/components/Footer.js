import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container style={{paddingTop: '35rem'}}>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; BlazeCart</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;