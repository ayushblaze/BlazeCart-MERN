import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUserProfile } from '../actions/userActions'; 

const ProfileScreen = ({ location, history }) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ message, setMessage ] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  console.log("userDetails:", userDetails);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  console.log("userInfo:", userInfo);

  const userUpdatedProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdatedProfile;

  useEffect(() => {
    console.log("useEffect ran");
    if (!userInfo) {
      history.push('/login');
    } else {
      console.log("inside else");
      console.log("main:", userInfo);
        if (!userInfo.name) {
          dispatch(getUserDetails('profile'));
        } else {
          console.log("else else", userInfo);
          setName(userInfo.name);
          setEmail(userInfo.email);
        }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      console.log("Zeus:", user);
      dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={7}>
        <FormContainer>
          <h2>User Profile</h2>
          {console.log("Message:", message)}
          {error && <Message variant="danger">{message}</Message>}
          {success && <Message variant="success">Profile Updated!</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label style={{ fontWeight: "bold" }}>
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmpassword">
              <Form.Label style={{ fontWeight: "bold" }}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </FormContainer>
      </Col>
      <Col md={5}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;