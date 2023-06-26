import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Container,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";

const ENDPOINT = "http://localhost:8000";

const UpdateUser = () => {
  const user = localStorage.getItem("userInfo");
  const parseUser = JSON.parse(user);
  const id = parseUser.user._id;
  const token = parseUser.token;
  console.log(token);
  const toast = useToast();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {};

    if (firstName.trim() !== "") {
      payload.firstName = firstName;
    }

    if (lastName.trim() !== "") {
      payload.lastName = lastName;
    }

    if (email.trim() !== "") {
      payload.email = email;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.patch(
        `${ENDPOINT}/user/updateUser/${id}`,
        payload,
        config
      );
      console.log(data);
      toast({
        title: "Details updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });

      setLoading(false);
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Something went wrong ",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
      setLoading(false);
    }
  };
  return (
    <Container maxW="xl" centerContent mt={"50px"}>
      <Box
        d="flex"
        justifyContent={"center"}
        p={3}
        bg={"white"}
        m={"40px 0 15px 0"}
        w={"100%"}
        h={"80px"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text
          fontSize={"4xl"}
          fontFamily={"Work sans"}
          color={"black"}
          textAlign={"center"}
        >
          {" "}
          Update User Details
        </Text>
      </Box>

      <Box
        bg={"white"}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <VStack spacing={"5px"}>
          <FormControl id="first-name" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              value={firstName}
              placeholder=" First Name"
              onChange={(e) => setFirstName(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl id="first-name" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={lastName}
              placeholder=" Last Name"
              onChange={(e) => setLastName(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>E-Mail</FormLabel>
            <Input
              value={email}
              placeholder=" your email "
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </FormControl>

          <Button
            colorScheme="blue"
            width={"100%"}
            style={{ marginTop: "15px" }}
            onClick={(e) => submitHandler(e)}
            isLoading={loading}
          >
            Update
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default UpdateUser;
