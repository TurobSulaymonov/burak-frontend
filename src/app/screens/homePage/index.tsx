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
import "../../../css/home.css";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),

});


export default function HomePage() {
  const {setPopularDishes, setNewDishes} = actionDispatch(useDispatch());

 
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
    console.log("Data haqida malumot:", date)
    setNewDishes(date);
  }) 
  .catch(err => 
    console.log("ERROR:", err)
  );

 }, []);


    return <div className={"homepage"}>
      <Statistics/>
      <PopularDishes />
      <NewDishes/>
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>;
  }