import {
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Box,
  Image,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from "../helper/supbaseClient";

export default function Home() {
  const navigate = useNavigate();
  const locale = "th";
  const [today, setDate] = useState(new Date());
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  async function fetchRestaurant() {
    // alert("test");
    // SOLVED Empty Array #3780
    // https://github.com/orgs/supabase/discussions/3780
    let { data, error } = await supabase.from("Restaurant").select("*");
    if (error) console.log("error", error);
    else setRestaurants(data);
    console.log("data", data);
  }

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;

  const hour = today.getHours();
  const wish = `Good ${
    (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  }, `;

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  return (
    <Container>
      <VStack spacing={3}>
        <Text fontSize="3xl">VajiraFood</Text>
        <Heading as="h1" size="4xl" noOfLines={1}>
          {time}
        </Heading>
        <Button
          colorScheme="red"
          size="lg"
          onClick={() => navigate("/suggest")}
        >
          หิวแล้ว 😐
        </Button>
      </VStack>
      <Text fontSize="2xl">ร้านอาหาร</Text>
      <HStack>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => {
            return (
              <Box
                key={restaurant.id}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
              >
                <Image src={restaurant.imgUrl} />
                <Box p="6">
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                  >
                    {restaurant.name}
                  </Box>
                  <Box mt="1" as="h4" lineHeight="tight" noOfLines={1}>
                    {restaurant.description}
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={
                            i < restaurant.rating ? "#ffc107" : "#e4e5e9"
                          }
                        />
                      ))}
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <Text>no restaurant</Text>
        )}
      </HStack>
    </Container>
  );
}
