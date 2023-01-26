//create pages for editing status by id and show the data of the problem

import { useState, useEffect } from "react";
import { supabase } from "../helper/supbaseClient";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Stack,
  Wrap,
  WrapItem,
  FormLabel,
  Select,
  Spacer,
  Heading,
  Text,
  Textarea,
  HStack,
  VStack,
  Container,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  CloseButton
} from "@chakra-ui/react";

export default function EditStatus() {
  const [problem, setProblem] = useState({});
  const [changedStatus, setChangedStatus] = useState("");
  const [description, setDesc] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isWarning, setWarning] = useState(false);
  const [isError, setError] = useState(false);
  const [errdescrip, setErrDesc] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetchProblem();
  }, []);

  function parseDate(timestamp) {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return (
      dt +
      "/" +
      month +
      "/" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }

  async function fetchProblem() {
    let { data, error } = await supabase
      .from("problems")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.log("error", error);
    } else {
      setProblem(data);
    }
  }

  async function updateStatus() {
    setLoading(true);
    if (changedStatus && description) {
      let time = Date.now();
      let { data, error } = await supabase
        .from("problems")
        .update({
          status: changedStatus,
          editDesc: description,
          editTimestamp: time,
        })
        .eq("id", id);
      if (error) {
        setErrDesc(error.message);
        setError(true);
        console.log("error", error);
      } else {
        setSuccess(true);
        console.log("success");
      }
    } else {
      setWarning(true);
    }
    setLoading(false);
  }

  //handlechange for select
  function handleChange(e) {
    setChangedStatus(e.target.value);
  }

  const status = {
    pending: "รอรับเรื่อง",
    doing: "กำลังดำเนินการ",
    finishing: "เสร็จสิ้น",
  };

  const statusColor = {
    pending: "red.200",
    doing: "yellow.200",
    finishing: "green.200",
  };

  return (
    <Container>
      <Heading>แก้ไขสถานะ</Heading>
      <Stack spacing={4} paddingTop={4}>
        {isWarning ? (
          <Alert status="warning">
            <AlertIcon />
            <Box>
              <AlertTitle>กรอกข้อมูลไม่ครบ!</AlertTitle>
              <AlertDescription>กรุณากรอกข้อมูลให้ครบถ้วน</AlertDescription>
            </Box>
            <Spacer />
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={() => setWarning(false)}
            />
          </Alert>
        ) : null}
        {isSuccess ? (
          <Alert status="success">
            <AlertIcon />
            <Box>
              <AlertTitle>รายงานปัญหาเสร็จสิ้น</AlertTitle>
              <AlertDescription>
                ขอบคุณที่แจ้งปัญหาให้เราทราบ
                ทางเราจะรีบจัดการปัญหาของท่านอย่างรวดเร็วที่สุด
              </AlertDescription>
            </Box>
            <Spacer />
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={() => setSuccess(false)}
            />
          </Alert>
        ) : null}
        {isError ? (
          <Alert status="error">
            <AlertIcon />
            <Box>
              <AlertTitle>เกิดปัญหา</AlertTitle>
              <AlertDescription>{errdescrip}</AlertDescription>
            </Box>
            <Spacer />
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={() => setError(false)}
            />
          </Alert>
        ) : null}
        <Card key={problem.id}>
          <CardBody>
            <Image
              src={`https://cqrxuuanxfamohfnsgmb.supabase.co/storage/v1/object/public/images/${problem.id}.jpg`}
              alt="problem image"
              boxSize="auto"
              objectFit="cover"
              borderRadius="lg"
              mr={3}
            />
            <Stack mt="6" spacing="3">
              <Heading as="h3" size="md">
                {problem.title}
              </Heading>
              <Text>สถานที่: {problem.place}</Text>
              <Text>timestamp: {parseDate(problem.created_at)}</Text>
              <Text>ประเภท: {problem.type}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Stack direction={["column", "row"]}>
              <HStack>
                <Text fontSize="2xl">สถานะ:</Text>
                <Text color={statusColor[problem.status]} fontSize="2xl">
                  {status[problem.status]}
                </Text>
              </HStack>
            </Stack>
          </CardFooter>
        </Card>

        <Select
          placeholder="เลือกสถานะที่ต้องการจะเปลื่ยน"
          value={changedStatus}
          onChange={handleChange}
        >
          <option value="pending">รอรับเรื่อง</option>
          <option value="doing">กำลังดำเนินการ</option>
          <option value="finishing">เสร็จสิ้น</option>
        </Select>

        <FormLabel mt={3}>รายละเอียด</FormLabel>
        <Textarea
          placeholder="รายละเอียด"
          value={description}
          name="loc"
          onChange={(e) => setDesc(e.target.value)}
        />

        <Button
          isLoading={isLoading}
          onClick={() => {
            updateStatus();
          }}
          variant="solid"
          colorScheme="teal"
          width="100%"
        >
          ยืนยันการเปลื่ยนสถานะ
        </Button>
      </Stack>
    </Container>
  );
}
