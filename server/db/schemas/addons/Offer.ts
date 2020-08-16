import {SchemaExecutor, getTableNameByFilename} from "../../utils";


export default (async (knex) => {

    await knex.schema.raw(`
CREATE FUNCTION offers_weight(o "Offers", base_area double precision, base_comfort double precision)
RETURNS double precision AS $$
  SELECT GREATEST(-0.0020 * POWER(o.attrs_area - base_area, 2) + 1, 0) *
   GREATEST(-0.0002 * POWER(o.indicators_comfort - base_comfort, 2) + 1, 0)
    
$$ LANGUAGE sql STABLE;
`);

    await knex.schema.raw(`
CREATE FUNCTION offers_prices_perM2_deviation(o "Offers")
RETURNS double precision AS $$
  SELECT o."prices_perM2" - SUM(nested.weight * nested."prices_perM2") / SUM(nested.weight)
    FROM (
        SELECT (offers_weight(off2, o.attrs_area, o.indicators_comfort)) as weight, off2."prices_perM2"
        FROM public."Offers" as off2
        WHERE off2."offerType" = o."offerType" AND off2.city = o.city) nested
    
$$ LANGUAGE sql STABLE;
`);
    return knex.schema.raw(`
CREATE OR REPLACE FUNCTION offers_rank(o "Offers")
    RETURNS double precision AS $$
DECLARE 
    lookout "LookoutRequests";
    rank double precision;
BEGIN
    SELECT INTO lookout * FROM "LookoutRequests" WHERE id = o."lookoutRequestId";
    RAISE LOG 'offer.lookout = %', lookout;
    EXECUTE 'SELECT (LEAST(GREATEST(-0.9 * $1."deviationAvgM2Price" + 10, 0.001), 30) * $1.indicators_deal * 4) * $2."priceSignificance" 
      + ($1.indicators_comfort * $2."comfortSignificance")'
      USING o, lookout
      INTO rank;
    RAISE LOG 'offer.rank = %', rank;
    RETURN rank;
    
END;
$$ LANGUAGE plpgsql STABLE;
`);

    const TODO = `
SELECT LEAST(GREATEST(-0.9 * o."deviationAvgM2Price" + 10, 0.001), 30) * o.indicators_deal * 4 as rank_deal,
o.indicators_comfort as rank_comfort
FROM public."Offers" as o
WHERE o."offerType" = 'RENT'
ORDER BY rank_deal DESC
LIMIT 120`;

}) as SchemaExecutor;
