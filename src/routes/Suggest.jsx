import {
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Checkbox,
  Box,
  Image,
  AspectRatio,
  IconButton,
} from "@chakra-ui/react";

//slider
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { supabase } from "../helper/supbaseClient";
import { useNavigate } from "react-router-dom";

export default function Suggest() {
  const navigate = useNavigate();
  const [ids, setIDs] = useState([]);
  const [spicyValue, setSpicyValue] = useState(5);
  const [showSpicyTooltip, setSpicyTooltip] = useState(false);
  const [sweetValue, setSweetValue] = useState(5);
  const [showSweetTooltip, setSweetTooltip] = useState(false);
  const [saltyValue, setSaltyValue] = useState(5);
  const [showSaltyTooltip, setSaltyTooltip] = useState(false);

  const [priceValue, setPriceValue] = useState(50);
  const [showPriceTooltip, setPriceTooltip] = useState(false);
  const [calories, setCalories] = useState(250);
  const [showCaloriesTooltip, setCaloriesTooltip] = useState(false);

  const [vegetable, setVegetable] = useState(true);

  useEffect(() => {
    fetchFoodsids();
  }, []);

  async function fetchFoodsids() {
    let { data: Foods, error } = await supabase.from("Foods").select("id");
    if (error) console.log("error", error);
    else setIDs(Foods);
    console.log("data", Foods);
  }

  async function randomfood() {
    let total_foods = ids.length;
    let ranIndex = Math.floor(Math.random() * total_foods) + 1;
    navigate("/food/" + ranIndex);
  }

  async function filterRandomFood() {
    let total = 0;
    let arryIndex = [];
    let { data: Foods, error } = await supabase
      .from("Foods")
      .select("id")
      .eq("isVegetable", vegetable)
      .lte("price", priceValue)
      .lte("calories", calories)
      .lte("spicy_level", spicyValue)
      .lte("sweet_level", sweetValue)
      .lte("salty_level", saltyValue);
    if (error) console.log("error", error);
    else {
      total = Foods.length;
      arryIndex = Foods;
    }

    if (total === 0) {
      alert("ไม่เจออาหารตรงกับที่คุณต้องการ");
    }
    console.log("total", total);
    console.log("array", arryIndex);

    let ran_id = arryIndex[Math.floor(Math.random() * total)].id;
    console.log("goto id", ran_id);
    navigate("/food/" + ran_id);
  }

  return (
    <Container>
      <AspectRatio width="auto" ratio={1}>
        <IconButton
          onClick={() => randomfood()}
          icon={<Image src="src/assets/react.svg" />}
        />
      </AspectRatio>
      <VStack marginTop={3} marginBottom={3} spacing={3} align="stretch">
        <Heading>แบบตัวเลือก</Heading>

        <Checkbox
          onChange={(e) => setVegetable(e.target.checked)}
          textTransform="capitalize"
          isChecked={vegetable}
        >
          มีผัก
        </Checkbox>

        <Box pt={6} pb={2}>
          <Text>แคลอรีไม่เกิน {calories} กิโลแคลอรี</Text>
          <Slider
            id="slider"
            defaultValue={250}
            min={0}
            max={500}
            step={1}
            colorScheme="gray"
            onChange={(v) => setCalories(v)}
            onMouseEnter={() => setCaloriesTooltip(true)}
            onMouseLeave={() => setCaloriesTooltip(false)}
          >
            <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
              20%
            </SliderMark>
            <SliderMark value={250} mt="1" ml="-2.5" fontSize="sm">
              50%
            </SliderMark>
            <SliderMark value={400} mt="1" ml="-2.5" fontSize="sm">
              80%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="gray.500"
              color="white"
              placement="top"
              isOpen={showCaloriesTooltip}
              label={`${calories} กิโลแคลอรี่`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </Box>

        <Box pt={6} pb={2}>
          <Text>ราคาไม่เกิน {priceValue} บาท</Text>
          <Slider
            id="slider"
            defaultValue={50}
            min={0}
            max={200}
            step={1}
            colorScheme="red"
            onChange={(v) => setPriceValue(v)}
            onMouseEnter={() => setPriceTooltip(true)}
            onMouseLeave={() => setPriceTooltip(false)}
          >
            <SliderMark value={40} mt="1" ml="-2.5" fontSize="sm">
              20%
            </SliderMark>
            <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
              50%
            </SliderMark>
            <SliderMark value={160} mt="1" ml="-2.5" fontSize="sm">
              80%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="red.500"
              color="white"
              placement="top"
              isOpen={showPriceTooltip}
              label={`${priceValue} บาท`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </Box>

        <Box pt={6} pb={2}>
          <Text>ระดับความเผ็ด {spicyValue} จาก 10</Text>
          <Slider
            id="slider"
            defaultValue={5}
            min={0}
            max={10}
            step={1}
            colorScheme="red"
            onChange={(v) => setSpicyValue(v)}
            onMouseEnter={() => setSpicyTooltip(true)}
            onMouseLeave={() => setSpicyTooltip(false)}
          >
            <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
              20%
            </SliderMark>
            <SliderMark value={5} mt="1" ml="-2.5" fontSize="sm">
              50%
            </SliderMark>
            <SliderMark value={8} mt="1" ml="-2.5" fontSize="sm">
              80%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="red.500"
              color="white"
              placement="top"
              isOpen={showSpicyTooltip}
              label={spicyValue}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </Box>
        <Box pt={6} pb={2}>
          <Text>ระดับความหวาน {sweetValue} จาก 10</Text>
          <Slider
            id="slider"
            defaultValue={5}
            min={0}
            max={10}
            step={1}
            colorScheme="pink"
            onChange={(v) => setSweetValue(v)}
            onMouseEnter={() => setSweetTooltip(true)}
            onMouseLeave={() => setSweetTooltip(false)}
          >
            <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
              20%
            </SliderMark>
            <SliderMark value={5} mt="1" ml="-2.5" fontSize="sm">
              50%
            </SliderMark>
            <SliderMark value={8} mt="1" ml="-2.5" fontSize="sm">
              80%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="pink.500"
              color="white"
              placement="top"
              isOpen={showSweetTooltip}
              label={sweetValue}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </Box>
        <Box pt={6} pb={2}>
          <Text>ระดับความเค็ม {saltyValue} จาก 10</Text>
          <Slider
            id="slider"
            defaultValue={5}
            min={0}
            max={10}
            step={1}
            colorScheme="teal"
            onChange={(v) => setSaltyValue(v)}
            onMouseEnter={() => setSaltyTooltip(true)}
            onMouseLeave={() => setSaltyTooltip(false)}
          >
            <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
              20%
            </SliderMark>
            <SliderMark value={5} mt="1" ml="-2.5" fontSize="sm">
              50%
            </SliderMark>
            <SliderMark value={8} mt="1" ml="-2.5" fontSize="sm">
              80%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showSaltyTooltip}
              label={saltyValue}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </Box>

        <Button colorScheme="red" size="lg" onClick={() => filterRandomFood()}>
          สุ่มเลย 🤤
        </Button>
      </VStack>
    </Container>
  );
}
