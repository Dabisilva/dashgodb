import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Davi Barbosa</Text>
        <Text color="gray.300" fontSize="small">
          dabisilvaond@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Davi Barbosa"
        src="https://github.com/Dabisilva.png"
      />
    </Flex>
  );
}
