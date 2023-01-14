import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  AspectRatio,
  Stack,
  Text,
  Button,
  CloseButton,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";

export default function CreateReport() {
  const [isLoading, setLoading] = useState(false);

  // description
  const [description, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  // image file
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  // aleart
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false })

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "desc") {
      setDesc(value);
    } else if (name === "image") {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
    } else if (name === "loc") {
      setLocation(value);
    } else if (name === "type") {
      setType(value);
    }
  };

  const handleSubmit = () => {
    if (!file || !description || !location || !type) {
        onOpen();
        return
    }
    setLoading(true);
    console.log("submit");
  };

  return (
    <Container>
      <Heading>แจ้งปัญหาทางกายภาพในโรงเรียน</Heading>
      <Stack spacing={4} paddingTop={4}>
        {isVisible ? (
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
              onClick={onClose}
            />
          </Alert>
        ) : null}
        <AspectRatio width="auto" ratio={1}>
          <Box
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundColor="gray.300"
            backgroundImage={preview}
            rounded="md"
          >
            <Stack p="8" textAlign="center" spacing="1">
              <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                เลือกภาพ
              </Heading>
              <Text color="gray.700" fontWeight="light">
                กดเพื่อเลือกไฟล์ภาพ
              </Text>
            </Stack>
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
          </Box>
        </AspectRatio>

        <FormControl isRequired>
          <FormLabel>หมวดหมู่ปัญหา</FormLabel>
          <Select
            name="type"
            placeholder="กรุณาเลือกหมวดหมู่ปัญหาที่เกี่ยวข้อง"
            value={type}
            onChange={handleChange}
          >
            <option value="water">ระบบน้ำ</option>
            <option value="electronic">ระบบไฟฟ้า</option>
            <option value="computer">ระบบคอมพิวเตอร์</option>
            <option value="component">อุปกรณ์ชำรุด</option>
          </Select>

          <FormLabel>รายละเอียด</FormLabel>
          <Textarea
            placeholder="รายละเอียด"
            value={description}
            name="desc"
            onChange={handleChange}
          />

          <FormLabel>สถานที่</FormLabel>
          <Textarea
            placeholder="สถานที่"
            value={location}
            name="loc"
            onChange={handleChange}
          />
        </FormControl>

        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          colorScheme="teal"
          variant="outline"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
}