import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ENDPOINT = "http://localhost:8000";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    if (!firstName || !lastName || !email || !password || !confirm_password) {
      toast({
        title: "Please Fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
      setLoading(false);
      return;
    }

    if (password !== confirm_password) {
      toast({
        title: "password does not match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        "content-type": "application/json",
      };
      const { data } = await axios.post(
        `${ENDPOINT}/user/register`,
        {
          firstName,
          lastName,
          email,
          password,
          confirm_password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Register successful Please Login",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });

      setLoading(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
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
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder=" password "
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Show" : "Hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm-Password</FormLabel>
        <InputGroup>
          <Input
            value={confirm_password}
            type={show ? "text" : "password"}
            placeholder=" confirm password  "
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Show" : "Hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default Signup;
