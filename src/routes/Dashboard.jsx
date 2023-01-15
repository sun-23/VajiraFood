import React, { useState } from "react";
import {
  Container,
  Heading,
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Stack,
  Wrap,
  WrapItem,
  Button,
  Divider,
  FormLabel,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { supabase } from "../helper/supbaseClient";

export default function Dashboard() {
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

  const [problems, setProblems] = React.useState([]);
  const [type, setType] = useState("");

  React.useEffect(() => {
    fetchProblems();
  }, [type]);

  //fucntion parse timestamp to readable date\
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

  async function fetchProblems() {
    if (type) {
      let { data: problems, error } = await supabase
        .from("problems")
        .select("*")
        .in("status", ["pending", "doing"])
        .eq("type", type)
        .order("created_at", { ascending: false });
      if (error) console.log("error", error);
      else setProblems(problems);
    } else {
      let { data: problems, error } = await supabase
        .from("problems")
        .select("*")
        .in("status", ["pending", "doing"])
        .order("created_at", { ascending: false });
      if (error) console.log("error", error);
      else setProblems(problems);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "type") {
      setType(value);
    }
  };

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

  //jump to editstatus page
  function jumpToEditStatus(id) {
    window.location.href = "/problems/" + id;
  }

  return (
    <Container maxW="90%" centerContent>
      <Heading mb={5}>รายการปัญหาที่แก้ไขยังไม่เสร็จสิ้น</Heading>

      <FormLabel>หมวดหมู่ปัญหา</FormLabel>
      <Select
        maxW="container.lg"
        name="type"
        placeholder="ทุกชนิดปัญหา"
        value={type}
        onChange={handleChange}
      >
        <option value="water">ระบบน้ำ</option>
        <option value="electronic">ระบบไฟฟ้า</option>
        <option value="computer">ระบบคอมพิวเตอร์</option>
        <option value="component">อุปกรณ์ชำรุด</option>
      </Select>

      <Wrap spacing={4} p={3} justify="center">
        {problems.length > 0 ? (
          problems.map((problem) => {
            return (
              <WrapItem key={problem.id}>
                <Card maxW="xs">
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
                    <Stack direction={["column", "row"]} width="100%">
                      <Text fontSize="xl">สถานะ:</Text>
                      <Text color={statusColor[problem.status]} fontSize="xl">
                        {status[problem.status]}
                      </Text>
                      <Spacer />
                      <Button
                        colorScheme="yellow"
                        onClick={jumpToEditStatus(problem.id)}
                        alignSelf="flex-end"
                      >
                        ดำเนินการ
                      </Button>
                    </Stack>
                  </CardFooter>
                </Card>
              </WrapItem>
            );
          })
        ) : (
          <Text>ไม่มีปัญหาที่ต้องแก้ไข</Text>
        )}
      </Wrap>
    </Container>
  );
}
