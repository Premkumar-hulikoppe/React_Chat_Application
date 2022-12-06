import React from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    show ? setShow(false) : setShow(true);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill All the Credentials!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://chat-app-91em.onrender.com/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="4px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        w="100%"
        variant="solid"
        colorScheme="blue"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        w="100%"
        variant="solid"
        colorScheme="red"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("224466");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
