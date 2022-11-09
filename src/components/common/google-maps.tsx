import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
// import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import { AutoComplete } from 'antd';

const GoogleMapComponentContainter = styled.div`
  .places-container {
    .combobox-input {
      width: 100%;
      padding: 0.5rem;
    }
  }
`;

const center = {
  lat: -3.745,
  lng: -38.523,
};

const GOOGLE_MAP_WIDTH = '400px';
const GOOGLE_MAP_HEIGHT = '400px';

interface props {
  name?: string;
  setValue?: Function;
  value?: any;
  searchTerm?: any;
  isEditable: boolean;
}

interface ILocation {
  lat: number;
  lng: number;
}

interface IPlacesAutocomplete {
  setSelected: Function;
  setCenter: Function;
  center: ILocation;
  selected: string;
  isEditable: boolean;
}

const PlacesAutocomplete: React.FC<IPlacesAutocomplete> = ({ setSelected, setCenter, center, selected, isEditable }) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  useEffect(() => {
    console.log('PlacesAutocomplete center: ', center);
    console.log('PlacesAutocomplete selected: ', selected);
    if (center && selected) {
      setValue(selected);
      setCenter(center);
    }
  }, []);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 30 });

  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    console.log('address: ', address);

    const results = await getGeocode({ address });
    console.log('results: ', results);

    const { lat, lng } = await getLatLng(results[0]);
    setSelected(results[0].formatted_address);
    setCenter({ lat, lng });
    setOptions([]);
  };

  const handleChange = (searchTerm: string) => {
    console.log('searchTerm: ', searchTerm);
    console.log('status, data: ', status, data);
    setValue(searchTerm);
    const opts = data.map(({ place_id, description }) => {
      return { value: description };
    });
    setOptions(opts);
  };
  return <AutoComplete style={{ width: 200 }} options={options} onSelect={handleSelect} onChange={handleChange} value={value} disabled={!ready || !isEditable} placeholder="input here" allowClear />;
};

const GoogleMapComponent: React.FC<props> = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC4fkVVbpvzhEnFwEPeeB08QlWoT4GY3Ik',
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState<string>('');
  const [center, setCenter] = useState<ILocation>({ lat: 0, lng: 0 });

  useEffect(() => {
    console.log('props: ', props);
    if (props.value) {
      console.log('props.value: ', props.value);
      setSelected(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    const fetchLocation = async () => {
      console.log('GoogleMapComponent center: ', center);
      console.log('GoogleMapComponent selmapected: ', selected);
      console.log('GoogleMapComponent map: ', map);
      const results = await getGeocode({ address: selected });
      console.log('results: ', results);

      const { lat, lng } = await getLatLng(results[0]);

      setCenter({ lat, lng });
      if (selected && map) {
        console.log('GoogleMapComponent center: in ', center);
        console.log('GoogleMapComponent selected: in', selected);
        const mapx: any = map;

        mapx.panTo(center);

        if (props.setValue) props.setValue({ name: props.name, value: selected });
      }
    };
    fetchLocation();
  }, [selected]);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    console.log('map: ', map);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <GoogleMapComponentContainter>
      {isLoaded  ? (
        <>
          <div>
            <PlacesAutocomplete setSelected={setSelected} setCenter={setCenter} selected={selected} center={center} isEditable={props.isEditable} />
          </div>

          <GoogleMap mapContainerStyle={{ width: GOOGLE_MAP_WIDTH, height: GOOGLE_MAP_HEIGHT }} center={center} zoom={12} onLoad={onLoad} onUnmount={onUnmount}>
            {center && <Marker position={center} />}
          </GoogleMap>
        </>
      ) : (
        <></>
      )}
    </GoogleMapComponentContainter>
  );
};

export default React.memo(GoogleMapComponent);
