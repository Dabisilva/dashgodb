import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SideBar } from "../../components/SideBar";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { queryClient } from "../../services/queryClient";

type CreateUserformdata = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("E-mail deve ser válido")
    .trim(),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "Deve possuir no mínimo 8 caractéres"),
  confirm_password: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas devem ser iguáis"),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserformdata) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserformdata> = async (
    values
  ) => {
    await createUser.mutateAsync(values).then(() => {
      router.push("/users");
    });
  };

  return (
    <Box>
      <Head>
        <title>dashgodb | Criar Usuário</title>
      </Head>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                error={errors.name}
                name="name"
                label="Nome completo"
                {...register("name")}
              />
              <Input
                error={errors.email}
                name="email"
                type="email"
                label="E-mail"
                {...register("email")}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                error={errors.password}
                name="password"
                type="password"
                label="Senha"
                {...register("password")}
              />
              <Input
                error={errors.confirm_password}
                name="password_confirmation"
                type="password"
                label="Confirmar senha"
                {...register("confirm_password")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack>
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                colorScheme="pink"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
