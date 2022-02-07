import { useHistory } from "react-router-dom";

import { BigButton } from "../component/Button";

import { Box, Center, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
const topPageImg = require("../image/top-page-image.png");

const Home = () => {
  const history = useHistory();
  return (
    <>
      <Box w="100%" maxW="100%">
        <Box w="100%" maxW="100%">
          <Heading color="brand.300" bg="brand.100" size="2xl" p="3">
            Timekeep App
          </Heading>
        </Box>
        <Spacer></Spacer>
        <Center>
          <Box mt="5" w="100%" maxW="100%" p="4">
            <Text>
              Timekeep
              Appはあなたの代わりにタイムキーパーをしてくれる、会議にピッタリのアプリです🥳
            </Text>

            <Center>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                m={2}
                w="xl"
                mt="5"
              >
                <Heading color="brand.100" size="md">
                  使ってみる
                </Heading>
                <Center>
                  <HStack spacing="5" mt="3" mb="2">
                    <BigButton
                      text="signup"
                      onclick={() => history.push("/signup")}
                    />
                    <BigButton
                      text="login"
                      onclick={() => history.push("/login")}
                    />
                  </HStack>
                </Center>
              </Box>
            </Center>
          </Box>
        </Center>
        <Box mt="5">
          <img className="top-page-img" src={topPageImg} alt="できること" />
        </Box>
      </Box>
    </>
  );
};

export default Home;
