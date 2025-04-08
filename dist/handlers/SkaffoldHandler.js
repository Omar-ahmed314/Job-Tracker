"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@clack/prompts");
class SkaffoldHandler {
    constructor() { }
    async handle(data) {
        const action = await (0, prompts_1.select)({
            message: 'What would you like to do?',
            options: [
                { value: 'add', label: 'Insert a new job' },
                { value: 'list', label: 'List all jobs' },
                { value: 'view', label: 'View job by ID' },
                { value: 'filter', label: 'Filter jobs' },
                { value: 'delete', label: 'Delete a job' },
                { value: 'update', label: 'Update a job' },
            ],
        });
        data.action = action;
        return data;
    }
}
exports.default = SkaffoldHandler;
