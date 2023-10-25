import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Spacer,
  CloseButton,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { supabase } from "../helper/supbaseClient";
import { useLocation, useNavigate } from "react-router-dom";

import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [alert_title, setAlertTitle] = useState("");
  const [alert_desc, setAlertDesc] = useState("");
  const [alert_status, setAlertStatus] = useState("warning");

  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  // aleart
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const handleLogin = async () => {
    setLoading(true)
    if (!email || !password) {
      setAlertStatus("warning");
      setAlertTitle("กรอกข้อมูลไม่ครบ!");
      setAlertDesc("กรุณากรอกข้อมูลให้ครบถ้วน");
      onOpen();
      setLoading(false)
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log("login data", data);

    if (error) {
      console.log("login error", error);
    } else {
      setAlertStatus("success");
      setAlertTitle("สำเร็จ!");
      setAlertDesc("log in success");
      onOpen();

      //redirectTo in RequireAuth.jsx line 19
      if (locationState) {
        const { redirectTo } = locationState;
        navigate(`${redirectTo.pathname}${redirectTo.search}`);
      }
    }

    setLoading(false)
  };

  const resetPassword = async () => {
    if (!email) {
      return;
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) {

    } else {
      setAlertStatus("success");
      setAlertTitle("สำเร็จ!");
      setAlertDesc("ไปที่ email เพื่อ reset password");
      onOpen();
    }
  }

  return (
    <Container>
      <Heading>Sign in VajiraFood</Heading>
      <Text>Sign in via magic link with your email below</Text>
      <Stack spacing={4} paddingTop={4}>
        {isVisible ? (
          <Alert status={alert_status}>
            <AlertIcon />
            <Box>
              <AlertTitle>{alert_title}</AlertTitle>
              <AlertDescription>{alert_desc}</AlertDescription>
            </Box>
            <Spacer />
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </Alert>
        ) : null}
        <FormControl isRequire>
          <FormLabel mt={3}>Email</FormLabel>
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel mt={3}>Password</FormLabel>
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            leftIcon={<EmailIcon />} 
            mt={3} colorScheme="teal" 
            isLoading={loading} 
            onClick={() => handleLogin()}
          >
            {loading ? <Text>Loading</Text> : <Text>Sign In</Text>}
          </Button>
          <Text>
            ยังไม่มี account?{" "}
            <ChakraLink as={ReactRouterLink} to='/signup'>
              Sign Up
            </ChakraLink>
          </Text>
          <Text>
            ลืม password?{" "}
            <Text onClick={() => resetPassword()}>
              Send email link reset password
            </Text>
          </Text>
        </FormControl>
      </Stack>
    </Container>
  );
}
