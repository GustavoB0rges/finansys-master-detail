import { Category } from "../../categories/shared/category.model";
import { BaseResourceModel } from "./models/base-resource.model";

export class Entry extends BaseResourceModel {
    constructor(
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number,
        public category?: Category
    ) { 
        super();
    }

    static types = {
        expense: 'Despesa',
        revenue: 'Receita'
    };

    get paidText(): string {
        return this.paid ? 'Pago' : 'Pendente';
    }
}