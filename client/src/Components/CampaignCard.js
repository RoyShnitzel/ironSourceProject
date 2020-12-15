import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import EditModal from "./editModal";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  root: {
    width: "40%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CampaignCard({ data, fetchData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const deleteCampaign = async (id) => {
    await axios.delete(`/api/campaign/${id}`);
    fetchData();
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <div style={{ fontFamily: "DM Sans" }}>Status: {data.status}</div>
        </Typography>
        <Typography
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          variant="h5"
          component="h2"
        >
          <div style={{ fontFamily: "DM Sans" }}>Name: {data.name}</div>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => deleteCampaign(data.id)}
          >
            <Tooltip title="Delete Campaign" aria-label="add">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </Typography>
        {data.targeting.countries.length > 0 ? (
          <Typography variant="h5" component="h2">
            {data.targeting.countries.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Typography>
        ) : null}
        <Typography variant="body2" component="p">
          {data.targeting.countries.length > 0
            ? data.targeting.apps.map((app) => <div key={app}>{app}</div>)
            : null}
        </Typography>
      </CardContent>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CardActions>
          <Typography size="small">
            <div style={{ fontFamily: "DM Sans" }}>
              Price USD: {data.priceUSD}
            </div>
          </Typography>
        </CardActions>
        <Button style={{ paddingBottom: "4%" }} onClick={() => setOpen(true)}>
          <EditIcon />
        </Button>
      </div>
      <EditModal
        open={open}
        setOpen={setOpen}
        data={data}
        fetchData={fetchData}
      />
    </Card>
  );
}
