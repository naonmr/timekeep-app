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
      <HStack p={3} bg="brand.100">
        {/* <Flex> */}
        <IconButton
          aria-label="home"
          icon={<AiFillHome />}
          bg="brand.300"
          onClick={() => history.push("/")}
        />
        <Heading as="h5" color="brand.300">
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
        {/* </Flex> */}
      </HStack>
    </>
  );
};

export default Header;
