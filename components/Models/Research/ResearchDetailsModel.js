import { format } from 'date-fns';

export default class ResearchDetailsModel {
    constructor(model) {
        return {
            Id: model && model.Id ? parseInt(model.Id) : 0,
            Code: model && model.Code ? model.Code : '',
            Name: model && model.Name ? model.Name : '',
            PostPublishDate: model && model.PostPublishDate ? model.PostPublishDate : null,
            PublishDate: model && model.PostPublishDate ? format(new Date(model.PostPublishDate), 'dd-MMM-yyyy') : '',
            PriceSingleUser: model && model.PriceSingleUser ? model.PriceSingleUser : '',
            PriceMultiUser: model && model.PriceMultiUser ? model.PriceMultiUser : '',
            PriceEnterprise: model && model.PriceEnterprise ? model.PriceEnterprise : '',
            NumberOfPages: model && model.NumberOfPages ? parseInt(model.NumberOfPages) : 0,
            IsActive: model && model.IsActive ? model.IsActive : false,
            CategoryId: model && model.CategoryId ? model.CategoryId : '',
            OldCategoryId: model && model.OldCategoryId ? model.OldCategoryId : '',
            Category: model && model.Category ? model.Category : '',
            OldCategory: model && model.OldCategory ? model.OldCategory : '',
            CategoryUrl: model && model.CategoryUrl ? model.CategoryUrl : '',
            OldCategoryUrl: model && model.OldCategoryUrl ? model.OldCategoryUrl : '',
        }
    }
}