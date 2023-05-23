// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React from "react";
import { dashboardTableData, timelineData } from "variables/general";
import ActiveUsers from "./components/ActiveUsers";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import MiniStatistics from "./components/MiniStatistics";
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";
import SalesOverview from "./components/SalesOverview";
import WorkWithTheRockets from "./components/WorkWithTheRockets";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Authors from "../Tables/components/Authors";
import { tablesTableData } from "variables/general";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useState } from "react";
import Transactions from "../Tables/components/Transactions";

export default function Transaction() {
  const iconBoxInside = useColorModeValue("white", "white");
  const [setData, setSetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
      history.push("/auth/signin");
    }
  }, []);
  const getProducts = async () => {
    const querySnapshot = await getDocs(
      collection(getFirestore(), "inventory")
    );
    const querySnapshot2 = await getDocs(
      collection(getFirestore(), "transactions")
    );
    const arr = [];
    const arr2 = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push({ id: doc.id, ...doc.data() });
    });
    querySnapshot2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr2.push({ ...doc.data() });
    });
    setTransactions(arr2);
    setLoading(false);
    setSetData(arr);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    !loading && (
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <Transactions
          title={"Transaction"}
          captions={[
            "Transaction Hash",
            "Merchant Hash",
            "Manufacturer Hash",
            "Product ID",
            "Quantity",
          ]}
          data={tablesTableData}
        />
      </Flex>
    )
  );
}
