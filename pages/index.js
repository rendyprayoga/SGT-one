import { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { useRouter } from "next/router";

export default function Home() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const router = useRouter();

  const onFinish = (values) => {
    console.log("Succes:", values);
    setIsloggedIn(true);
    router.push("/main");
  };

  if (isLoggedIn) {
    return <p> Login Berhasil ...</p>;
  }

  return (
    <Card
      style={{
        width: 400,
        margin: "auto",
        marginTop: 100,
        backgroundColor: "#f0f2f5",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ maxWidth: 300, margin: "auto", marginTop: 50 }}>
        <h2> Login </h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Masukkan Username " }]}
          >
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Masukkan Password " }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
}
