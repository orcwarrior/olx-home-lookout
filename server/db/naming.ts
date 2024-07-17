import {DefaultNamingStrategy, NamingStrategyInterface, Table} from "typeorm";
import  pluralize from "pluralize";
import  crypto from "crypto";

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

    name = "PascalCase-Plural";

    tableName(targetName: string, userSpecifiedName?: string): string {
        return userSpecifiedName ? userSpecifiedName : pluralize(targetName);
    }

    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {

        if (embeddedPrefixes.length) embeddedPrefixes = [...embeddedPrefixes, "_"];

        return embeddedPrefixes.concat(customName ? customName : propertyName).join("");
    }

    columnNameCustomized(customName: string): string {
        return customName;
    }


    relationName(propertyName: string): string {
        return propertyName;
    }

    joinTableName(firstTableName: string, secondTableName: string, firstPropertyName?: string, secondPropertyName?: string): string {
        return `${firstTableName}_${secondTableName}`;
    }

    foreignKeyName(tableOrName: Table | string, columnNames: string[]): string {

        tableOrName = (typeof tableOrName === "string") ? tableOrName : tableOrName.name;
        const table = tableOrName.replace("public.", "");
        const name = `${table}_${columnNames[0]}`;
        const fkName = `FK_${name}_${crypto.createHash("md5").update(name).digest("hex")}`;
        console.trace(`fkName: `, fkName);

        return fkName;
    }

}

export const namingStrategy = new CustomNamingStrategy();
