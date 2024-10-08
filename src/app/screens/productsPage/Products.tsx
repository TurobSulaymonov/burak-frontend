import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, PaginationItem, Select, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import paginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { setChosenProduct, setProducts, setRestaurant } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});


    // REDUX SLICE & SELECTOR 
    const productsRetriever = createSelector(
      retrieveProducts,
      (products) => ({products}),
    );


    interface ProductsProps {
      onAdd: (item: CartItem) => void;
     }

export default function Products(props: ProductsProps) {
   const {onAdd} = props,
    {setProducts} = actionDispatch(useDispatch()),
    {products} = useSelector(productsRetriever),
    [productSearch, setProductsSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 3,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
   });

   const [searchText, setSearchText] = useState<string>("");
   const history = useHistory();

  useEffect(() =>{
    const product = new ProductService();
    product.getProducts(productSearch).then((data) => setProducts(data))
      .catch(err => 
        console.log("ERROR:", err));
  }, [productSearch]);

  useEffect(() => {
    if(searchText === "") {
      productSearch.search = "";
      setProductsSearch({...productSearch });
    }
  }, [searchText])

 /* * HANDLERS * */
 const searchCollectionHandler = (collecion: ProductCollection) => {
   productSearch.page = 1;
   productSearch.productCollection = collecion;
   setProductsSearch({...productSearch});
 };
 
 const searchOrderHandler = (order:string) => {
  productSearch.page = 1;
  productSearch.order = order;
  setProductsSearch({...productSearch});
 };

 const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductsSearch({...productSearch})
 };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductsSearch({...productSearch});
  };
 
  const chooseDishHandler = (id: string) => {
   history.push(`/products/${id}`);
  }

  return (
    <div className="products">
      <Container>

        <Stack flexDirection={"column"} alignItems={"center"}>

          <Stack className={"avatar-txt-srch"}>
            <Box className={"burak-restaurant-txt"}> Our Restaurant Menu</Box>

            <Stack className="inputs">
              <input
                className="input-srch"
                name="singleResearch"
                type="search"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if(e.key === "Enter") searchProductHandler();
                  }}
              />
              <Button className="input-btn"
              variant="contained"
              endIcon={<SearchIcon/>}
              onClick={searchProductHandler}>
                SEARCH
               {/*  <SearchIcon /> */}
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Stack className={"dishes-filter-section"}>
          <Stack className={"dishes-filter-box"}>
          <FormControl fullWidth style={{width: "110px", border: "none"}}>
  <InputLabel id="demo-simple-select-label" style={{ }}>Sort</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"

  > <MenuItem>Sort</MenuItem>
    <MenuItem value={20}>   <Button variant={"contained"} 
            className="order"
            color=
            {productSearch.order === "createdAt" ?  "primary"
            : "secondary"} 
            onClick={() => searchOrderHandler("createdAt")}
            >
              New
            </Button></MenuItem>
    <MenuItem value={30}>      
            <Button variant={"contained"}
            className="order"
            color={productSearch.order === "productPrice" ? "primary"
            : "secondary"}
            
             onClick={() => searchOrderHandler("productPrice")}
             >
              Price
            </Button></MenuItem>
    <MenuItem value={40}>       <Button variant={"contained"}
            className="order"
             color={productSearch.order === "productViews"  ?  "primary"
             : "secondary"}
              onClick={() => searchOrderHandler("productViews")}>
              Views
            </Button></MenuItem>
  </Select>
</FormControl>
       

          </Stack>
        </Stack>

        <Stack className={"list-category-section"}>
          <Stack>
            <div className="gategory-main">
              <Button variant={"contained"} color={
                productSearch.productCollection === ProductCollection.OTHER
                ?  "primary"
                : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.OTHER)}>
                Other
              </Button>

              <Button variant={"contained"} 
              color={
                productSearch.productCollection === ProductCollection.DESSERT
                ?  "primary"
                : "secondary"
              } onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}>
                Dessert
              </Button>

              <Button variant={"contained"} color={
                productSearch.productCollection === ProductCollection.DRINK
                ?  "primary"
                : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.DRINK)}>
                Drink
              </Button>

              <Button variant={"contained"} color={
                productSearch.productCollection === ProductCollection.SALAD
                ?  "primary"
                : "secondary"
              }
              onClick={() => searchCollectionHandler(ProductCollection.SALAD)}>
                Salad
              </Button>

              <Button variant={"contained"} color={
                productSearch.productCollection === ProductCollection.DISH
                ?  "primary"
                : "secondary"
              }

              onClick={() => searchCollectionHandler(ProductCollection.DISH)}>
                Dish
              </Button>
            </div>
          </Stack>


          <Stack className="products-wrapper">
            {products.length !== 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages}`;
                const sizeVolume = 
                product.productCollection === ProductCollection.DRINK
                ? product.productVolume + "litre"
                : product.productSize + "size";
                return (
                  <Stack key={product._id} className="col" onClick={() => chooseDishHandler(product._id)}>
                    <Stack
                      className={"img-container"}
                     
                    >
                      <img src={imagePath} className="card-img" alt=""  />
                    </Stack>
                      <Stack className={"product-sale"}>{sizeVolume}</Stack>
                      <Stack className="title">
                        <h2>{product.productName}</h2>
                        <p>$ {product.productPrice}</p>
                       </Stack>
                       <div className="para">
                        <p>{product.productDesc}</p>
                       </div>

                       <div className="footer">
                       <Stack className="star-container" sx={{right: "36px"}}>
                        
                        <Badge
                          className="eye"
                          badgeContent={product.productViews}
                          color="secondary"
                        >
                        <RemoveRedEyeIcon
                        sx={{
                          color: product.productViews === 0 ? "black": "gray"
                        }}
                        />
                        </Badge>
                        </Stack>
                      
                      <div className="button-container">
                      <Button className={"shop"}
                       onClick={(e) => {
                       
                        onAdd ({
                          _id: product._id,
                          quantity: 1,
                          name: product.productName,
                          price: product.productPrice,
                          image: product.productImages[0],
                        });
                        e.stopPropagation();
                       }}>Add to Card
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex", 
                              marginLeft:"10px"
                            }}
                          />
                        </Button>
                      </div>
                   
                       </div>
                       


                  </Stack>
                );
              })
            ) : (
              <Box className="no-data">Product are not available!</Box>
            )}
          
        </Stack>
          <Stack className="pagination-section" 
          style={{marginTop: "40px"}}>
            <Pagination
              count={
                products.length !== 0 
                ? productSearch.page + 1
                : productSearch.page  
              
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>

      </Container>
      
      <div className={"brands-logo"}>
        <Container>
          <Stack className="brand-title">
            <Box className={"brand-txt"}>Meet Our Chefs</Box>
        </Stack>
        

        <Stack className="brand-all-box">
          <Stack className="brand-box">
            <Stack className="img">
              <img src="/img/chef-povar-2.jpg" />
            </Stack>
          </Stack>

          <Stack className="brand-box">
            <Stack className="img">
              <img src="/img/chef-povar.png" />
            </Stack>
          </Stack>

          <Stack className="brand-box">
            <Stack className="img">
              <img src="/img/chef-povar-3.jpg" />
            </Stack>
          </Stack>


        </Stack>
        </Container>
      </div>
     
      <div className={"address"}>
        <Container>
          <Stack className="address-area">
            <Box className={"title"}>Our Addres</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}