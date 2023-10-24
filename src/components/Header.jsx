import {
  Image,
  Flex,
  chakra,
  Link,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
//import your logo here!
//import Logo from "../assets/logo.png";
import { Link as routerLink } from "react-router-dom";
import React from "react";
import MobileDrawer from "./MobileDrawer";
import pages from "../helper/routes";
import Logo from "../assets/logo.png";
import { useAuth } from "../helper/auth/hook";
import { useNavigate } from "react-router-dom";
import { supabase } from "../helper/supbaseClient";

export default function Header() {
  const { session, user } = useAuth();
  const navigate = useNavigate();

  return (
    <chakra.header id="header">
      <Flex w="100%" px="6" py="5" align="center" justify="space-between">
        <HStack as="nav" spacing="4" display={{ base: "none", md: "flex" }}>
          {pages.map((page, i) => (
            <Link key={i} as={routerLink} to={page.path}>
              {page.name}
            </Link>
          ))}

          {/* {user && session ? null : (
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )} */}
          {!user || !session ? null : (
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => supabase.auth.signOut()}
            >
              Logout
            </Button>
          )}
        </HStack>
        <MobileDrawer
          pages={() => {
            return pages;
          }}
        />
      </Flex>
    </chakra.header>
  );
}
