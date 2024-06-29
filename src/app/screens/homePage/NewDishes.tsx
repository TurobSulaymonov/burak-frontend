import React from "react";
import { Box, Container, Stack } from "@mui/material";
import  AspectRatio  from "@mui/joy/AspectRatio";
import Card from '@mui/joy/Card';

import Typography from '@mui/joy/Typography';
import {CssVarsProvider} from "@mui/joy/styles"


/* test */

import Button from '@mui/joy/Button';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
/* 
 */

import {  useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes} from "./selector";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { CartItem } from "../../../lib/types/search";
import { useHistory } from "react-router-dom";


interface NewDishesProps {
  onAdd: (item: CartItem) => void;
 }
    // REDUX SLICE & SELECTOR 
  const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({newDishes}));
    console.log("NewDishes",newDishesRetriever);
export default function NewDishes(props: NewDishesProps) {
  const{onAdd} = props;
    const {newDishes} = useSelector(newDishesRetriever)

   

    return (
        <div className={"new-products-frame"}>
            <Container>
                <Stack className={"main"}>
                    <Box className={"category-title"}>
                        Fresh Menu
                    </Box>
                    <Stack className={"cards-frame"}>
                        <CssVarsProvider>
                            { newDishes.length !== 0 ? (
                            newDishes.map((product:Product) => {
                                const imagePath = `${serverApi}/${product.productImages[0]}`
                                const sizeVolume = product.productCollection === ProductCollection.DRINK
                                ? product.productVolume + "l"
                                : product.productSize + "size";
                                return(
               
                                    <Card key={product._id} sx={{ width: 300,  gap:"25px"}} >
                                    <div>
                                      <Typography level="title-lg">{product.productName}</Typography>
                                      <Typography level="body-sm">{}</Typography>
                                      <IconButton
                                        aria-label="bookmark Bahamas Islands"
                                        variant="plain"
                                        color="neutral"
                                        size="sm"
                                        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                                      >
                                        <BookmarkAdd />
                                      </IconButton>
                                    </div>
                                    <AspectRatio minHeight="120px" maxHeight="150px">
                                      <img src={imagePath} />
                                    </AspectRatio>
                                    <CardContent orientation="horizontal">
                                      <div>
                                        <Typography level="body-xs">Total price:</Typography>
                                        <Typography fontSize="lg" fontWeight="lg">
                                          ${product.productPrice}
                                        </Typography>
                                      </div>
                                      <Button
                                        variant="solid"
                                        size="md"
                                        color="primary"
                                        aria-label="Explore Bahamas Islands"
                                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                        onClick={(e) => {
                       
                                          onAdd ({
                                            _id: product._id,
                                            quantity: 1,
                                            name: product.productName,
                                            price: product.productPrice,
                                            image: product.productImages[0],
                                          });
                                          e.stopPropagation();
                                         }}
                                      >
                                        Order Now
                                      </Button>
                                    </CardContent>
                                  </Card>
                                );
                            })
                            ) :(
                                <Box className ="no-data">
                                    New products are not available!
                                </Box>
                            )
                        }
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
            
        </div>
    );
}