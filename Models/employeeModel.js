var knex = require("../knex");
var crypto = require("crypto");
var fileUpload = require("../common/fileupload");
const dotenv = require("dotenv").config();

class Employees {
  static async EmployeeList() {
    console.log("EmployeeList inside Model");
    try {
      let query = knex(process.env.EMPLOYEE);
      let result = await query;
      if (!result) {
        return {
          success: false,
          message: "No Record Found",
          data: {},
        };
      }
      return {
        success: true,
        message: "Employee Listed Successfully",
        data: result.map((obj) => ({
          ...obj,
          image:
            fileUpload.base64Conversion(obj.image) ||
            process.env.ENVIRONMENT_URL + "/" + obj.image,
        })),
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: {},
      };
    }
  }

  static async AddEmployee(req) {
    console.log("AddEmployee inside Model");
    try {
      console.log("req from employee model");
      let query = knex(process.env.EMPLOYEE).insert({
        id: crypto.randomUUID(),
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        image: fileUpload.imageLoop(req.files),
      });
      await query;
      return {
        success: true,
        message: "Employee Added Successfully",
        data: {},
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: {},
      };
    }
  }

  static async EmployeeListById(req) {
    console.log("EditEmployee inside Model");
    console.log(req, "req");
    try {
      let query = knex(process.env.EMPLOYEE).where("id", req.id);
      let result = await query;
      console.log(result);
      if (!result) {
        return {
          success: false,
          message: "No Record Found",
          data: {},
        };
      }
      return {
        success: true,
        message: "Employee Listed By Id Successfully",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: {},
      };
    }
  }
  static async DeleteEmployee(req) {
    console.log("EditEmployee inside Model");
    console.log(req, "req");
    let listbyId = await Employees.EmployeeListById(req);
    if (listbyId.success) {
      try {
        let query = knex(process.env.EMPLOYEE).where("id", req.id).del();
        let result = await query;
        console.log(result);
        if (!result) {
          return {
            success: false,
            message: "No Record Found",
            data: {},
          };
        }
        return {
          success: true,
          message: "Employee Deleted Successfully",
          data: {},
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          data: {},
        };
      }
    } else {
      return {
        success: false,
        message: listbyId.message,
        data: {},
      };
    }
  }
}

module.exports = Employees;
