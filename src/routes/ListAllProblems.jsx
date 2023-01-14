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
      {problems.map((problem) => {
        return (
          <Card key={problem.id}>
            <CardHeader>
              <Heading as="h3" size="md">
                {problem.title}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>{problem.place}</Text>
            </CardBody>
            <CardFooter>
              <Image
                src={`https://cqrxuuanxfamohfnsgmb.supabase.co/storage/v1/object/public/images/${problem.id}.jpg`}
                alt="problem image"
                boxSize="100px"
                objectFit="cover"
                borderRadius="lg"
                mr={3}
              />
            </CardFooter>
          </Card>
        );
      })}
    </Container>
  );
}
