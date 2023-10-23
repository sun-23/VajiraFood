import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import * as React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaLine,
} from "react-icons/fa";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <Container
      as="footer"
      position="relative"
      bottom="0"
      role="contentinfo"
      py={{
        base: "2",
        md: "2",
      }}
      w="100%"
    >
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Chaichana Lohasaptawee. All rights
        reserved.
      </Text>
    </Container>
  );
}
