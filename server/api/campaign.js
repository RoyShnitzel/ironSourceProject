const campaignRouter = require("express").Router();
const fs = require("fs").promises;

const fetchAllData = async () => {
  const allData = await fs.readFile("./data.json");
  return JSON.parse(allData);
};

// get all data
campaignRouter.get("/", async (req, res) => {
  try {
    const campaignData = await fetchAllData();
    res.json(campaignData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// add data
campaignRouter.post("/", async (req, res) => {
  try {
    const { data } = req.body;
    const campaignData = await fetchAllData();
    // checks if there is a campaign with the same name
    if (campaignData.some((element) => element.name === data.name)) {
      return res.status(409).json({ message: "Campaign already exists" });
    }
    data.id = Number(campaignData[campaignData.length - 1].id) + 1;
    campaignData.push(data);
    await fs.writeFile("./data.json", JSON.stringify(campaignData));
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// update data
campaignRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { updateData } = req.body;
    const campaignData = await fetchAllData();
    // checks if the campaign exists by id
    const updateIndex = campaignData.findIndex(
      (element) => element.id === Number(id)
    );
    if (updateIndex === -1) {
      return res.status(404).json({ message: "Campaign Not Found" });
    }
    updateData.id = campaignData[updateIndex].id;
    campaignData[updateIndex] = updateData;
    await fs.writeFile("./data.json", JSON.stringify(campaignData));
    res.json({ message: "Update Success" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

// delete data
campaignRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const campaignData = await fetchAllData();
    // checks if the campaign exists by id
    const campaignToDelete = campaignData.find(
      (element) => element.id === Number(id)
    );
    if (!campaignToDelete) {
      return res.status(404).json({ message: "Campaign Not Found" });
    }
    const campaignsAfterDelete = campaignData.filter(
      (element) => element.id !== campaignToDelete.id
    );
    await fs.writeFile("./data.json", JSON.stringify(campaignsAfterDelete));
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Cannot process request" });
  }
});

module.exports = campaignRouter;
