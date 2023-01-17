module.exports = () => {
  console.log("employeeroutes inside routes");
  const employeeroutes = require("express-promise-router")();
  const employeeController = require("../controllers/employeeController.js");

  employeeroutes.route("/getEmployeeList").get(employeeController.EmployeeList);

  employeeroutes.route("/addEmployee").post(employeeController.AddEmployee);

  employeeroutes
    .route("/EmployeeListById/:id")
    .get(employeeController.EmployeeListById);

  employeeroutes
    .route("/deleteEmployee/:id")
    .delete(employeeController.DeleteEmployee);
  return employeeroutes;
};
