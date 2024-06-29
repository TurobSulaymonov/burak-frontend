import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CardOverflow, CssVarsProvider, Typography } from "@mui/joy";
import CardCover from '@mui/joy/CardCover';
import DescriptionIcon from '@mui/icons-material/Description';
import CardContent from '@mui/joy/CardContent';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { retrieveTopUsers } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import {  useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
   
// REDUX SLICE & SELECTOR 
    const topUsersRetriever = createSelector(
        retrieveTopUsers,
        (topUsers) => ({topUsers})
      );



export default function ActiveUsers() {
    const {topUsers} = useSelector(topUsersRetriever);
    return (
        <div className={"active-users-frame"}>
            <Container>
                <Stack className="main">
                    <Box className={"category-title"}>Active Users</Box>
                    <Stack className={"cards-frame"} >
                        <CssVarsProvider>
                            { topUsers.length !== 0 ? (
                                topUsers.map((member) => {
                                    const imagePath = `${serverApi}/${member.memberImage}`
                                    return (
                                     /*    <Card key={member._id} variant="outlined" className={"card"}>
                                        <CardOverflow className={"user-size"}>

                                            <AspectRatio ratio="1">
                                              <img src={imagePath} alt="" />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardOverflow variant="soft" className={""}>
                                            <Stack className="info"> 
                                            <Stack flexDirection={"column"}>
                                                <Typography className={"member-nickname"}>
                                                    {member.memberNick}
                                                </Typography>
                                            </Stack>
                                             
                                            </Stack>
                                        </CardOverflow>
                                    </Card> */
                                    <CssVarsProvider>
                                            <Card
                                            className={"card"}
                                            sx={{ minHeight: '280px', width: 280, gap: 20
                                                
                                            }}>
                                                <CardOverflow className={"user-size"}> 
      <CardCover>
        <img
          src={imagePath}
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
         {member.memberNick}
        </Typography>
        <Typography
          startDecorator={<DescriptionIcon />}
          textColor="neutral.300"
        >
         {member.memberDesc}
        </Typography>
      </CardContent>
      </CardOverflow>
    </Card>

                                    </CssVarsProvider>
                                    );
                                })
                                ) : (
                                  <Box className={"no-data"}>No Active Users!</Box>
                                )
                            }

                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}