const { ApolloError } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');
const fetch = require('node-fetch');

const PropertiesReader = require('properties-reader');
const prop = PropertiesReader("./app.properties");

// function to fetch the value of a property
getProperty = (key) => { return prop.get(key); }

// Base Http end point
const baseURL = getProperty('department_url');

class DepartmentAPI extends RESTDataSource {
    // helps in creating the object by inherting the properities of RESTDataSource
    constructor() {
        super()
    }

    // asynchronous function call to fetch the details of employee
    async departments(args) {
        // Empty array is initialized to store the generated response
        let departmentDataList = new Array();
        let queryCondition=(args.q==undefined)?"":args.q;

        // API call to fetch the Department data
        const departmentReq = await fetch(`${baseURL}?q=${queryCondition}`);
        if (departmentReq.status !== 200) throw new ApolloError("Couldn't process the Department API request")

        const departmentData = await departmentReq.json();


        // loop through the office data to fetch relevant
        // office address and office contact group data
        for (let i = 0; i < departmentData.content.length; i += 1) {

            let newDepartmentData = departmentData.content[i]

            // API call to fetch employees of department data
            const employeeReq = await fetch(`${baseURL}/${newDepartmentData.deptId}/employees`);
            if (employeeReq.status !== 200) throw new ApolloError("Couldn't process the Deparment API request")
            const employeeData = await employeeReq.json()

            // API call to fetch projects of department data
            const projectReq = await fetch(`${baseURL}/${newDepartmentData.deptId}/projects`);
            if (projectReq.status !== 200) throw new ApolloError("Couldn't process the Department API request")
            const projectData = await projectReq.json()

            // assigning the reponse of office address & office contact group to the office data
            newDepartmentData.employees = employeeData.content
            newDepartmentData.projects = projectData.content

            // pushing the newly generated data into an array
            departmentDataList.push(newDepartmentData)
        }
        return departmentDataList;
    }
}

module.exports = DepartmentAPI;