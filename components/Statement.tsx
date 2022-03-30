import { Flex, Heading, Avatar, Text, Tr, Td } from "@chakra-ui/react";

export default function Statement(props: any) {
  return (
    <Tr>
      <Td>
        <Flex align="center">
          <Avatar size="sm" mr={2} src="amazon.jpeg" />
          <Flex flexDir="column">
            <Heading size="sm" letterSpacing="tight">
              {props.name}
            </Heading>
            <Text fontSize="sm" color="gray">
              {props.date}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>{props.type}</Td>
      <Td isNumeric>
        <Text fontWeight="bold" display="inline-table">
          -${props.value}
        </Text>
      </Td>
    </Tr>
  );
}
