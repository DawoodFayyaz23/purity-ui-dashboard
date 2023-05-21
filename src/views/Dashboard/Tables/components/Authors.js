// Chakra imports
import {
  Avatar,
  Button,
  Container,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomModal from "components/Modal/Modal";
import TablesTableRow from "components/Tables/TablesTableRow";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Authors = ({ title, captions, data }) => {
  const [setData, setSetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const getProducts = async () => {
    const querySnapshot = await getDocs(
      collection(getFirestore(), "inventory")
    );
    const arr = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push({ id: doc.id, ...doc.data() });
    });
    setSetData(arr);
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, [showModal]);
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader
        p="6px 0px 22px 0px"
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        margin={0}
      >
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>
        <Button onClick={() => setShowModal(true)}>Add Product</Button>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {setData.map((row) => {
              return (
                <Tr>
                  <Td w={"20%"}>{row.id}</Td>
                  <Td>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Avatar
                        src={row.image}
                        w="50px"
                        borderRadius="12px"
                        me="18px"
                      />
                      <Flex direction="column">
                        <Text
                          fontSize="md"
                          color={textColor}
                          fontWeight="bold"
                          minWidth="100%"
                        >
                          {row.name}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>{row.count}</Td>
                  <Td>
                    <Button>Transfer</Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
      {showModal ? (
        <CustomModal isOpen={showModal} onClose={() => setShowModal(false)} />
      ) : (
        <></>
      )}
    </Card>
  );
};

export default Authors;
