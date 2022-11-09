import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";

export function Find() {
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');
    const { navigate } = useNavigation();

    const handleJoinPool = async () => {
        try {
            setIsLoading(true);

            if (!code) {
                return toast.show({
                    title: 'Informe um código',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            await api.post('pools/join', { code })

            navigate('pools')
        } catch (error) {
            console.log(error)
            setIsLoading(false);

            if (error.response?.data?.message === 'Pool not found') {
                return toast.show({
                    title: 'Não foi possível encontrar o bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            if (error.response?.data?.message === 'You already joined on this Pool!') {
                return toast.show({
                    title: 'Você já está nesse bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            return toast.show({
                title: 'Bolão não encontrado',
                placement: 'top',
                bgColor: 'red.500'
            });
        }
    }

    return (
        <VStack flex={1} bgColor="gray.800">
            <Header title="Buscar por Código" showBackButton />

            <VStack alignItems="center" mt={8} mx={5}>
                <Heading color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontre um bolão através de {'\n'}
                    seu código único
                </Heading>

                <Input
                    mb={2} placeholder="Qual o código do bolão?"
                    autoCapitalize="characters"
                    onChangeText={(value) => setCode(value.trim())}
                    value={code}
                />
                <Button
                    title="BUSCAR BOLÃO"
                    onPress={handleJoinPool}
                />
            </VStack>

        </VStack>
    )
}