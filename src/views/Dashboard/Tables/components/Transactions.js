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
import TransferModal from "components/Modal/TransferModal";
import TablesTableRow from "components/Tables/TablesTableRow";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Transactions = ({ title, captions, data }) => {
  const [setData, setSetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectQuantity, setSelectQuantity] = useState(0);
  const [productId, setProductId] = useState("");
  const getProducts = async () => {
    const querySnapshot = await getDocs(
      collection(getFirestore(), "transactions")
    );
    const arr = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push({ id: doc.id, ...doc.data() });
    });
    setSetData(arr);
    setLoading(false);
  };
  console.log(setData);
  useEffect(() => {
    getProducts();
  }, [showModal, showTransferModal]);
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
            {setData
              .filter((o) => o.sender_id == localStorage.getItem("token"))
              .map((row) => {
                return (
                  <Tr>
                    <Td w={"20%"}>{row.id}</Td>
                    <Td>{row.merchant_id}</Td>
                    <Td>{row.sender_id}</Td>
                    <Td>{row.product_id}</Td>
                    <Td>{row.quantity}</Td>
                    <Td></Td>
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
      {showTransferModal ? (
        <TransferModal
          isOpen={showTransferModal}
          onClose={() => setShowTransferModal(false)}
          quantity={selectQuantity}
          productId={productId}
        />
      ) : (
        <></>
      )}
    </Card>
  );
};

export default Transactions;
