import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function AddTodo({ onAdd }) {
  const [item, setItem] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInput = (event) => {
    setItem(event.target.value);
  };

  const handleSubmit = () => {
    if (item.trim()) {
      onAdd(item);
      onClose();
      setItem("");
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Adicionar Tarefa</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Atividade"
                aria-label="A Fazer"
                value={item}
                onChange={handleInput}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit}>Adicionar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function TodoHelper({ item, onDelete, onUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleUpdate = () => {
    if (updatedItem.trim()) {
      onUpdate(updatedItem);
      onClose();
    }
  };

  return (
    <Box p={4} shadow="md" borderWidth="1px">
      <Flex justify="space-between">
        <Text fontWeight="semibold">{item}</Text>
        <Flex>
          <Button onClick={onOpen} mr={2}>
            Atualizar
          </Button>
          <Button colorScheme="red" onClick={onDelete}>
            Excluir
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar Tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Atualizar tarefa"
                aria-label="Atualizar tarefa"
                value={updatedItem}
                onChange={(e) => setUpdatedItem(e.target.value)}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleUpdate}>Atualizar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default function Todos() {
  const [todos, setTodos] = useState([]);

  const handleAdd = (newItem) => {
    setTodos([...todos, newItem]);
  };

  const handleUpdate = (updatedItem) => {
    // Lógica para atualizar a tarefa na lista
    console.log("Tarefa atualizada:", updatedItem);
  };

  const handleDelete = (index) => {
    // Lógica para excluir a tarefa da lista
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <>
      <AddTodo onAdd={handleAdd} />
      <Stack spacing={4}>
        {todos.map((todo, index) => (
          <TodoHelper
            key={index}
            item={todo}
            onDelete={() => handleDelete(index)}
            onUpdate={handleUpdate}
          />
        ))}
      </Stack>
    </>
  );
}
