import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  VStack,
} from "@chakra-ui/react";
import UserSearch from "@/features/user-search/UserSearch";

function App() {
  return (
    <main>
      <VStack>
        <Container
          maxW="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="36"
        >
          <Card size="lg">
            <CardHeader>
              <Heading size="md">Search Github Users</Heading>
            </CardHeader>
            <CardBody>
              <UserSearch />
            </CardBody>
          </Card>
        </Container>
      </VStack>
    </main>
  );
}

export default App;
