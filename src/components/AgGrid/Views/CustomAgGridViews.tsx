import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Drawer,
  IconButton,
  Divider,
  Typography,
  Accordion as ExpansionPanel,
  AccordionActions as ExpansionPanelActions,
  AccordionDetails as ExpansionPanelDetails,
  AccordionSummary as ExpansionPanelSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import SelectList from "../../../common/SelectList";
import TextInput from "../../../common/TextInput";
import Switch from "../../../common/Switch";
import {
  ChevronLeft,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  ScrollPanel,
  InputPanel,
  drawerHeader,
  Props,
  drawerWidth,
  drawerStyle,
  loadUserGridViews,
  selectControlStyles,
  headingStyles,
  btnMarginStyles,
} from "./CustomAgGridViewsUtils";

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

interface userViewDataObj {
  userGridViews: any[];
}

export const CustomAgGridViews: React.FC<Props> = ({
  open,
  setOpen,
  reload = false,
  landingPage = "ClaimsLandingPage",
  gridApi,
  userGridViewFunction,
  columnApi,
}) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [userViewData, setUserViewData] = React.useState<userViewDataObj>({
    userGridViews: [],
  });
  const [expanded, setExpanded] = React.useState("");
  const [btnUpdateDisabled, setBtnUpdateDisabled] = React.useState(true);
  const [btnDeleteDisabled, setBtnDeleteDisabled] = React.useState(true);
  const [metadata, setMetadata] = React.useState({
    viewName: "",
    setDefaultView: false,
    ddlSelectedView: "2D3D1954-D93A-4469-A534-08D7FDB0ECE0",
  });

  const closeDrawer = () => {
    setOpen(false);
  };

  const onViewChange = (e: SelectChangeEvent<unknown>) => {
    //gridApi.showLoadingOverlay();

    const { name, value } = e.target;
    const val = value as string;

    selectedView = userViewData.userGridViews.find(
      (x) => x.userGridViewID === val
    );

    // loadClaimData();

    if (typeof userGridViewFunction === "function") {
      userGridViewFunction(1,selectedView);
    }

    gridApi.sizeColumnsToFit();
    if (selectedView.isSystem) {
      setMetadata({
        ...metadata,
        ddlSelectedView: val,
        viewName: "",
        setDefaultView: false,
      });
      setBtnUpdateDisabled(true);
      setBtnDeleteDisabled(true);
    } else {
      setMetadata({
        ...metadata,
        ddlSelectedView: val,
        viewName: selectedView.viewName,
        setDefaultView: selectedView.isDefault,
      });
      setBtnUpdateDisabled(false);
      setBtnDeleteDisabled(false);
    }

    // if (typeof handleDrawerClose === "function") {
    //   handleDrawerClose();
    // }
  };

  const onDefaultCBChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata({
      ...metadata,

      setDefaultView: e.target.checked,
    });
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata({
      ...metadata,

      viewName: evt.target.value,
    });
  };

  const loadDefaultView = (userGridViews: any[]) => {
    setMetadata({
      ...metadata,
      ddlSelectedView: "2D3D1954-D93A-4469-A534-08D7FDB0ECE0",
      viewName: "",
      setDefaultView: false,
    });
    if (metadata.viewName === "") {
      selectedView = userGridViews?.filter(function (item: any) {
        return (
          item.isDefault === true &&
          item.isSystem === false &&
          item.screenName === landingPage
        );
      });
    } else {
      selectedView = userGridViews?.filter(function (item: any) {
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
      selectedView = userGridViews?.filter(function (item: any) {
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
      userGridViewFunction(1, selectedView);
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
    debugger;
    return uGViews;
  };

  React.useEffect(() => {
    Promise.all([loaduserGridData()]).then(([ug]) => {
      setUserViewData({
        userGridViews: ug,
      });
    });
  }, [reload]);
  console.log("userViewData.userGridViews", userViewData.userGridViews);
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
            <ExpansionPanel
              expanded={expanded === "panel1"}
              onChange={() => setExpanded("panel1")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography style={headingStyles}>My Views</Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails style={{ flexDirection: "column" }}>
                <FormControl style={selectControlStyles}>
                  <SelectList
                    onChange={onViewChange}
                    label="Select View"
                    id="ddlSelectedView"
                    variant="outlined"
                    value={metadata?.ddlSelectedView || ""}
                  >
                    {userViewData.userGridViews
                      .filter(
                        (i: any) => !i.isSystem && i.screenName === landingPage
                      )
                      ?.map((item: any) => {
                        return (
                          <MenuItem value={item.userGridViewID}>
                            {item.viewName}
                          </MenuItem>
                        );
                      })}
                  </SelectList>
                </FormControl>
              </ExpansionPanelDetails>

              <Divider />

              <ExpansionPanelDetails style={{ flexDirection: "column" }}>
                <FormGroup row>
                  <FormControl>
                    <TextInput
                      id="view-name"
                      label="View Name"
                      variant="outlined"
                      value={metadata?.viewName || ""}
                      inputProps={{ maxLength: 50 }}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        {...label}
                        id="cbDefaultView"
                        name="cbDefaultView"
                        checked={metadata?.setDefaultView}
                        onChange={onDefaultCBChange}
                      />
                    }
                    label="Set a default View"
                  />
                </FormGroup>
              </ExpansionPanelDetails>

              <ExpansionPanelActions>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  style={btnMarginStyles}
                  disabled={btnDeleteDisabled}
                  startIcon={<DeleteIcon />}
                  // onClick={btnDeleteViewClick}
                >
                  Delete
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  style={btnMarginStyles}
                  size="small"
                  id="btnUpdateView"
                  disabled={btnUpdateDisabled}
                  startIcon={<SaveIcon />}
                  // onClick={btnUpdateViewClick}
                >
                  Update
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={btnMarginStyles}
                  startIcon={<SaveIcon />}
                  // onClick={btnSaveViewClick}
                >
                  Create
                </Button>
              </ExpansionPanelActions>

              <Divider />
            </ExpansionPanel>

            <ExpansionPanel
              expanded={expanded === "panel2"}
              onChange={() => setExpanded("panel2")}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography style={headingStyles}>System Views</Typography>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails style={{ flexDirection: "column" }}>
                <FormControl style={selectControlStyles}>
                  <SelectList
                    onChange={onViewChange}
                    label="Select System View"
                    variant="outlined"
                    id="ddlSelectedView"
                    value={metadata?.ddlSelectedView || ""}
                  >
                    {userViewData.userGridViews.map((item) => {
                      if (item.isSystem && item.screenName === landingPage) {
                        return (
                          <MenuItem value={item.userGridViewID}>
                            {item.viewName}
                          </MenuItem>
                        );
                      }
                    })}
                  </SelectList>
                </FormControl>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </InputPanel>
        </ScrollPanel>
        <Divider />
      </Drawer>
    </ThemeProvider>
  );
};
