module.exports = () => {
  console.log("employeeroutes inside routes");
  const employeeroutes = require("express-promise-router")();
  const employeeController = require("../controllers/employeeController.js");

  employeeroutes.route("/getEmployeeList").get(employeeController.EmployeeList);

  employeeroutes
    .route("/getEmployeeListByType")
    .get(employeeController.EmployeeListByType);

  employeeroutes.route("/addEmployee").post(employeeController.AddEmployee);

  employeeroutes
    .route("/EmployeeListById/:id")
    .get(employeeController.EmployeeListById);

  employeeroutes
    .route("/editEmployee/:id")
    .put(employeeController.EditEmployee);

  employeeroutes
    .route("/deleteEmployee/:id")
    .delete(employeeController.DeleteEmployee);

  employeeroutes
    .route("/getEmployeeListWithGroup")
    .get(employeeController.getEmployeeListWithGroup);

  return employeeroutes;
};
