import { Form, Input, Button } from "antd";
import { addDepartment, updateDepartment } from "./network_requests";

const DepartmentForm = (props) => {
  const department = props?.department;
  console.log(department);
  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      name="basic"
      initialValues={{
        name: department?.name,
        work: department?.work,
        location: department?.location,
      }}
      style={{ padding: "2vh" }}
      onFinish={async (value) => {
        if (props.department) {
          await updateDepartment(department?.id, {
            ...value,
            CompanyId: props.CompanyId,
          });
        } else {
          await addDepartment({ ...value, CompanyId: props.CompanyId });
        }
        props.setAddDepartment(false);
        props.setDepartmentDetail(false);
      }}
      onFinishFailed={(error) => {
        console.log("Failed:", error);
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please write name of department" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Job"
        name="work"
        rules={[{ required: true, message: "Please write job description" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[
          { required: true, message: "Please write location of department" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DepartmentForm;
