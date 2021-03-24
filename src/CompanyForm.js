import { Form, Input, Button } from "antd";
import { updateCompany } from "./network_requests";

const CompanyForm = (props) => {
  const company = props.company;
  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      name="basic"
      initialValues={{
        name: company?.name,
        description: company?.description,
        location: company?.location,
        logo: company?.logo,
      }}
      style={{ padding: "2vh" }}
      onFinish={async (value) => {
        await updateCompany(company.id, value);
        props.setEditCompany(false);
      }}
      onFinishFailed={(error) => {
        console.log("Failed:", error);
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please write name of company" }]} //should be available
      >
        <Input />
      </Form.Item>
     
      <Form.Item
        label="Discription"
        name="description"
        rules={[
          {
            required: true,
            message: "Please write description of company",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[
          { required: true, message: "Please write location of company" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="logo URL"
        name="logo"
        rules={[{ required: true, message: "Please enter logo URL" }]}
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

export default CompanyForm;
