import React from "react";
import { Box, Container, Stack } from "@mui/material";
import {CssVarsProvider} from "@mui/joy/styles"
import Card from '@mui/joy/Card';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import  CardOverflow  from "@mui/joy/CardOverflow";

/*  */
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
/*  */
import {  useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { Height } from "@mui/icons-material";
import { red } from "@mui/material/colors";


    // REDUX SLICE & SELECTOR 
  const popularDishesRetriever = createSelector(
    retrievePopularDishes,
    (popularDishes) => ({popularDishes})
  );

export default function PopularDishes() {
    const { popularDishes } = useSelector(popularDishesRetriever);
    console.log("POPULARDISHES", popularDishes);
    return (
        <div className="popular-dishes-frame">
            <Container>
               <Stack className="popular-section">
                <Box className="category-title">Popular Dishes</Box> 
                <Stack className="cards-frame">
                        { popularDishes.length !== 0 ? (
                        popularDishes.map((product: Product) => {
                            const imagePath = `${serverApi}/${product.productImages[0]}`
                           return(
                             <CssVarsProvider key={product._id}>
  
                                {/* test */}
                                <Card variant="outlined" className={"card"} sx={{ width: 300,  gap:"20px"}}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={imagePath}
            alt=""
          />
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          <Link href="#multiple-actions" overlay underline="none">
         {product.productName}
          </Link>
        </Typography>
        <Typography level={"body-sm"} style={{
            width: 70,
            height: 30,
            border: 1,
            color:"black"
        }}>
          <Link href="#multiple-actions">{product.productSize}</Link>
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs">
          <RemoveRedEyeIcon sx={{ mr: "10px" , mb:"-5px" }} />{product.productViews}</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">{product.productDesc}</Typography>
        </CardContent>
      </CardOverflow>
    </Card>

                              
                             </CssVarsProvider>
                           );
                        })
                        ):
                        (
                            <Box className ="no-data">
                                New products are not available!
                            </Box>
                        )
                    }
                   
               
                    </Stack> 
               </Stack> 
            </Container>
        </div>
    );
}