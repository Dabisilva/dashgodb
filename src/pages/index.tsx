import Head from "next/head";
import { Flex, Button, Stack, FormControl } from "@chakra-ui/react";

import { Input } from "../components/Form/Input";
export default function SignIn() {
  return (
    <>
      <Head>
        <title>dashgodb | Login</title>
      </Head>
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
        >
          <Stack spacing="4">
            <FormControl>
              <Input name="email" label="E-mail" type="email" />
            </FormControl>
            <FormControl>
              <Input name="password" label="Senha" type="password" />
            </FormControl>
          </Stack>

          <Button type="submit" mt="6" colorScheme="pink" size="lg">
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
