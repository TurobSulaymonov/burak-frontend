import React from "react";
import {Box, Stack} from "@mui/material";
import TabPanel from"@mui/lab/TabPanel";


export default function FinishedOrders () {
 return(
    <TabPanel value={"3"}>
    <Stack>
        {[].map((ele2,index) => {
            return(
                <Box key={index}
                className={"order-main-box"}
                >
                    <Box className={"order-box-scroll"}>
                    {[].map((ele2, index2) => {
                        return (
                       <Box key={index2} className={"orders-name-price"}>
                          <img src={"/img/fresh.webp"} className={"order-dish-img"} />
                            <p className="title-dish">Lavash</p>
                            <Box className={"price-box"}>
                                <p>$9</p>
                                <img src="/icons/close.svg" alt="" />
                                <p>2</p>
                                <img src="/icons/pause.svg" alt="" />

                                <p style={{marginLeft: "15px"}}>$24</p>
                        </Box>
                       </Box>
                        );
                    })}
                    </Box>
                    {/*  */}
                    <Box className={"total-price-box"}>
                        <Box className={"box-total"}>
                            <p>Product price</p>
                            <p>$22</p>
                            <img src={"/icons/plus.svg"} style={{marginLeft: "20px"}}
                                />
                            <p>delivery cost</p>
                            <p>$2</p>
                            <img src={"/icons/pause.svg"} 
                            style={{marginLeft: "20px"}} />
                            <p>Total</p>
                            <p>$26</p>
                        </Box>
                    </Box>
                    </Box>
            );
        })}
        {true && (
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <img src={"/icons/noimage-list.svg"}
                style={{width: 300, height: 300}} />
            </Box>
        )}
    </Stack>
</TabPanel>
 );
}