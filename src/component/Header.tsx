import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { HamburgerIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import firebase from "../firebase/firebaseConfig";

const Header = (props: any) => {
  const { setCurrentPage } = props;
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
      <h1>header</h1>
      <IconButton
        aria-label="home"
        icon={<AiFillHome />}
        onClick={() => history.push("/mypage")}
      />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<NotAllowedIcon />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default Header;
