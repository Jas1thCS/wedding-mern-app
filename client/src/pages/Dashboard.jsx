import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, Button, Badge } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('/api/dashboard/messages');
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
        alert('Failed to load messages');
      }
    };

    fetchMessages();
  }, []);

  const handleLogout = () => {
    navigate('/admin');
  };

  const handleEditEvent = () => {
    navigate('/edit');
  };

  return (
    <Container className="dashboard-container py-5">
      <div className="dashboard-header d-flex justify-content-between align-items-center mb-4">
        <h2>📬 Contact Messages</h2>
        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
      </div>

      {messages.length === 0 ? (
        <p className="text-center">No messages found.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {messages.map((msg) => (
            <Col key={msg._id}>
              <Card className="message-card h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{msg.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <Badge bg="info">{msg.email}</Badge>
                  </Card.Subtitle>
                  <Card.Text>{msg.message}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted small">
                  Received on {new Date(msg.createdAt).toLocaleString()}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="text-center mt-5">
        <Button className="edit-button px-4 py-2" onClick={handleEditEvent}>
          ✏️ Edit Event Details
        </Button>
      </div>
    </Container>
  );
};

export default Dashboard;
