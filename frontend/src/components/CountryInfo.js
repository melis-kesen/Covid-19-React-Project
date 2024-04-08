// components/CountryInfo.js
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataRequest } from "../redux/actions";
import { selectData, selectLoading } from "../redux/selectors";

export const CountryInfo = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const datas = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const [regionName, setRegionName] = useState(null);
  const [visible, setVisible] = useState(false);
  const cols = [
    { field: "province", header: "PROVINCE" },
    { field: "active", header: "ACTIVE" },
    { field: "confirmed", header: "CONFIRMED" },
    { field: "deaths", header: "DEATHS" },
    { field: "recovered", header: "RECOVERED" },
  ];
  useEffect(() => {
    dispatch(fetchDataRequest(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (datas.length > 0) {
      setVisible(false);
      setRegionName(datas[0].regionName);
    }
  }, [datas]);
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
  const provinceBodyComponent = (rowData) => {
    return (
      <span>
        { rowData.province.toLocaleString("tr")}
      </span>
    );
  };
  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, datas);
        doc.save(`${regionName}.pdf`);
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(datas);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, {regionName});
    });
  };
  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };
  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <div>
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          text
          onClick={exportExcel}
          data-pr-tooltip="XLS"
          tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          text
          onClick={exportPdf}
          data-pr-tooltip="PDF"
          tooltip="PDF"
        />
      </div>
    </div>
  );

  return (
    <div className="card">
      {!loading && (
        <>
          <h1 style={{ textAlign: "center" }}>{regionName?.toUpperCase()}</h1>
          <div>
            <DataTable
              header={header}
              className="dataTable"
              value={datas}
              size="small"
              tableStyle={{ minWidth: "50rem" }}
              scrollable
              scrollHeight="600px"
              sortMode="multiple"
              paginator
              rows={15}
              rowsPerPageOptions={[15, 25, 50]}
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
             <Column
                field="province"
                body={provinceBodyComponent}
                header="PROVINCE"
                sortable
              ></Column>
              <Column
                field="active"
                body={activeBodyComponent}
                header="ACTIVE"
                sortable
              ></Column>
              <Column
                field="confirmed"
                header="CONFIRMED"
                body={confirmedBodyComponent}
                sortable
              ></Column>
              <Column
                field="deaths"
                header="DEATHS"
                body={deathsBodyComponent}
                sortable
              ></Column>
              <Column
                field="recovered"
                header="RECOVERED"
                body={recoveredBodyComponent}
                sortable
              ></Column>
            </DataTable>
          </div>
        </>
      )}
      <Dialog  
        visible={loading}
        closable={false}
        onHide={() => setVisible(false)}
      >
        <div className="loader"  style={{ width: "10vw" }} ></div>
      </Dialog>
    </div>
  );
};
