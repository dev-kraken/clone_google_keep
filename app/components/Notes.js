import React from "react";
import {
  Container,
  Grid,
  GridItem,
  Card,
  CardBody,
  Text,
  CardHeader,
  Heading,
  Box,
  Badge,
  Spacer,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Center,
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
  Textarea
} from "@chakra-ui/react";
import useSWR, { useSWRConfig } from "swr";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";

export default function Notes() {
  const { mutate } = useSWRConfig();
  const [valueId, setValue] = useState("");
  const [is_Loading, setLoading] = useState(false);
  const { isOpen :isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure();
  const { isOpen :isOpen, onOpen:onOpen, onClose:onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/get_note`, fetcher);
  if (error) return <div>Not Data</div>;
  if (isLoading)
    return (
      <Container>
        <Center>
        <Spinner color="red.500" />
        </Center>
      </Container>
    );

  const deleteHandel = async (event) => {
    setLoading(true)
    let id = event.target.value;
    await fetch(`/api/${id}`, {
      method: "DELETE",
    });
    setLoading(false)
    onClose();
    mutate("/api/get_note");
  };

  return (
    <Container maxW="container.xl" mt="10">
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {data.map((notes) => (
          <GridItem key={notes.id} w="100%" h="auto">
            <Card>
              <CardBody>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Badge variant="outline" colorScheme="green">
                          {notes.title}
                        </Badge>
                      </Flex>
                      <Flex gap="2">
                        <EditIcon color="green.500"
                        onClick={() => {
                          onOpenEdit();
                          setValue(`${notes.id}`);
                        }} />
                        <DeleteIcon
                          onClick={() => {
                            onOpen();
                            setValue(`${notes.id}`);
                          }}
                          color="red.500"
                        />
                      </Flex>
                    </Flex>
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {notes.note}
                  </Text>
                </Box>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cant undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={is_Loading}
                loadingText="Deleting"
                spinnerPlacement="start"
                value={valueId}
                colorScheme="red"
                onClick={deleteHandel}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>


      <Modal
            isOpen={isOpenEdit}
            onClose={onCloseEdit}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Note</ModalHeader>
              <ModalCloseButton />
              <form >
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input placeholder="Title" name="title" />
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
                  <Button onClick={onCloseEdit}>Cancel</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
    </Container>
  );
}
