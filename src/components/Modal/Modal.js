import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { db } from "../../firebase/index";
import { useState } from "react";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import { toast } from "react-toastify";
import { addDoc, collection, getFirestore } from "firebase/firestore";
const CustomModal = ({ isOpen, onClose }) => {
  //   const storage = getStream(firebaseApp, "gs://finalyp-bc948.appspot.com/");
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please upload an image");
      return;
    }
    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!quantity) {
      toast.error("Initial count cannot be zero");
      return;
    }
    try {
      const docRef = await addDoc(collection(getFirestore(), "inventory"), {
        count: quantity,
        name,
        image: file,
        user_id: localStorage.getItem("token"),
      });
      //   console.log("Document written with ID: ", docRef);
      toast.success("Prodcut uploaded successfully!");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("An error occured please try agaian");
    }
  };
  const uploader = Uploader({
    apiKey: "free",
  });
  const uploaderOptions = {
    multi: false,
    styles: {
      colors: {
        primary: "#377dff",
      },
    },
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Name
          </FormLabel>
          <Input
            borderRadius="15px"
            mb="24px"
            fontSize="sm"
            type="text"
            placeholder="Product Name"
            size="lg"
            onChange={(e) => setName(e.target.value)}
          />
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Quantity
          </FormLabel>
          <Input
            borderRadius="15px"
            mb="36px"
            fontSize="sm"
            type="number"
            placeholder="Quantity"
            size="lg"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Image
          </FormLabel>
          <UploadButton
            uploader={uploader}
            options={uploaderOptions}
            onComplete={(e) => setFile(e[0].fileUrl)}
          >
            {({ onClick }) => (
              <Button onClick={onClick}>{"Upload a file..." || file}</Button>
            )}
          </UploadButton>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpload}>
            Create Product
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
