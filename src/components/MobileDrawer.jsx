import {
  useDisclosure,
  Flex,
  Button,
  VStack,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import CustomDrawer from "./CustomDrawer";
import { IoMdMenu } from "react-icons/io";
import React from "react";
import pages from "../helper/routes";

import { useAuth } from "../helper/auth/hook";
import { useNavigate } from "react-router-dom";
import { supabase } from "../helper/supbaseClient";

export default function MobileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { session, user } = useAuth();
  const navigate = useNavigate();

  //your path to pages

  return (
    <Flex display={{ base: "flex", md: "none" }}>
      <Button ref={btnRef} onClick={onOpen}>
        <IoMdMenu size="26px" />
      </Button>
      <CustomDrawer isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <VStack alignItems="left">
          {pages.map((page, i) => (
            <ChakraLink key={i} href={page.path}>
              <Button variant="text">{page.name}</Button>
            </ChakraLink>
          ))}

          {user && session ? null : (
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
          {user && session ? null : (
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          )}
          {!user || !session ? null : (
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => supabase.auth.signOut()}
            >
              Logout
            </Button>
          )}
        </VStack>
      </CustomDrawer>
    </Flex>
  );
}
