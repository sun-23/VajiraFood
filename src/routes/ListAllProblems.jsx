import React from "react";
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
  Button,
  Divider,
} from "@chakra-ui/react";
import { supabase } from "../helper/supbaseClient";

export default function ListAllProblems() {
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

  React.useEffect(() => {
    fetchProblems();
  }, []);

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
    let { data: problems, error } = await supabase
      .from("problems")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.log("error", error);
    else setProblems(problems);
  }

  return (
    <Container>
      <Heading mb={5}>List of Problems</Heading>
      <Stack spacing={4} p={3} alignItems="center">
        {problems.map((problem) => {
          return (
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
                <Stack>
                  <Stack direction={["row"]}>
                    <Text fontSize="2xl">สถานะ:</Text>
                    <Text color={statusColor[problem.status]} fontSize="2xl">
                      {status[problem.status]}
                    </Text>
                  </Stack>
                  {problem.editDesc ? (
                    <Text>รายละเอียดการดำเนินงาน: {problem.editDesc}</Text>
                  ) : null}
                  {problem.editTimestamp ? (
                    <Text>
                      วันที่เริมดำเนินการ: {parseDate(problem.editTimestamp)}
                    </Text>
                  ) : null}
                </Stack>
              </CardFooter>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
}
