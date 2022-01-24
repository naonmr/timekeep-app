import { Box, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
const IsRegister = () => {
  return (
    <>
      <Box mt={2}>
        <Text>登録が完了しました</Text>
        <Box mt={2}>
          <Link href="/login" fontSize="sm">
            ログインはこちら
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default IsRegister;
