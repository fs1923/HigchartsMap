import React, { useMemo } from "react";
import mapDataIE from "@highcharts/map-collection/countries/ua/ua-all.geo.json";

const useMapOptions = (data, selectTown) => {
  const mapOptions = useMemo(() => {
    return {
      chart: {
        map: "countries/ua/ua-all"
      },
      title: {
        text: "Fs1923"
      },
      subtitle: {
        text: "Ukraine"
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      },
      tooltip: {
        headerFormat: "{point.name}",
        pointFormat: "{point.name}"
      },
      colorAxis: {
        min: 0,
        showInLegend: false
      },
      series: [
        {
          // Use the gb-all map with no data as a basemap
          name: "Basemap",
          cursor: "pointer",
          point: {
            events: {
              click: e => {
                selectTown(e.point["hc-key"]);
              }
            }
          },
          states: {
            hover: {
              color: "#BADA55"
            }
          },
          data: data,
          mapData: mapDataIE,
          borderColor: "#000000",
          nullColor: "rgba(200, 200, 200, 0.3)",
          showInLegend: false
        }
      ]
    };
  }, [data, selectTown]);
  return mapOptions;
};

export default useMapOptions;
