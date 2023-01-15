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
  HStack,
  VStack,
} from "@chakra-ui/react";

export default function EditStatus() {
  const [problem, setProblem] = useState({});
  const [changedStatus, setChangedStatus] = useState("");
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
    let { data, error } = await supabase
      .from("problems")
      .update({ status: changedStatus })
      .eq("id", id);
    if (error) {
      console.log("error", error);
    } else {
      console.log("success");
    }
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
    <VStack pr={2} pl={2}>
      <Heading>แก้ไขสถานะ</Heading>
      <Card key={problem.id} maxW="sm">
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

      <Button
        onClick={() => {
          updateStatus();
        }}
        variant="solid"
        colorScheme="teal"
        width="100%"
      >
        ยืนยันการเปลื่ยนสถานะ
      </Button>
    </VStack>
  );
}
