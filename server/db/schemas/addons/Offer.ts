import {SchemaExecutor, getTableNameByFilename} from "../../utils";


export default (async (knex) => {

    await knex.schema.raw(`
CREATE FUNCTION offers_weight(o "Offers", base_area double precision, base_comfort double precision)
RETURNS double precision AS $$
  SELECT GREATEST(-0.0020 * POWER(o.attrs_area - base_area, 2) + 1, 0) *
   GREATEST(-0.0002 * POWER(o.indicators_comfort - base_comfort, 2) + 1, 0)
    
$$ LANGUAGE sql STABLE;
`);

    return knex.schema.raw(`
CREATE FUNCTION offers_prices_perM2_deviation(o "Offers")
RETURNS double precision AS $$
  SELECT o."prices_perM2" - SUM(nested.weight * nested."prices_perM2") / SUM(nested.weight)
    FROM (
        SELECT (offers_weight(off2, o.attrs_area, o.indicators_comfort)) as weight, off2."prices_perM2"
        FROM public."Offers" as off2
        WHERE off2."offerType" = o."offerType" AND off2.city = o.city) nested
    
$$ LANGUAGE sql STABLE;
`);

}) as SchemaExecutor;
