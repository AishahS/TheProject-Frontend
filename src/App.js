import { Row, Typography, Col, Button, Modal, List } from "antd";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import {
  fetchCompany,
  fetchDepartments,
  fetchEmployees,
  deleteDepartment,
  deleteEmployee,
} from "./network_requests";
import CompanyForm from "./CompanyForm";
import DepartmentForm from "./DepartmentForm";
import EmployeeForm from "./EmployeeForm";
import DepartmentDetail from "./DepartmentDetails";
import EmployeeDetail from "./EmployeeDetail";

function App() {
  const [company, setCompany] = useState({});
  const [editCompany, setEditCompany] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [addDepartment, setAddDepartment] = useState(false);
  const [departmentDetail, setDepartmentDetail] = useState(false);
  const [employeeDetail, setEmployeeDetail] = useState(false);
  const [departmentDetailData, setDepartmentDetailData] = useState(null);
  const [employeeDetailData, setEmployeeDetailData] = useState(null);
  const [employees, setEmployee] = useState([]);
  const [addEmployee, setAddEmployee] = useState(false);
  const [isDelete, setDelete] = useState(false);

  //store and updating data in usestate 
  useEffect(async () => {
    const _company = await fetchCompany();
    setCompany(_company ? _company[0] : {});
  }, [editCompany]);

//getting all dep. in the server whenever adding or deleting 
  useEffect(async () => {
    const _departments = await fetchDepartments();
    setDepartments(_departments ? _departments : []);
  }, [addDepartment, isDelete]);

  //geting all employee (adding or deleting) from the server and send the updated data again
  useEffect(async () => {
    const _employees = await fetchEmployees();
    setEmployee(_employees ? _employees : []);
  }, [addEmployee, isDelete]);

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: "2%",
        backgroundColor: "white",
        border: "3px solid #3D1C01",
        borderRadius: "5px",
      }}
    >
      <Modal //model is visible whenever we click that button (canceling closing the model)
        visible={editCompany}
        destroyOnClose
        onCancel={() => {
          setEditCompany(!editCompany);
        }}
        onClose={() => {
          setEditCompany(!editCompany);
        }}
        onOk={() => {
          setEditCompany(!editCompany);
        }}
      >
        <CompanyForm company={company} setEditCompany={setEditCompany} />
      </Modal>
      <Modal
        visible={addDepartment}
        destroyOnClose
        onCancel={() => {
          setAddDepartment(!addDepartment);
        }}
        onClose={() => {
          setAddDepartment(!addDepartment);
        }}
        onOk={() => {
          setAddDepartment(!addDepartment);
        }}
      >
        <DepartmentForm
          setAddDepartment={setAddDepartment}
          setDepartmentDetail={setDepartmentDetail}
          department={departmentDetailData}
          CompanyId={company?.id}
        />
      </Modal>
      <Modal
        visible={addEmployee}
        destroyOnClose
        onCancel={() => {
          setAddEmployee(!addEmployee);
        }}
        onClose={() => {
          setAddEmployee(!addEmployee);
        }}
        onOk={() => {
          setAddEmployee(!addEmployee);
        }}
      >
        <EmployeeForm
          setAddEmployee={setAddEmployee}
          setEmployeeDetail={setEmployeeDetail}
          employee={employeeDetailData}
        />
      </Modal>

      <Row> 
        <Col span={2}>

        </Col>
        <Col span={20}>
        <div
            style={{
              fontSize: 40,
              color: "#0E4950",
              display: "flex",
              justifyContent: "center",
            }}>
        <img
            src={company?.logo}
            style={{
              width: "100px",
              height: "80px",
              paddingLeft: "2%",
              paddingTop: "2%",
            }} // placing the logo  (keeping in one line)
          ></img>
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 50,
              color: "#0E4950",
              display: "flex",
              justifyContent: "center",
            }}

            //whenever is the company name available show it other done 
          >
           
            <Typography> 
              
              {company?.name}
              
            </Typography>
            
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#0E4950",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>{company?.description}</Typography>
          </div>
        </Col>
        <Col span={2}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: 24,
              color: "#0E4950",
              paddingRight: "1vw",
              paddingTop: "2vh",
            }}
          >
            <Typography>{company?.location}</Typography>
          </div>
        </Col>
      </Row>
      <Row style={{ minHeight: "65vh", padding: "2%" }}>
        <Col span={12}>
          <List
            style={{ backgroundColor: "#FAFAFA", marginRight: "2%" }}
            header={
              <Typography.Text style={{ fontSize: "20px" }}>
                Departments of {company?.name ? company?.name : "company"}
              </Typography.Text>
            }
            footer={
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  onClick={() => {
                    setAddDepartment(!addDepartment);
                  }}
                >
                  Add Department
                </Button>
              </div>
            }
            bordered
            dataSource={departments}
            renderItem={(item) => (
              <List.Item>
                <Col span={18}>
                  <Typography.Text>{item.name}</Typography.Text>
                </Col>
                <Col span={3}>
                  <Button
                    type="text"
                    style={{ color: "blue" }}
                    onClick={() => {
                      setDepartmentDetail(!departmentDetail);
                      setDepartmentDetailData(item);
                    }}
                  >
                    Details
                  </Button>
                </Col>
                <Col span={3}>
                  <Button
                    type="text"
                    style={{ color: "red" }}
                    onClick={() => {
                      deleteDepartment(item.id);
                      setDelete(!isDelete);
                    }}
                  >
                    Delete
                  </Button>
                </Col>
                <Modal
                  visible={departmentDetail}
                  destroyOnClose
                  footer={
                    <div>
                      <Button
                        type="primary"
                        onClick={() => {
                          setAddDepartment(!addDepartment);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  }
                  onCancel={() => {
                    setDepartmentDetail(!departmentDetail);
                    setDepartmentDetailData(null);
                  }}
                  onClose={() => {
                    setDepartmentDetail(!departmentDetail);
                    setDepartmentDetailData(null);
                  }}
                  onOk={() => {
                    setDepartmentDetail(!departmentDetail);
                    setDepartmentDetailData(null);
                  }}
                >
                  <DepartmentDetail
                    department={departmentDetailData}
                    setDepartmentDetail={departmentDetail}
                    setDepartmentDetailData={setDepartmentDetailData}
                  />
                </Modal>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12} style={{}}>
          <List
            style={{ backgroundColor: "#FAFAFA", marginRight: "2%" }}
            header={
              <Typography.Text style={{ fontSize: "20px" }}>
                Employees of {company?.name ? company?.name : "company"}
              </Typography.Text>
            }
            footer={
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  onClick={() => {
                    setAddEmployee(!addEmployee);
                  }}
                >
                  Add Employee
                </Button>
              </div>
            }
            bordered
            dataSource={employees}
            renderItem={(item) => (
              <List.Item>
                <Col span={18}>
                  <Typography.Text>{item.name}</Typography.Text>
                </Col>
                <Col span={3}>
                  <Button
                    type="text"
                    style={{ color: "blue" }}
                    onClick={() => {
                      setEmployeeDetailData(item);
                      setEmployeeDetail(!employeeDetail);
                    }}
                  >
                    Details
                  </Button>
                </Col>
                <Col span={3}>
                  <Button
                    type="text"
                    style={{ color: "red" }}
                    onClick={() => {
                      deleteEmployee(item.id);
                      setDelete(!isDelete);
                    }}
                  >
                    Delete
                  </Button>
                </Col>
                <Modal
                  visible={employeeDetail}
                  destroyOnClose
                  footer={
                    <div>
                      <Button
                        type="primary"
                        onClick={() => {
                          setAddEmployee(!addEmployee);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  }
                  onCancel={() => {
                    setEmployeeDetail(!employeeDetail);
                    setEmployeeDetailData(null);
                  }}
                  onClose={() => {
                    setEmployeeDetail(!employeeDetail);
                    setEmployeeDetailData(null);
                  }}
                  onOk={() => {
                    setEmployeeDetail(!employeeDetail);
                    setEmployeeDetailData(null);
                  }}
                >
                  <EmployeeDetail employee={employeeDetailData} />
                </Modal>
              </List.Item>
            )}
          ></List>
        </Col>
      </Row>
      <Row
        style={{ display: "flex", justifyContent: "flex-end", margin: "2%" }}
      >
        <Button
          type="primary"
          onClick={() => {
            setEditCompany(!editCompany);
          }}
        >
          Edit Company
        </Button>
      </Row>
    </div>
  );
}

export default App;
