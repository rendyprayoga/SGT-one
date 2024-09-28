import { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { useRouter } from "next/router";

const { Search } = Input;

export default function MainPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCountry, setFilterCountry] = useState("");
  const [filterName, setFilterName] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const url = `http://universities.hipolabs.com/search?country=${filterCountry}&name=${filterName}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterCountry, filterName]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Web pages",
      dataIndex: "web_pages",
      key: "web_pages",
      render: (web_pages) => <a href={web_pages[0]}>{web_pages[0]}</a>,
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.country.toLowerCase().includes(filterCountry.toLowerCase()) &&
      item.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingTop: 20,
        marginBottom: 20,
      }}
    >
      <Search
        placeholder="Filter by Country"
        onSearch={(value) => setFilterCountry(value)}
        style={{ marginTop: 20, width: 400 }}
      />
      <Search
        placeholder="Filter by Name"
        onSearch={(value) => setFilterName(value)}
        style={{ marginBottom: 20, width: 500 }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey={(record) => record.name}
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button type="primary" onClick={handleLogout} style={{ width: 100 }}>
          Logout
        </Button>
      </div>
    </div>
  );
}
