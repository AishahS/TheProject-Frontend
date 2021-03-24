import { Row, Typography, Col, List } from "antd";

const EmployeeDetail = (props) => {
  const employee = props.employee;
  return (
    <div>
      <Row>
        <Typography.Text style={{ fontSize: "20px", fontWeight: 600 }}>
          {employee?.name}
        </Typography.Text>
      </Row>
      <Row>
        <Typography.Text style={{ fontSize: "14px", fontWeight: 400 }}>
          Position: {employee?.position}
        </Typography.Text>
      </Row>
      <Row>
        <Typography.Text style={{ fontSize: "14px", fontWeight: 400 }}>
          Salery: {employee?.salery}
        </Typography.Text>
      </Row>
      <Row>
        <Typography.Text style={{ fontSize: "14px", fontWeight: 400 }}>
          Residence: {employee?.residence}
        </Typography.Text>
      </Row>
      <Row>
        <Typography.Text style={{ fontSize: "14px", fontWeight: 400 }}>
          Attendance: {employee?.attendance}
        </Typography.Text>
      </Row>
    </div>
  );
};

export default EmployeeDetail;
