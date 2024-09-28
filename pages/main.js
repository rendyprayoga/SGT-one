import { useEffect, useState } from "react";
import { Table, Input } from "antd";

const { Search } = Input;

export default function MainPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCountry, setfilterCountry] = useState("");
  const [filterName, setfilterName] = useState("");

  useEffect(() => {
    fetch(
      `http://universities.hipolabs.com/search?country=indonesia&name=universitas`
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
    );
    [filterCountry, filterName];

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Country",
        dataIndex: "nacountryme",
        key: "country",
      },
      {
        title: "Web_pages",
        dataIndex: "web_pages",
        key: "web_pages",
        render: (web_pages) => <a href={web_pages[0]}>{web_pages}</a>,
      },
    ];

    return (
      <div>
        <h2>University Listing</h2>
        <Search>
          placeholder="Filter by Country" onSearch=
          {(value) => setfilterCountry(value)}
          style={{ marginBottom: 20 }}
        </Search>
        <Search>
          placeholder="Filter by Name" onSearch=
          {(value) => setfilterName(value)}
          style={{ marginBottom: 20 }}
        </Search>

        <Table>
          columns={columns}
          datasource= {data}
          loading ={loading}
          rowkey = {(record) => record.name}
        </Table>
      </div>
    );
  });
}
