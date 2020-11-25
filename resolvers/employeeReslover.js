const resolvers = {
    Query: {
        departments: async(_p, args, { dataSources }) => {
            return dataSources.DepartmentAPI.departments(args);
        },
        employees: async(_p, _a, { dataSources }) => {
            return dataSources.EmployeeAPI.employees();
        }
    }
};
module.exports = resolvers;