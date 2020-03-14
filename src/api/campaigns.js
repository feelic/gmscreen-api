import * as actions from "../db/actions.js";

export function readAllCampaigns(req, res) {
  const filters = (req.body && req.body.filters) || {};

  actions.findCampaigns(filters).then(data => {
    res.json({
      data: data.reduce((chars, char) => {
        return { ...chars, [char._id]: char };
      }, {})
    });
  });
}
export function createCampaign(req, res) {
  const campaign = req.body;

  actions
    .insertCampaigns([campaign])
    .then(data => {
      res.json({ data: data.ops[0] });
    })
    .catch(err => res.status(500).send(err));
}
export function readSingleCampaign(req, res) {
  const campaignId = req.params.campaignId;

  actions
    .findCampaign(campaignId)
    .then(data => {
      if (!data[0]) {
        return res.status(404).json({
          error: `Could not find campaign with id ${campaignId}`
        });
      }
      res.json({ data: data[0] });
    })
    .catch(err => res.status(500).send(err));
}
export function updateCampaign(req, res) {
  const campaignId = req.params.campaignId;
  const campaign = req.body;

  actions
    .updateCampaign(campaignId, campaign)
    .then(() => {
      return actions.findCampaign(campaignId);
    })
    .then(data => {
      res.json({ data: data[0] });
    })
    .catch(err => res.status(500).send(err));
}

export function deleteCampaign(req, res) {
  const campaignId = req.params.campaignId;

  actions
    .removeCampaign(campaignId)
    .then(data => {
      res.json({ data });
    })
    .catch(err => res.status(500).send(err));
}
