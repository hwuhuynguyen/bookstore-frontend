import React from "react";
import { Button, Center, Container, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconError404 } from "@tabler/icons-react";

function ErrorNotFoundPage() {
  return (
    <main>
      <Container size="xl">
        <Stack gap="lg" style={{ textAlign: "center" }}>
          <Center>
            <IconError404 size={250} strokeWidth={1} />
          </Center>
          <Title>Sorry, we couldn't find this page.</Title>
          <Center>
            <Button component={Link} to="/" color="blue" size="md" radius="md" mt="xl">
              Back to home
            </Button>
          </Center>
        </Stack>
      </Container>
    </main>
  );
}

export default ErrorNotFoundPage;
