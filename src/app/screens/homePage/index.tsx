import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./AcitveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {setNewDishes, setPopularDishes, setTopUsers} from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";
import OurClients from "./OurClients";
import { CartItem } from "../../../lib/types/search";
/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

interface HomePageProps {
  onAdd: (item: CartItem) => void;
 }

export default function HomePage(props: HomePageProps) {
  const {onAdd} = props;
  const {setPopularDishes, setNewDishes, setTopUsers} = actionDispatch(useDispatch());

 
 useEffect(() => {
  // Backend server data fetch => Data
  const product = new ProductService();
  product
  .getProducts({
    page: 1,
    limit: 4,
    order: "productViews",
    productCollection: ProductCollection.DISH,
  })
  .then(date => {
    console.log("Data passed here:", date)
    setPopularDishes(date);
  }) 
  .catch(err => 
    console.log("ERROR:", err)
  );

  product
  .getProducts({
    page: 1,
    limit: 4,
    order: "createdAt",
   // productCollection: ProductCollection.DISH,
  })
  .then(date => {
    console.log("Data passed here:", date)
    setNewDishes(date);
  }) 
  .catch(err => 
    console.log("ERROR:", err)
  );
  const member = new MemberService();
  member
  .getTopUsers()
  .then(date => {
    console.log("Data malumot haqida:", date)
    setTopUsers(date);
  }) 
  .catch(err => 
    console.log("ERROR:", err)
  );
 }, []);


    return <div className={"homepage"}>
     <Statistics/>
     <NewDishes onAdd={onAdd}/>
      <PopularDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
      <OurClients/>
      
    </div>;
  }