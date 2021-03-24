import { Form, Input, Button, Select } from "antd";
import { useState, useEffect } from "react";
import {
  addEmployee,
  updateEmployee,
  fetchDepartments,
} from "./network_requests";

const EmployeeForm = (props) => {
  const [departments, setDepartments] = useState([]);
  const employee = props.employee;
  useEffect(async () => {
    const _departments = await fetchDepartments();
    setDepartments(_departments ? _departments : []);
  }, []);

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      name="basic"
      initialValues={{
        name: employee?.name,
        position: employee?.position,
        salery: employee?.salery,
        residence: employee?.residence,
        attendance: employee?.attendance,
        DepartmentId: employee?.DepartmentId,
      }}
      style={{ padding: "2vh" }}
      onFinish={async (value) => {
        if (props.employee) {
          await updateEmployee(employee?.id, {
            ...value,
          });
        } else {
          await addEmployee(value);
        }
        props.setAddEmployee(false);
        props.setEmployeeDetail(false);
      }}
      onFinishFailed={(error) => {
        console.log("Failed:", error);
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please write name of employee" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Position"
        name="position"
        rules={[
          { required: true, message: "Please write position of employee" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Salery"
        name="salery"
        rules={[{ required: true, message: "Please write salery of employee" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Residence"
        name="residence"
        rules={[
          {
            required: true,
            message: "Please write residence of employee",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Attendance"
        name="attendance"
        rules={[
          { required: true, message: "Please write attendance of employee" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Department"
        name="DepartmentId"
        rules={[{ required: true, message: "Please write salery of employee" }]}
      >
        <Select>
          {departments.map((item) => {
            return <Select.Option value={item.id}>{item.name}</Select.Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
