import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import axios from "axios";

export const CountryInfo = () => {
  const { name } = useParams(); // URL'den ülke adını al
  const [datas, setDatas] = useState([]);
  const [regionName, setRegionName] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    fetch();
  }, [name]);
  const fetch = async () => {
    const options = {
      method: "GET",
      url: "https://covid-19-statistics.p.rapidapi.com/reports",
      params: { iso: name },
      headers: {
        "X-RapidAPI-Key": "bf912b2ac4mshdabf19e77d8742bp123a75jsn5e3d3f2c9b6b",
        "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
      },
    };
    try {
      setVisible(true);
      const response = await axios.request(options);
      setDatas(response.data.data);
      setRegionName(response.data.data[0].region.name);
      setVisible(false);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const activeBodyComponent = (rowData) => {
    return <span>{rowData.active.toLocaleString("tr")}</span>;
  };
  const confirmedBodyComponent = (rowData) => {
    return <span>{rowData.confirmed.toLocaleString("tr")}</span>;
  };
  const deathsBodyComponent = (rowData) => {
    return <span>{rowData.deaths.toLocaleString("tr")}</span>;
  };
  const recoveredBodyComponent = (rowData) => {
    return <span>{rowData.recovered.toLocaleString("tr")}</span>;
  };
  return (
    <div>
      {!visible && (
        <>
          <h1>{regionName}</h1> {/* Ülke adını başlık olarak göster */}
          <div className="card">
            <DataTable
              value={datas}
              stripedRows
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="active"
                body={activeBodyComponent}
                header="ACTIVE"
              ></Column>
              <Column field="confirmed" header="CONFIRMED"  body={confirmedBodyComponent}></Column>
              <Column field="deaths" header="DEATHS"  body={deathsBodyComponent}></Column>
              <Column field="recovered" header="RECOVERED"  body={recoveredBodyComponent}></Column>
            </DataTable>
          </div>
        </>
      )}
      <Dialog
        className="loader"
        visible={visible}
        style={{ width: "5vw" }}
        closable={false}
        onHide={() => setVisible(false)}
      >
        {" "}
      </Dialog>
    </div>
  );
};
