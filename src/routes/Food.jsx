import {
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  StackDivider,
  Box,
  Image,
  AspectRatio,
  IconButton,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { supabase } from "../helper/supbaseClient";
import { useParams } from "react-router-dom";

export default function Food() {
  const { id } = useParams();
  const [food, setFood] = useState({});

  useEffect(() => {
    fetchFood();
  }, []);

  async function fetchFood() {
    let { data: Food, error } = await supabase
      .from("Foods")
      .select("*")
      .eq("id", id);
    if (error) console.log("error", error);
    else setFood(Food[0]);
    console.log("data", Food[0]);
  }

  return (
    <Container>
      <AspectRatio width="auto" ratio={1}>
        <Image borderRadius={5} src={food.imgUrl} />
      </AspectRatio>
      <VStack marginTop={3} spacing={3} marginBottom={3}>
        <Heading>ชื่อเมนู {food.name}</Heading>
        <Text fontSize="xl">คำอธิบาย {food.description}</Text>
        <Heading>ร้าน {food.restaurant_name}</Heading>
        <Text fontSize="xl">บริเวณ {food.area}</Text>
        <Heading>ราคา {food.price} บาท</Heading>
        <Heading as="h3" size="lg">
          จำนวนแคลอรี่ {food.calories} กิโลแคลอรี
        </Heading>
        <HStack spacing={3}>
          <VStack>
            <Text fontSize="xl">Review</Text>
            <Box display="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < food.rating ? "yellow.500" : "gray.300"}
                  />
                ))}
            </Box>
          </VStack>
          <Button
            colorScheme="red"
            size="lg"
            onClick={() => console.log("map")}
          >
            นำทางไปเลย
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}
