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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { supabase } from "../helper/supbaseClient";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert_title, setAlertTitle] = useState("");
  const [alert_desc, setAlertDesc] = useState("");

  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  // aleart
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertTitle("กรอกข้อมูลไม่ครบ!");
      setAlertDesc("กรุณากรอกข้อมูลให้ครบถ้วน");
      onOpen();
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
      //redirectTo in RequireAuth.jsx line 19
      if (locationState) {
        const { redirectTo } = locationState;
        navigate(`${redirectTo.pathname}${redirectTo.search}`);
      }
    }
  };

  return (
    <Container>
      <Heading>Login เข้าใช้งานฝ่ายบำรุง</Heading>
      <Stack spacing={4} paddingTop={4}>
        {isVisible ? (
          <Alert status="warning">
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
        <FormControl isRequired>
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
        </FormControl>

        <Button colorScheme="teal" onClick={() => handleLogin()}>
          Login
        </Button>
      </Stack>
    </Container>
  );
}
