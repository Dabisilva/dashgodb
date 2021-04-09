import Head from "next/head";
import { useRouter } from "next/router";
import { Flex, Button, Stack, FormControl } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type SignInformdata = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("E-mail deve ser válido")
    .trim(),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "Deve possuir no mínimo 8 caractéres"),
});

export default function SignIn() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInformdata> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.push("/dashboard");
  };

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
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <FormControl>
              <Input
                name="email"
                label="E-mail"
                type="email"
                error={errors.email}
                {...register("email")}
              />
            </FormControl>
            <FormControl>
              <Input
                name="password"
                label="Senha"
                type="password"
                error={errors.password}
                {...register("password")}
              />
            </FormControl>
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
