import pool from '../config/db.js';

export const publishCampaign = async (req, res, next) => {
  const campaignData = req.body; // Assuming the payload is the entire JSON (without a top-level "campaign" key)
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // first page details - new ad campaign
    const campaignInsertQuery = `
      INSERT INTO campaigns (name, objective, platform, total_budget)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const campaignResult = await client.query(campaignInsertQuery, [
      campaignData.name,
      campaignData.objective,
      campaignData.platform,
      campaignData.bid.total_budget
    ]);
    const campaignId = campaignResult.rows[0].id;

    // second page details - targets
    const targets = campaignData.targets;
    const targetsInsertQuery = `
      INSERT INTO campaign_targets (campaign_id, group_niche, target_by_group, location, in_niche_tags, in_group_tags)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await client.query(targetsInsertQuery, [
      campaignId,
      targets.group_niche,
      JSON.stringify(targets.target_by_group),
      targets.location,
      JSON.stringify(targets.in_niche_tags),
      JSON.stringify(targets.in_group_tags)
    ]);

    // third - content & schedule
    const contents = campaignData.contents;
    const contentsInsertQuery = `
      INSERT INTO campaign_contents (campaign_id, content_text, attachment_url, schedule_start, schedule_end)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await client.query(contentsInsertQuery, [
      campaignId,
      contents.content_text,
      contents.attachment_url,
      contents.schedule_start,
      contents.schedule_end
    ]);


    // fourth - bid range & group offer

    const bidRanges = campaignData.bid.bid_ranges;
    const bidRangeInsertQuery = `
      INSERT INTO campaign_bid_ranges (campaign_id, min_members, max_members, offer_amount)
      VALUES ($1, $2, $3, $4)
    `;
    for (const range of bidRanges) {
      await client.query(bidRangeInsertQuery, [
        campaignId,
        range.min_members,
        range.max_members,
        range.offer_amount
      ]);
    }

    const selectedGroups = campaignData.bid.selected_groups;
    const selectedGroupsInsertQuery = `
      INSERT INTO campaign_selected_groups (campaign_id, group_id, offer_amount)
      VALUES ($1, $2, $3)
    `;
    for (const sg of selectedGroups) {
      await client.query(selectedGroupsInsertQuery, [
        campaignId,
        sg.group_id,
        sg.offer_amount
      ]);
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Campaign published successfully', campaignId });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
};
