"use client";
import * as React from "react";
import { Textarea, useDisclosure } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import Notes from "./components/Notes";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Container,
  Center,
  Icon,
} from "@chakra-ui/react";
import useSWR, { useSWRConfig } from "swr";
export default function Page() {
  const { mutate } = useSWRConfig()
  const [is_Loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();
  const addNote = async (event) => {
    setLoading(true)
    event.preventDefault();
    const noteData = {
      title: event.target.title.value,
      note: event.target.note.value,
    };
    const JSONdata = JSON.stringify(noteData);
    try {
      const endpoint = "/api/add_note";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      const response = await fetch(endpoint, options);
      const result = await response.json();
      if (!response.ok) {
        setLoading(false)
        toast({
          title: `unsuccess created`,
          status: "error",
          isClosable: true,
        });
      } else {
        setLoading(false)
        console.log(result);
        mutate('/api/get_note')
        onClose();
        toast({
          title: `success created`,
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false)
      toast({
        
        title: `unsuccess created`,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <VStack>
      <Container maxW="container.sm">
        <Center mt="10" color="teal">
          <Icon as={DragHandleIcon} w={8} h={8} color="red.500" />
          <h1>Clone Google Keep</h1>
        </Center>
        <Center mt="8">
          <Button onClick={onOpen}>Add Note</Button>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Note</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={addNote}>
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input ref={initialRef} placeholder="Title" name="title" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Note</FormLabel>
                    <Textarea placeholder="Note" name="note" />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                  
                    type="submit"
                    colorScheme="blue"
                    mr={3}
                    isLoading={is_Loading}
                    loadingText="Adding"
                    variant="outline"
                    spinnerPlacement="start"
                  >
                    Add Note
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </Center>
      </Container>
      <Notes></Notes>
    </VStack>
  );
}
