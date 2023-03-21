import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Drawer, IconButton, Divider,Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import {ScrollPanel,InputPanel,drawerHeader,Props,drawerWidth,drawerStyle,loadUserGridViews} from "./CustomAgGridViewsUtils";

let selectedView = [];

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: drawerWidth,
        },
      },
    },
  },
});

export const CustomAgGridViews: React.FC<Props> = ({ open, setOpen, reload = false, landingPage = "ClaimsLandingPage", gridApi, userGridViewFunction,columnApi }) => {

  const closeDrawer = () => {
    setOpen(false);
  };

  const [userViewData, setUserViewData] = React.useState({
    userGridViews: [],
  });

  const [metadata, setMetadata] = React.useState({
    viewName: "",
    setDefaultView: false,
    ddlSelectedView: "2D3D1954-D93A-4469-A534-08D7FDB0ECE0",
  });

  const loadDefaultView = (userGridViews:any[]) => {
    setMetadata({
      ...metadata,
      ddlSelectedView: "2D3D1954-D93A-4469-A534-08D7FDB0ECE0",
      viewName: "",
      setDefaultView: false,
    });
    if (metadata.viewName === "") {
      selectedView = userGridViews?.filter(function (item:any) {
        return (
          item.isDefault === true &&
          item.isSystem === false &&
          item.screenName === landingPage
        );
      });
    } else {
      selectedView = userGridViews?.filter(function (item:any) {
        return (
          item.isSystem === false &&
          item.screenName === landingPage &&
          metadata.viewName.toLowerCase() === item.viewName.toLowerCase()
        );
      });
    }
    if (selectedView && selectedView.length > 0) {
      selectedView = selectedView[0];
      if (
        selectedView !== undefined &&
        selectedView.userGridViewID !== undefined
      ) {
        setMetadata({
          ...metadata,
          ddlSelectedView: selectedView.userGridViewID,
          viewName: selectedView.viewName,
          setDefaultView: selectedView.isDefault,
        });
        // setBtnUpdateDisabled(false);
        // setBtnDeleteDisabled(false);
      }
    } else {
      selectedView = userGridViews?.filter(function (item:any) {
        return (
          item.isDefault === true &&
          item.isSystem === true &&
          item.screenName === landingPage
        );
      });
      if (selectedView.length > 0) {
        selectedView = selectedView[0];
        setMetadata({
          ...metadata,
          ddlSelectedView: selectedView.userGridViewID,
          viewName: "",
          setDefaultView: false,
        });
        // setBtnUpdateDisabled(true);
        // setBtnDeleteDisabled(true);
      }
    }

    if (typeof userGridViewFunction === "function") {
      userGridViewFunction(selectedView);
    }
  };

  const loaduserGridData = async () => {
    // let currentUser = $auth.currentUser;
    // let cid = currentUser.id.replace("\\", "%5C");
    let userGridViewData = await loadUserGridViews();

    let uGViews = userGridViewData;
    if (uGViews === null) {
      uGViews = [];
    }
    setUserViewData({
      userGridViews: uGViews,
    });
    loadDefaultView(uGViews);
    return uGViews;
  };

  React.useEffect(() => {
    Promise.all([loaduserGridData()]).then(([ug]) => {
      setUserViewData({
        userGridViews: ug,
      });
    });
  }, [reload]);


  return (
    <ThemeProvider theme={theme}>
      <Drawer anchor="right" open={open} style={drawerStyle}>
        <div style={drawerHeader}>
          <IconButton name="arrowchevron_right" onClick={closeDrawer}>
            <ChevronLeft />
          </IconButton>
          <Typography>View Settings</Typography>
        </div>
        <ScrollPanel>
          <InputPanel>
            <h1>Custom Drawer</h1>
          </InputPanel>
        </ScrollPanel>
        <Divider />
      </Drawer>
    </ThemeProvider>
  );
};
