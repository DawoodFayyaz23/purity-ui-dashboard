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

export default function Dashboard() {
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
  console.log(transactions);
  return (
    !loading && (
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="24px" pb="10px">
          <MiniStatistics
            title={"Total Inventory"}
            amount={setData
              .filter((o) => o.user_id == localStorage.getItem("token"))
              .reduce((p, a) => p + parseInt(a.count), 0)}
            icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
          <MiniStatistics
            title={"Total Products"}
            amount={setData
              .filter((o) => o.user_id == localStorage.getItem("token"))
              .reduce((p, a) => p + 1, 0)}
            icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
          <MiniStatistics
            title={"Total Transactions"}
            amount={transactions
              .filter((o) => o.sender_id == localStorage.getItem("token"))
              .reduce((p, a) => p + 1, 0)}
            percentage={-14}
            icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
          />
        </SimpleGrid>
        <Authors
          title={"Inventory"}
          captions={["hash", "Name", "quantity", "action"]}
          data={tablesTableData}
        />
      </Flex>
    )
  );
}
