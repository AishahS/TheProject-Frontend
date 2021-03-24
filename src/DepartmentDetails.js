import { Row, Typography, Col, List } from "antd";
import { useEffect, useState } from "react";
import { fetchEmployeesDept } from "./network_requests";

const DepartmentDetail = (props) => {
  const department = props.department;
  const [team, setTeam] = useState([]);

  useEffect(async () => {
    const _team = await fetchEmployeesDept(department?.id);
    setTeam(_team);
    console.log(_team);
  }, []);

  return (
    <div>
      <Row>
        <Typography.Text style={{ fontSize: "20px", fontWeight: 600 }}>
          {department?.name}
        </Typography.Text>
      </Row>
      <Row>
        <Typography.Text style={{ fontSize: "14px", fontWeight: 400 }}>
          {department?.work}
        </Typography.Text>
      </Row>
      <Row>
        <Typography.Text style={{ fontSize: "14px", fontWeight: 400 }}>
          {department?.location}
        </Typography.Text>
      </Row>
      <Row>
        <List
          style={{
            backgroundColor: "#FAFAFA",
            width: "100%",
            paddingTop: "2vh",
          }}
          header={
            <Row>
              <Col span={8}>
                <Typography.Text style={{ fontWeight: 600 }}>
                  Name
                </Typography.Text>
              </Col>
              <Col span={8}>
                <Typography.Text style={{ fontWeight: 600 }}>
                  Position
                </Typography.Text>
              </Col>
              <Col span={8}>
                <Typography.Text style={{ fontWeight: 600 }}>
                  Rresidence
                </Typography.Text>
              </Col>
            </Row>
          }
          bordered
          dataSource={team}
          renderItem={(item) => (
            <List.Item>
              <Col span={8}>
                <Typography.Text>{item.name}</Typography.Text>
              </Col>
              <Col span={8}>
                <Typography.Text>{item.position}</Typography.Text>
              </Col>
              <Col span={8}>
                <Typography.Text>{item.residence}</Typography.Text>
              </Col>
            </List.Item>
          )}
        />
      </Row>
    </div>
  );
};

export default DepartmentDetail;
