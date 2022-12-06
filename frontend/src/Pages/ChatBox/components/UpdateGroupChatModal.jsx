import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  FormControl,
  Input,
  useToast,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../../context/chatProvider";
import UserBadgeItem from "../../Chat/UserBadgeItem";
import axios from "axios";
import UserListItem from "../../Chat/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [renameLoading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleDelte = (userId) => {
    setSelectedUsers(selectedUsers.filter((ele) => ele._id !== userId));
  };

  const handleSearch = async (e) => {
    setSearch(e);
    if (!e) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://chat-app-91em.onrender.com/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      setLoading(false);
      toast({
        position: "top-left",
        title: "Error Occured!",
        description: err.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
      toast({
        position: "top-left",
        title: "Please fill the group name!",
        description: err.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "https://chat-app-91em.onrender.com/api/chats/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      toast({
        position: "top-center",
        title: "Successfully Updated Group Name",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {}
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        position: "top-left",
        title: "User already added!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        position: "top-left",
        title: "Only Group Admin can Add someone!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "https://chat-app-91em.onrender.com/api/chats/groupadd",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast({
        position: "top-left",
        title: "Error Occured!",
        description: err.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user._id !== user1._id) {
      toast({
        position: "top-left",
        title: "Only Group Admin can Add someone!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "https://chat-app-91em.onrender.com/api/chats/groupremove",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      user1.id === user.id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      toast({
        position: "top-center",
        title:
          user1.id === user.id
            ? "Successfully Left group chat"
            : "Successfully removed from group chat",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast({
        position: "top-left",
        title: "Error Occured!",
        description: err.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  };
  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="flex-start"
              p={1.5}
              bg="whitesmoke"
              borderRadius="lg"
              mb={3}
            >
              {selectedChat?.users.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
            </Box>
            <FormControl
              display="flex"
              flexWrap="wrap"
              justifyContent="space-evenly"
            >
              <Input
                w="75%"
                placeholder="Chat Name"
                value={groupChatName}
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                handleRemove(user);
              }}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
