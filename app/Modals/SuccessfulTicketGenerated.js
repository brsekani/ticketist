import {
  Button,
  Modal,
  Text,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";

function SuccessfulTicketGenerated({ opened, close }) {
  const theme = useMantineTheme();

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", padding: "1rem" }}>
      <Modal
        opened={opened}
        onClose={close}
        title="Ticket Successfully Generated!"
        centered
        overlayBlur={3}
        p={10}
        styles={{
          title: {
            fontSize: "1.5rem",
            fontWeight: 700,
            textAlign: "center",
          },
        }}
      >
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <Text size="md" color="dimmed" style={{ marginBottom: "1rem" }}>
            Your ticket has been successfully generated. You can view your
            ticket details on the My Tickets page.
          </Text>
          <Button
            variant="filled"
            color="#32BC9B"
            size="md"
            radius="xl"
            onClick={() => {
              window.location.href = "/myTickets"; // Navigate to the My Tickets page
            }}
          >
            Go to My Tickets
          </Button>
        </div>
      </Modal>

      {/* <Group position="center">
          <Button
            variant="outline"
            radius="xl"
            size="lg"
            onClick={close}
            style={{
              marginTop: "2rem",
              padding: "0.5rem 2rem",
              borderColor: theme.colors.blue[6],
              color: theme.colors.blue[6],
            }}
          >
            Open Modal
          </Button>
        </Group> */}
    </div>
  );
}

export default SuccessfulTicketGenerated;
