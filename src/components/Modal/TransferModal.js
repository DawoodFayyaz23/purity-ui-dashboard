import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { db } from "../../firebase/index";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TransferModal = ({ isOpen, onClose, quantity, productId }) => {
  //   const storage = getStream(firebaseApp, "gs://finalyp-bc948.appspot.com/");
  const [admin, setAdmin] = useState([]);
  const [count, setCount] = useState(0);
  const [merchant, setMerchant] = useState("");
  const [reciepent, setReciepent] = useState({});
  const handler = async () => {
    if (count < 0) {
      toast.error("Count cannot be smaller than 1");
      return;
    }
    if (count > parseInt(quantity)) {
      toast.error(`You only have ${quantity} in your inventory`);
      return;
    }
    if (!merchant) {
      toast.error("Please seleact merchant to transfer the product");
      return;
    }
    try {
      const docRef = await addDoc(collection(getFirestore(), "transactions"), {
        quantity: count,
        product_id: productId,
        sender_id: localStorage.getItem("token"),
        merchant_id: merchant,
      });
      //   const inventoryCollection = await collection(getFirestore(), "inventory");
      const productRef = await doc(getFirestore(), "inventory", productId);
      await updateDoc(productRef, {
        count: parseInt(quantity) - parseInt(count),
      });
      toast.success("Transaction Successfull");
      onClose();
    } catch (error) {
      toast.error("An error Occured please try again!");
    }
  };
  const fetchData = async () => {
    const querySnapshot = await getDocs(
      collection(getFirestore(), "users_metadata")
    );
    const arr = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data?.merchant) {
        arr.push({ ...data });
      }
    });
    setAdmin(arr);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Quantity
          </FormLabel>
          <Input
            borderRadius="15px"
            mb="24px"
            fontSize="sm"
            type="number"
            placeholder="Quantity"
            size="lg"
            min={1}
            max={quantity}
            onChange={(e) => setCount(e.target.value)}
          />
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Merchant
          </FormLabel>
          <Select
            placeholder="Select Merchant"
            onChange={(e) => setMerchant(e.target.value)}
          >
            {admin.length ? (
              admin.map((obj) => {
                return <option value={obj.id}>{obj.email}</option>;
              })
            ) : (
              <></>
            )}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handler}>
            Transfer Product
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransferModal;
