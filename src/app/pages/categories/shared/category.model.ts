import { BaseResourceModel } from "../../entries/shared/models/base-resource.model";

export class Category extends BaseResourceModel{
    constructor(
        public name?: string,
        public description?: string
    ){
        super();
    }

    static fromJsonData(jsonData: any): Category {
        return Object.assign(new Category(), jsonData);
    }
}