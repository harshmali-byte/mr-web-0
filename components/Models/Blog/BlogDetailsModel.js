import { format } from 'date-fns';

export default class ResearchDetailsModel {
    constructor(model) {
        return {
            Id: model && model.Id ? parseInt(model.Id) : 0,
            Name: model && model.Name ? model.Name : '',
            ResearchPostKey: model && model.ResearchPostKey ? model.ResearchPostKey : '',
            Author: model && model.Author ? model.Author : '',
            Biography: model && model.Biography ? model.Biography : '',
            PostPublishDate: model && model.PostPublishDate ? model.PostPublishDate : null,
            PublishDate: model && model.PostPublishDate ? format(new Date(model.PostPublishDate), 'dd-MMM-yyyy') : '',
            IsActive: model && model.IsActive ? model.IsActive : false,
        }
    }
}