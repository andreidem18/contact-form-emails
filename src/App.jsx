
import { useState } from 'react'
import { Button, Card, Col, Container, Form, Navbar, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import './App.css'
import LoadingScreen from './components/LoadingScreen';
import Notification from './components/Notification';
import axios from './utils/axios';

function App() {

  const [ isLoading, setIsLoading ] = useState(false);
  const [ notification, setNotification ] = useState({ show: false, variant: "", message: "" })
  const { register, handleSubmit } = useForm();

  const submit = data => {
    setIsLoading(true);
    axios.post('/emails/contact', data)
      .then(() => setNotification({show: true, variant: "success", message: "Message sent!"}))
      .catch(() => setNotification({show: true, variant: "danger", message: "There was an error"}))    
      .finally(() => setIsLoading(false));
  }


  return (
    <div style={{minHeight: "100vh"}}>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand >Portfolio</Navbar.Brand>
        </Container>
      </Navbar>
      <Card style={{maxWidth: 650}} className="mt-5 mx-auto">
        <Card.Body>
          <Form onSubmit={handleSubmit(submit)}>
            <h1>Contáctame!</h1>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control placeholder="John Doe" {...register("name")} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="tel" placeholder="123456789" {...register("phone")} />
                </Form.Group>
              </Col>
            </Row>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com"  {...register("email")} />
              </Form.Group>
            <Form.Group className="mb-3" controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" placeholder="Hola! Me gustaría trabajar contigo"  {...register("message")} />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      { isLoading && <LoadingScreen />}
      <Notification 
        {...notification} 
        handleClose={() => setNotification({...notification, show: false})} 
      />
    </div>
  )
}

export default App
