import { useEffect, useState } from "react";
import "./App.css";
import { SearchBox } from "@fluentui/react";
import axios from "axios";
import { initializeIcons } from '@fluentui/react/lib/Icons';


initializeIcons();

function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://api.slingacademy.com/v1/sample-data/users?limit=20")
      .then((response) => {
        setUsers(response.data.users);
        setFilteredData(response.data.users)
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (event: any) => {
    const searchTerm = event.target.value;
    const filteredData = users.filter((user) => {
      const phoneMatch = user.phone.includes(searchTerm);
      return phoneMatch;
    });
    setFilteredData(filteredData);
  };

  return (
    <div className="App">
      <div className="Container">
        <SearchBox
          style={{ maxWidth: "400px" }}
          type="number"
          placeholder="Enter Phone Number"
          onChange={handleSearch}
          onSearch={handleSearch}
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.phone}</td>
                <td>{user.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
