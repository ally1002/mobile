import { Heading, Text, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Logo from "../assets/logo.svg"

export function New() {
    return (
        <VStack flex={1} bgColor="gray.800">
            <Header title="Criar Novo Bolão" />

            <VStack alignItems="center" mt={8} mx={5}>
                <Logo />

                <Heading color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa {'\n'}
                    e compartilhe entre amigos!
                </Heading>

                <Input mb={2} placeholder="Qual nome do seu bolão?" />
                <Button title="Criar meu Bolão" />

                <Text color="gray.200" textAlign="center" mt={4}>
                    Após criar seu bolão, você receberá um {'\n'}
                    código único que poderá usar para convidar {'\n'}
                    outras pessoas.
                </Text>
            </VStack>

        </VStack>
    )
}