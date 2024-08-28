import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";


export default function Statistics () {
    return (
        <div className={"static-frame"} >
            <Container>
                <Stack className={"info"}>

                 <Stack className="static-info">
                    <Box className={'dish-about'}>
                    <p>
                        ABOUT OUR FOOD
                    </p>
                    </Box>
                    <Box className={"dish-subject"}>
                        Fast And Delicious Quick Bites Big
                    </Box>
                    <Box className={"dish-text"}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, atque.</p>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. A provident magni sint quaerat, et blanditiis inventore vitae impedit nisi quae!</span>
                    </Box>
                 </Stack>
                 <Stack className="static-img">
                 <img 
              className="brandimg" 
             src="/img/name-2.webp"/>
                 </Stack>
                 <Stack className="static-number">
               
                        <Box className={"static-num"}>12+</Box>
                        <Box className={"static-text"}>Quality Food<img src="/img/range.png" width={25} height={25}/></Box>
                        <Box className={"static-num"}>8+</Box>
                        <Box className={"static-text"}>Experience <img src="/img/experince.png" width={25} height={25}/></Box>
                        <Box className={"static-num"}>50+</Box>
                        <Box className={"static-text"}>Our Menu <img src="/img/dish.png" width={25} height={25}/></Box>
                        <Box className={"static-num"}>2k+</Box>
                        <Box className={"static-text"}>Happy Clients <img src="/img/happy.png" width={25} height={25}/></Box>
                     
                 </Stack>
                </Stack>
            </Container>
        </div>
    );
}