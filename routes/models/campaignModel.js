const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

function addCampaign(campaignData, callback) {
    const { campaignName, campaignType, campaignSector, period, description, audience, channels, an_id } = campaignData;
    const campaign = { nom_camp: campaignName, type_camp: campaignType, sector_camp: campaignSector, period, description, audience, channels, an_id: an_id };
    pool.query('INSERT INTO campaign SET ?', campaign, (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    });
  }

module.exports = {
  addCampaign
};
