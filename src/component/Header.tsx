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
      <h1>header</h1>
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
          {/* <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
            New Window
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
            Open Closed Tab
          </MenuItem>
          <MenuItem icon={<EditIcon />} command="⌘O">
            Open File...
          </MenuItem> */}
        </MenuList>
      </Menu>
    </>
  );
};

export default Header;
