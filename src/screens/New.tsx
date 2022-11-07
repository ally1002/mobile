import { Heading, Text, Toast, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Logo from "../assets/logo.svg"
import { useState } from "react";
import { api } from "../services/api";

export function New() {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const handlePoolCreate = async () => {
        if (!title) {
            return toast.show({
                title: 'Informe um nome para seu bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        try {
            setIsLoading(true)

            await api.post('pools', { title })

            toast.show({
                title: 'Bolão criado com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            })

            setTitle('')
        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível criar o bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <VStack flex={1} bgColor="gray.800">
            <Header title="Criar Novo Bolão" />

            <VStack alignItems="center" mt={8} mx={5}>
                <Logo />

                <Heading color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa {'\n'}
                    e compartilhe entre amigos!
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual nome do seu bolão?"
                    onChangeText={(value) => setTitle(value.trim())}
                    value={title}
                />

                <Button
                    title="Criar meu Bolão"
                    onPress={handlePoolCreate}
                    isLoading={isLoading}
                />

                <Text color="gray.200" textAlign="center" mt={4}>
                    Após criar seu bolão, você receberá um {'\n'}
                    código único que poderá usar para convidar {'\n'}
                    outras pessoas.
                </Text>
            </VStack>

        </VStack>
    )
}