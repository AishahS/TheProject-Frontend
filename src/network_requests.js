import axios from "axios";
//relation and connection (backend and frontend connecting)

//calling company API to fetch company from server
export const fetchCompany = async () => {
  try {
    const response = await axios.get("http://localhost:8000/company");
    const company = [...response.data];
    return company;
  } catch (error) {
    console.log(error);
  }
};

//updating company (editing)
export const updateCompany = async (id, updateCompany) => {
  try {
    await axios.patch(`http://localhost:8000/company/${id}`, {
      ...updateCompany,
    });
  } catch (error) {
    console.log(error);
  }
};

//fetching all department from server 
export const fetchDepartments = async () => {
  try {
    const response = await axios.get("http://localhost:8000/department");
    const departments = [...response.data];
    return departments;
  } catch (error) {
    console.log(error);
  }
};
// adding new department 
export const addDepartment = async (newDepartment) => {
  try {
    await axios.post("http://localhost:8000/department", {
      ...newDepartment,
    });
  } catch (error) {
    console.log(error);
  }
};

//editing departments
export const updateDepartment = async (id, newDepartment) => {
  try {
    await axios.patch(`http://localhost:8000/department/${id}`, {
      ...newDepartment,
    });
  } catch (error) {
    console.log(error);
  }
};

//deleting department
export const deleteDepartment = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/department/${id}`);
  } catch (error) {
    console.log(error);
  }
};

// all employee data
export const fetchEmployees = async () => {
  try {
    const response = await axios.get("http://localhost:8000/employee");
    const employee = [...response.data];
    return employee;
  } catch (error) {
    console.log(error);
  }
};

//checking department id from the server and returning all members that in the dep.
export const fetchEmployeesDept = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/employee/${id}`);
    const employee = [...response.data];
    return employee;
  } catch (error) {
    console.log(error);
  }
};
//adding employee
export const addEmployee = async (newEmployee) => {
  try {
    await axios.post("http://localhost:8000/employee", {
      ...newEmployee,
    });
  } catch (error) {
    console.log(error);
  }
};
//deleting employee data
export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/employee/${id}`);
  } catch (error) {
    console.log(error);
  }
};

//editing employee
export const updateEmployee = async (id, newEmployee) => {
  try {
    await axios.patch(`http://localhost:8000/employee/${id}`, {
      ...newEmployee,
    });
  } catch (error) {
    console.log(error);
  }
};
