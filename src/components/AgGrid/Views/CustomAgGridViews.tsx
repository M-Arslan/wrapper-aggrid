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
  ViewNameError,
  userViewDataObj,
  ErrorPanel,
} from "./CustomAgGridViewsUtils";

let selectedView: any;
const columnDataKey = "columnData";

const filterDataKey = "filterData";

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

export const CustomAgGridViews: React.FC<Props> = ({
  open,
  setOpen,
  reload = false,
  landingPage = "ClaimsLandingPage",
  gridApi,
  userGridViewFunction,
  columnApi,
  getGridViewsData
}) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [userViewData, setUserViewData] = React.useState<userViewDataObj>({
    userGridViews: [],
  });
  let viewExists: any[] = [];
  const [screenName] = React.useState(landingPage);
  const [expanded, setExpanded] = React.useState("");
  const [btnUpdateDisabled, setBtnUpdateDisabled] = React.useState(true);
  const [btnDeleteDisabled, setBtnDeleteDisabled] = React.useState(true);
  const [metadata, setMetadata] = React.useState({
    viewName: "",
    setDefaultView: false,
    ddlSelectedView: "2D3D1954-D93A-4469-A534-08D7FDB0ECE0",
  });
  const [ViewNameError, setViewNameError] = React.useState<ViewNameError>({
    error: false,
    errorMessage: "",
  });
  const [ViewNameUpdateError, setViewNameUpdateError] =
    React.useState<ViewNameError>({
      error: false,
      errorMessage: "",
    });

  const closeDrawer = () => {
    setViewNameUpdateError({ error: false, errorMessage: "" });
    setViewNameError({ error: false, errorMessage: "" });
    setExpanded("");
    setOpen(false);
  };

  const onViewChange = (e: SelectChangeEvent<unknown>) => {
    //gridApi.showLoadingOverlay();

    const { name, value } = e.target;
    const val = value as string;
    if (val === "") return;

    selectedView = userViewData.userGridViews.find(
      (x) => x.userGridViewID === val
    );

    if (typeof userGridViewFunction === "function") {
      userGridViewFunction(1, selectedView);
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
        setBtnUpdateDisabled(false);
        setBtnDeleteDisabled(false);
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
        setBtnUpdateDisabled(true);
        setBtnDeleteDisabled(true);
      }
    }
   debugger;
    if (typeof userGridViewFunction === "function") {
      userGridViewFunction(1, selectedView);
      
    }
  };

  const btnUpdateViewClick = async (event: any) => {
    if (selectedView.isSystem) {
      setViewNameUpdateError({
        ...ViewNameUpdateError,
        error: true,
        errorMessage: "You cannot update a system view.",
      });

      return;
    }

    viewExists = userViewData.userGridViews.filter(function (view) {
      return (
        view.viewName.toString().toLowerCase() ===
          metadata.viewName.toLowerCase() &&
        view.createdBy.toString().toLowerCase() ===
          selectedView.createdBy.toLowerCase() &&
        view.screenName.toString().toLowerCase() ===
          selectedView.screenName.toLowerCase() &&
        view.userGridViewID.toString().toLowerCase() !==
          selectedView.userGridViewID.toLowerCase()
      );
    });

    if (viewExists.length) {
      setViewNameUpdateError({
        ...ViewNameUpdateError,
        error: true,
        errorMessage: "You already have a view with this name.",
      });
      return;
    }

    setViewNameUpdateError({
      ...ViewNameUpdateError,
      error: false,
      errorMessage: "",
    });

    let columnData = localStorage.getItem(columnDataKey);
    let filterData = localStorage.getItem(filterDataKey);

    if (columnData === null) {
      columnData = JSON.stringify(columnApi.getColumnState());
      localStorage.setItem(columnDataKey, columnData);
    }

    if (filterData === null) {
      filterData = JSON.stringify(gridApi.getFilterModel());
      localStorage.setItem(filterDataKey, filterData);
    }

    let GetDateTime = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -1);

    let metadataObj = {
      userGridViewID: selectedView.userGridViewID,
      viewName: metadata.viewName,
      isDefault: metadata.setDefaultView,
      isSystem: selectedView.isSystem,
      columnData: columnData,
      filterData: filterData,
      screenName: selectedView.screenName,
      createdBy: selectedView.createdBy,
      createdDate: selectedView.createdDate,
      modifiedDate: GetDateTime,
    };

    if (typeof userGridViewFunction === "function") {
      let flag = userGridViewFunction(3, metadataObj);
      if(flag)
      loaduserGridData();
    }
  };

  const btnSaveViewClick = async (event: any) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (metadata.viewName === "" || metadata.viewName.trim() === "") {
      setViewNameError({
        ...ViewNameError,
        error: true,
        errorMessage: "Please enter a view name",
      });
      return;
    } else if (format.test(metadata.viewName)) {
      setViewNameError({
        ...ViewNameError,
        error: true,
        errorMessage: "Special Characters are not allowed",
      });
      return;
    } else {
      setViewNameError({
        ...ViewNameError,
        error: false,
        errorMessage: "",
      });

      let columnData = localStorage.getItem(columnDataKey);
      let filterData = localStorage.getItem(filterDataKey);

      if (columnData === null) {
        columnData = JSON.stringify(columnApi.getColumnState());
        localStorage.setItem(columnDataKey, columnData);
      }

      if (filterData === null) {
        filterData = gridApi.getFilterModel();
        filterData = JSON.stringify(filterData);
        localStorage.setItem(filterDataKey, filterData);
      }

      let GetDateTime = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, -1);

      let metadataObj = {
        viewName: metadata.viewName,
        isDefault: metadata.setDefaultView,
        isSystem: false,
        columnData: columnData,
        filterData: filterData,
        createdDate: GetDateTime,
        modifiedDate: GetDateTime,
        screenName: screenName,
      };
      if (typeof userGridViewFunction === "function") {
        let flag = userGridViewFunction(2, metadataObj);
        if(flag)
        loaduserGridData();
      }
    }
  };

  const btnDeleteViewClick = async (event: any) => {
    if (selectedView.isSystem) {
      setViewNameUpdateError({
        ...ViewNameUpdateError,
        error: true, 
        errorMessage: "You cannot delete a system view.",
      });

      return;
    }
    setViewNameUpdateError({
      ...ViewNameUpdateError,
      error: false,
      errorMessage: "",
    });

    if (typeof userGridViewFunction === "function") {
     let flag = userGridViewFunction(4, selectedView._id);
     if(flag)
      loaduserGridData();
    }
    
  };

  const loaduserGridData = async () => {
    let userGridViewData = await getGridViewsData();
  debugger;
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
            {ViewNameUpdateError.error ? (
              <ErrorPanel>
                <Typography style={{ color: "red", fontWeight: "bold" }}>
                  {ViewNameUpdateError.errorMessage}
                </Typography>
              </ErrorPanel>
            ) : null}
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
                  <FormControl style={{ width: "300px", marginTop: "10px" }}>
                    <TextInput
                      id="view-name"
                      label="View Name"
                      variant="outlined"
                      value={metadata?.viewName || ""}
                      inputProps={{ maxLength: 50 }}
                      onChange={handleInputChange}
                      helperText={ViewNameError.errorMessage}
                      error={ViewNameError.error}
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup row>
                  <FormControlLabel
                    style={{ marginTop: "10px" }}
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
                  onClick={btnDeleteViewClick}
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
                  onClick={btnUpdateViewClick}
                >
                  Update
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={btnMarginStyles}
                  startIcon={<SaveIcon />}
                  onClick={btnSaveViewClick}
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
