"use strict";
require("dotenv").config();
const Employees = require("../Models/employeeModel.js");
module.exports = {
  AddEmployee: async (req, res, next) => {
    console.log("AddEmployee inside Controller", req.files, "req.files");
    let results = await Employees.AddEmployee(req);
    if (results.success) {
      res
        .status(200)
        .send({ status: 1, message: results.message, result: results.data });
    } else {
      res.status(400).send({ status: 0, message: results.message, result: {} });
    }
  },
  EmployeeList: async (req, res, next) => {
    let results = await Employees.EmployeeList();
    if (results.success) {
      res.status(200).send({
        status: 1,
        message: results.message,
        result: results.data,
      });
    } else {
      res.status(400).send({
        status: 0,
        message: results.message,
        result: {},
      });
    }
  },
  EmployeeListById: async (req, res, next) => {
    console.log(req.params, "req.params");
    let results = await Employees.EmployeeListById(req.params);
    if (results.success) {
      res.status(200).send({
        status: 1,
        message: results.message,
        result: results.data,
      });
    } else {
      res.status(400).send({
        status: 0,
        message: results.message,
        result: {},
      });
    }
  },

  DeleteEmployee: async (req, res, next) => {
    console.log(req.params, "req.params");
    let results = await Employees.DeleteEmployee(req.params);
    if (results.success) {
      res.status(200).send({
        status: 1,
        message: results.message,
        result: results.data,
      });
    } else {
      res.status(400).send({
        status: 0,
        message: results.message,
        result: {},
      });
    }
  },
};
