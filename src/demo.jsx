import React, { useCallback } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import findIndex from "lodash/findIndex";
import ukraineHcKeys from "/ukraineHcKeys";
import useMapOptions from "/useMapOptions";
highchartsMap(Highcharts); // Initialize the map module

const useStateWithLocalStorage = localStorageKey => {
  const cachedHits = localStorage.getItem(localStorageKey);
  const local = ukraineHcKeys.map(key => {
    return { "hc-key": key, value: 0 };
  });
  console.log("cash: ", cachedHits);
  const [value, setValue] = React.useState(cachedHits ? cachedHits : local);
  console.log(value);
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);
  return [value, setValue];
};

const Ukraine = () => {
  const localStorageKey = "ukraine";
  const [data, setData] = useStateWithLocalStorage(localStorageKey);
  // const local = localStorage.getItem(localStorageKey) ||
  // ukraineHcKeys.map(key => {
  //   return { "hc-key": key, value: 0 };
  // });
  // const [data, setData] = useState(ukraineHcKeys.map(key => {
  //   return { "hc-key": key, value: 0 };
  // }));

  // React.useEffect(() => {
  //   localStorage.setItem("ukraine", JSON.stringify(data));
  // }, [data]);

  const selectTown = useCallback(
    key => {
      const index = findIndex(data, { "hc-key": key });
      let newData = [...data];
      newData[index].value = newData[index].value ? 0 : 1;
      setData(newData);
    },
    [data, setData]
  );
  // console.log(data)
  const mapOptions = useMapOptions(data, selectTown);

  return (
    <div>
      <HighchartsReact
        constructorType={"mapChart"}
        highcharts={Highcharts}
        options={mapOptions}
      />
    </div>
  );
};

render(<Ukraine />, document.getElementById("root"));
