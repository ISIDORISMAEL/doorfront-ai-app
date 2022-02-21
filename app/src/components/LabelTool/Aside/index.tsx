import React from "react";
import {
  Paper,
  Tab,
  Tabs,
  Box,
  Stack,
  // Button,
  // Typography,
} from "@mui/material";
import { panelData } from "./panelData";
import { useTourStore } from "../../../global/tourState";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function Aside() {
  /* --------------------- State for tab panel --------------------- */
  const [value, setValue] = React.useState(0);
  const {
    labelingPageTour,
    labelingTourStepIndex,
    updateLabelingTourStepIndex,
  } = useTourStore();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (labelingPageTour && labelingTourStepIndex === 5) {
      updateLabelingTourStepIndex(6);
    }
    if (labelingPageTour && labelingTourStepIndex === 8) {
      updateLabelingTourStepIndex(9);
    }
  };

  /* -------------------------------------------------------------------------- */
  return (
    <Stack
      component={Paper}
      id="AsideContainer"
      elevation={6}
      direction="row"
      sx={{ height: "100%" }}
    >
      <Tabs
        id="Aside-tabs"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="icon tabs for label tool"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          minWidth: "100px",
        }}
      >
        {panelData.map((item) => (
          <Tab
            key={item.tabName}
            className={`${item.tabName}-button`}
            icon={item.tabIcon}
            aria-label={item.tabName}
            label={item.tabName}
            {...a11yProps(item.tabName)}
          />
        ))}
        {/* <Button sx={{ display: "flex", flexDirection: "column", p: 1.5 }}>
          <ExitToAppIcon />
          <Typography variant="body2">Exit</Typography>
        </Button> */}
      </Tabs>
      {panelData.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          {item.panelElement}
        </TabPanel>
      ))}
    </Stack>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Tab Properties                               */
/* -------------------------------------------------------------------------- */
function a11yProps(index: string) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

/* -------------------------------------------------------------------------- */
/*                                 Tab panel                                  */
/* -------------------------------------------------------------------------- */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ flexGrow: 1, width: "400px" }}
      className={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}
