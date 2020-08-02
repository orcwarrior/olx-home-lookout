import {DefaultNamingStrategy, NamingStrategyInterface} from "typeorm";
import * as pluralize from "pluralize";

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

}

export const namingStrategy = new CustomNamingStrategy();
