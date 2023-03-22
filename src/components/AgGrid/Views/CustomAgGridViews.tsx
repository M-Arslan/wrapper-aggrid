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
  MenuItem
} from "@mui/material";
import SelectList from './SelectList';
import TextInput from './TextInput';
import {
  ChevronLeft,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  ScrollPanel,
  InputPanel,
  drawerHeader,
  Props,
  drawerWidth,
  drawerStyle,
  loadUserGridViews,
  selectControl,
  heading
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
  const closeDrawer = () => {
    setOpen(false);
  };

  const [userViewData, setUserViewData] = React.useState<userViewDataObj>({
    userGridViews: [],
  });

  const [expanded, setExpanded] = React.useState("");

  const [metadata, setMetadata] = React.useState({
    viewName: "",
    setDefaultView: false,
    ddlSelectedView: "2D3D1954-D93A-4469-A534-08D7FDB0ECE0",
  });

  const onViewChange = (event: any) => {}

  const onDefaultCBChange = async (e) => {
    setMetadata({
      ...metadata,

      setDefaultView: e.target.checked,
    });
  };

  const handleInputChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
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
  console.log("userViewData.userGridViews",userViewData.userGridViews)
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
                <Typography style={heading}>My Views</Typography>
              </ExpansionPanelSummary>
              
              <ExpansionPanelDetails style={{ display:"column" }}>
                <FormControl style={selectControl}>
                  <SelectList
                    onChange={onViewChange}
                    label="Select View"
                    id="ddlSelectedView"
                    variant="outlined"
                    value={metadata?.ddlSelectedView || ""}
                  >
                    {userViewData.userGridViews.filter((i:any) => !i.isSystem && i.screenName === landingPage)?.map((item:any)=>{
                        return (
                          <MenuItem value={item.userGridViewID}>
                            {item.viewName}
                          </MenuItem>
                        );

                    })
                    }
                  </SelectList>
                </FormControl>
        </ExpansionPanelDetails>

        <Divider />

        <ExpansionPanelDetails style={{ display:"column" }}>
          <FormGroup row>
            <FormControl style={selectControl}>
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
                <Checkbox
                  id="cbDefaultView"
                  name="cbDefaultView"
                  color="primary"
                  checked={metadata?.setDefaultView}
                  onChange={onDefaultCBChange}
                />
              }
              label="Set as default View"
            />
          </FormGroup>
        </ExpansionPanelDetails>


            </ExpansionPanel>
          </InputPanel>
        </ScrollPanel>
        <Divider />
      </Drawer>
    </ThemeProvider>
  );
};
