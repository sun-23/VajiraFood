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

export default function Login() {
  const [email, setEmail] = useState("");
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
    if (!email) {
      setAlertStatus("warning");
      setAlertTitle("กรอกข้อมูลไม่ครบ!");
      setAlertDesc("กรุณากรอกข้อมูลให้ครบถ้วน");
      onOpen();
      setLoading(false)
      return;
    }

    const { data, error } = await supabase.auth.signInWithOtp({ email, options: {
      emailRedirectTo: 'https://vajirafood.netlify.app/',
    }, })
    console.log("login data", data);

    if (error) {
      console.log("login error", error);
    } else {
      console.log("sending email link");
      setAlertStatus("success");
      setAlertTitle("สำเร็จ!");
      setAlertDesc("ไปที่ email เพื่อรับ link log in จาก supabase");
      onOpen();

      //redirectTo in RequireAuth.jsx line 19
      // if (locationState) {
      //   const { redirectTo } = locationState;
      //   navigate(`${redirectTo.pathname}${redirectTo.search}`);
      // }
    }

    setLoading(false)
  };

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
          <Button 
            leftIcon={<EmailIcon />} 
            mt={3} colorScheme="teal" 
            isLoading={loading} 
            onClick={() => handleLogin()}
          >
            {loading ? <Text>Loading</Text> : <Text>Send magic link</Text>}
          </Button>
        </FormControl>
      </Stack>
    </Container>
  );
}
