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
  
  export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conpass, setConpass] = useState("");
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
  
    const handleSignUp = async () => {
      setLoading(true)
      if (!email || !password || !conpass) {
        setAlertStatus("warning");
        setAlertTitle("กรอกข้อมูลไม่ครบ!");
        setAlertDesc("กรุณากรอกข้อมูลให้ครบถ้วน");
        onOpen();
        setLoading(false)
        return;
      }

      if (password !== conpass) {
        setAlertStatus("warning");
        setAlertTitle("password ไม่ตรงกัน!");
        setAlertDesc("กรุณาตรวจสอบอีกที");
        onOpen();
        setLoading(false)
        return;
      }
  
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      console.log("login data", data);
  
      if (error) {
        console.log("login error", error);
        alert(error);
      } else {
        setAlertStatus("success");
        setAlertTitle("สำเร็จ!");
        setAlertDesc("สมัคร account สำเร็จ!");
        onOpen();
  
        //redirectTo in RequireAuth.jsx line 19
        if (locationState) {
            const { redirectTo } = locationState;
            navigate(`${redirectTo.pathname}${redirectTo.search}`);
        }
      }
  
      setLoading(false)
    };
  
    return (
      <Container>
        <Heading>Sign Up VajiraFood</Heading>
        <Text>สมัครใช้งาน VajiraFood</Text>
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
            <FormLabel mt={3}>Confirm Password</FormLabel>
            <Input
                placeholder="confirm password"
                type="text"
                value={conpass}
                onChange={(e) => setConpass(e.target.value)}
            />

            <Button 
              leftIcon={<EmailIcon />} 
              mt={3} colorScheme="teal" 
              isLoading={loading} 
              onClick={() => handleSignUp()}
            >
              {loading ? <Text>Loading</Text> : <Text>Sign Up</Text>}
            </Button>
          </FormControl>
        </Stack>
      </Container>
    );
  }