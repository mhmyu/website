import { Container, Card, Row, Text } from "@nextui-org/react";

export default function App() {
  return (
    <Container fluid>
      <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Row justify="center" align="center">
            <Text h6 size={15} color="white" css={{ m: 0 }}>
wishlist page
            </Text>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

