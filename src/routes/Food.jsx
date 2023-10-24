import {
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Box,
  Image,
  AspectRatio,
  Textarea,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

import { StarIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { supabase } from "../helper/supbaseClient";
import { useParams } from "react-router-dom";
import { useAuth } from "../helper/auth/hook";

import StarRating from "../components/StarRating";

export default function Food() {
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();


  // review
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rating_star, setRatingStar] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchFood();
    fetchReviews();
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

  async function fetchReviews(){
    let { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("food_id", id)
      .order("created_at", { ascending: false });
    if (error) console.log("error", error);
    else setReviews(reviews);
    console.log("reviews", reviews);
  }

  async function handleReview() {
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        { 
          food_id: food.id, 
          user_email: user.email, 
          text: text, 
          rating_star: rating_star
        },
      ])
      .select()

    if (!error) {
      alert("เขียนรีวืวเสร็จ");
      fetchReviews();
      onClose();
    }
  }

  return (
    <Container>
      <AspectRatio width="auto" ratio={1}>
        <Image borderRadius={5} src={food.imgUrl} />
      </AspectRatio>
      <VStack marginTop={3} spacing={3} marginBottom={3}>
        <Heading>ชื่อเมนู {food.name}</Heading>
        <Text fontSize="xl">
          คำอธิบาย {!food.description ? "ไม่มีคำอธฺบาย" : food.description}
        </Text>
        <Heading>ร้าน {food.restaurant_name}</Heading>
        <Text fontSize="xl">บริเวณ {food.area}</Text>
        <Heading>ราคา {food.price} บาท</Heading>
        <Heading as="h3" size="lg">
          จำนวนแคลอรี่ {food.calories} กิโลแคลอรี
        </Heading>
        <VStack spacing={3} align="stretch">
          <Button colorScheme="teal" size="lg" onClick={() => onOpen()}>
            เขียนรีวิว
          </Button>
          {reviews.length > 0 ? (
            reviews.map((review) => {
              return (
                <Box
                  key={review.id}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                >
                  <Box p="6">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      noOfLines={1}
                    >
                      {review.user_email}
                    </Box>
                    <Box display="flex" mt="2" alignItems="center">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            color={
                              i < review.rating_star ? "#ffc107" : "#e4e5e9"
                            }
                          />
                        ))}
                    </Box>
                    <Box mt="1" as="h4" lineHeight="tight">
                      {review.text}
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Text>ไม่มีรีวิว</Text>
          )}
        </VStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>เขียนรีวิว</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack padding={3}>
                <StarRating rating={rating_star} setRating={setRatingStar} />
                <Text>{rating_star} ดาว</Text>
              </HStack>
              <Textarea
                placeholder="เขียนรีวิวเลย"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                colorScheme="red"
                mr={3}
                onClick={onClose}
              >
                ยกเลิก
              </Button>
              <Button colorScheme="teal" onClick={() => handleReview()}>
                ตกลง
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
}
