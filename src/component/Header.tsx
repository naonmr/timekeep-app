import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  Spacer,
  Flex,
  Heading,
  Box,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { HamburgerIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import firebase from "../firebase/firebaseConfig";

const Header = () => {
  const history = useHistory();
  const handleLogout = async () => {
    const auth = getAuth(firebase);
    try {
      signOut(auth);
      history.push("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Box bg="brand.100" w="100%" minW="100%">
        <Flex p="2" alignItems="center">
          <IconButton
            aria-label="home"
            icon={<AiFillHome />}
            bg="brand.300"
            onClick={() => history.push("/")}
          />
          <Spacer></Spacer>

          <Heading as="h1" size="md" color="brand.300" wordBreak="break-all">
            TimeKeep App
          </Heading>
          <Spacer />

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              color="brand.300"
            />
            <MenuList>
              <MenuItem icon={<NotAllowedIcon />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
