import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PermDeviceInformationIcon from "@material-ui/icons/PermDeviceInformation";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
    paddingBottom: "0.25%",
  },
  link: {
    color: "white",
    textDecoration: "none",
    "&:focus": {
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "none",
    },
    "&:visited": {
      textDecoration: "none",
    },
    "&:link": {
      textDecoration: "none",
    },
    "&:active": {
      textDecoration: "none",
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Link className={classes.link} to="/">
              <PermDeviceInformationIcon />
            </Link>
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            <Link className={classes.link} to="/">
              <div style={{ fontFamily: "DM Sans", fontWeight: "bold" }}>
                Campaign Manager
              </div>
            </Link>
          </Typography>
          <Link className={classes.link} to="/campaignForm">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Tooltip title="Add Campaign" aria-label="add">
                <AddBoxIcon />
              </Tooltip>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
