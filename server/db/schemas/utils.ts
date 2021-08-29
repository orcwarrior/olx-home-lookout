import "reflect-metadata";
import {Knex} from "knex";
import {postgis_st} from "../../knexClient";
import {ColumnType} from "typeorm";


/** @type PostGIS Geography type
 * {@link https://postgis.net/docs/using_postgis_dbmanagement.html#Geography_Basics}
 * */

type GeoType = "Point" | "PointZ" | "LineString" | "Polygon";

export type GeographyType = Geography;

export class Geography {

    public readonly type: GeoType = "Point";
    /** Field order is: \[longitude, latitude\]*/
    public readonly coordinates: [number, number];
    protected srid = 4326;

    constructor(longitude: number, latitude: number);
    constructor(longitude: number, latitude: number, type?: GeoType, srid?: number) {
        this.coordinates = [longitude, latitude];

        if (type) this.type = type;
        if (srid) this.srid = srid;

        return this;
    }

    toPostgisGeography: () => any = () => {
        return postgis_st.geomFromText(`Point(${this.coordinates.join(" ")})`, this.srid);
    };
    toTypeOrm = () => ({type: this.type, coordinates: this.coordinates});
}

export function ComputedField(table: string, sql: (sqlParams: { table, propertyKey, type }) => string, type?: ColumnType) {

    return function (target, propertyKey: string) {
        if (!type) {
            // @ts-ignore
            type = _guessType().name as ColumnType;
        }

        // @ts-ignore
        const currentComputed = computedFieldsRepo[table] || [];
        computedFieldsRepo[table] = [...currentComputed, sql({table, propertyKey, type})];

        function _guessType(): ColumnType {
            // if type is not given explicitly then try to guess it
            const hasMetadata = Reflect.hasMetadata("design:type", target, propertyKey);
            return (hasMetadata)
                ? Reflect.getMetadata("design:type", target, propertyKey) as ColumnType
                : undefined;
        }
    };

}

export let computedFieldsRepo = {};
