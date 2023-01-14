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
  const [problems, setProblems] = React.useState([]);

  React.useEffect(() => {
    fetchProblems();
  }, []);

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
      <Stack spacing={4}>
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
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Text color="blue.600" fontSize="2xl">
                  สถานะ: {problem.status}
                </Text>
              </CardFooter>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
}
