var knex = require("../knex");
var crypto = require("crypto");
var fileUpload = require("../common/fileupload");
const dotenv = require("dotenv").config();

class Employees {
  static async EmployeeList() {
    console.log("EmployeeList inside Model");
    try {
      let query = knex(process.env.EMPLOYEE).where("isdeleted", 1);
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
          id: obj.id,
          name: obj.name,
          surname: obj.surname,
          email: obj.email,
          image:
            process.env.ENVIRONMENT_URL + "/" + obj.image ||
            fileUpload.base64Conversion(obj.image),
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
      let is_user_exist = knex(process.env.EMPLOYEE)
        .where("email", req.body.email)
        .andWhere("isdeleted", 1);

      let is_user_exist_check = await is_user_exist;

      if (is_user_exist_check.length) {
        return {
          success: false,
          message: "Employee Already Exist",
          data: {},
        };
      }
      let employee_id;
      let query = knex
        .insert({
          id: crypto.randomUUID(),
          group_type: req.body.group_type,
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          image: fileUpload.imageLoop(req.files),
        })
        .returning("id")
        .into(process.env.EMPLOYEE)
        .then((id) => {
          id.map((emp_id) => {
            employee_id = emp_id.id;
          });
        });
      await query;

      let group_id_query = knex
        .select("id")
        .from(process.env.GROUP)
        .where("type", req.body.group_type)
        .first();

      let group_id = await group_id_query;

      let mapping_query = knex(process.env.EMPLOYEE_GROUP_MAPPING).insert({
        id: crypto.randomUUID(),
        employee_id: employee_id,
        group_id: group_id.id,
      });
      await mapping_query;

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
    console.log("EmployeeListById inside Model");
    try {
      let query = knex(process.env.EMPLOYEE)
        .where("id", req.id)
        .andWhere("isdeleted", 1);
      let result = await query;
      console.log(result, "result");
      if (!result.length) {
        return {
          success: false,
          message: "No Record Found",
          data: {},
        };
      }
      return {
        success: true,
        message: "Employee Listed By Id Successfully",
        data: result.map((obj) => ({
          id: obj.id,
          name: obj.name,
          surname: obj.surname,
          email: obj.email,
          image:
            process.env.ENVIRONMENT_URL + "/" + obj.image ||
            fileUpload.base64Conversion(obj.image),
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

  static async EditEmployee(req) {
    console.log("EditEmployee inside Model");
    let listbyId = await Employees.EmployeeListById(req.params);
    if (listbyId.success) {
      try {
        let query = knex(process.env.EMPLOYEE)
          .where("id", req.params.id)
          .update({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            image: fileUpload.imageLoop(req.files),
          });
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
          message: "Employee Edited Successfully",
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

  static async DeleteEmployee(req) {
    console.log("DeleteEmployee inside Model");
    let listbyId = await Employees.EmployeeListById(req);
    if (listbyId.success) {
      try {
        let query = knex(process.env.EMPLOYEE).where("id", req.id).update({
          isdeleted: 0,
        });

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
  static async EmployeeListByType(req) {
    console.log("EmployeeListByType inside Model", req.query);
    try {
      // let query = knex(`${process.env.EMPLOYEE} as e`)
      //   .leftJoin(
      //     `${process.env.EMPLOYEE_GROUP_MAPPING} as egm`,
      //     "e.id",
      //     "egm.employee_id"
      //   )
      //   .join(`${process.env.GROUP} as g`, "g.id", "egm.group_id")
      //   .where("g.type", req.query.type);

      let query = knex(process.env.EMPLOYEE)
        .where("group_type", req.query.type)
        .andWhere("isdeleted", 1);
      let result = await query;
      if (!result.length) {
        return {
          success: false,
          message: "No Record Found",
          data: {},
        };
      }
      return {
        success: true,
        message: "Employee Listed Successfully",
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
  static async getEmployeeListWithGroup() {
    console.log("getEmployeeListWithGroup inside Model");
    try {
      let query = knex.raw(`select e."name",(select 
ARRAY_AGG ('{group_id:' || g.id || ',group_name:' || g."name"  || '}')
from employee_group_mapping egm left join "group" g on g.id = egm.group_id 
where egm.employee_id = e.id ) as emp from employee e`);
      let result = await query;
      if (!result) {
        return {
          success: false,
          message: "No Record Found",
          data: {},
        };
      }
      console.log(result, "result");
      return {
        success: true,
        message: "Employee Listed Successfully",
        data: result.rows,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: {},
      };
    }
  }
}

module.exports = Employees;
