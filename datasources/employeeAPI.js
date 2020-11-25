const { RESTDataSource } = require('apollo-datasource-rest');
const fetch = require('node-fetch');

const PropertiesReader = require('properties-reader');
const prop = PropertiesReader("./app.properties");

// function to fetch the value of a property
getProperty = (key) => { return prop.get(key); }

// Base Http end point
const baseURL = getProperty('employee_url');

class EmployeeAPI extends RESTDataSource {
    constructor() {
        super()
    }

    async employees() {
        return fetch(baseURL)
            .then(res => res.json())
            .then(data => { return data.content })
    }
}

module.exports = EmployeeAPI;