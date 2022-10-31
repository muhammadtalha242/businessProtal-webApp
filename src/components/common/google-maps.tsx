import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';

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
}

interface IPlacesAutocomplete {
  setSelected: Function;
}

const PlacesAutocomplete: React.FC<IPlacesAutocomplete> = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    console.log('address: ', address);

    const results = await getGeocode({ address });
    console.log('results: ', results);

    const { lat, lng } = await getLatLng(results[0]);
    // const test = await getDetails({ lat, lng });
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} className="combobox-input" placeholder="Search an address" />
      <ComboboxPopover>
        <ComboboxList>{status === 'OK' && data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}</ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

const GoogleMapComponent: React.FC<props> = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC4fkVVbpvzhEnFwEPeeB08QlWoT4GY3Ik',
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState<{ lat: 0; lng: 0 }>();

  useEffect(() => {
    if (selected && map) {
      const mapx: any = map;
      mapx.panTo(selected);
      setCenter(selected);
      if (props.value) {
        console.log("props.value: ",props.value);
        mapx.panTo(props.value);
        setCenter(props.value);
      }
      if (props.setValue) props.setValue({ name: props.name, value: selected });
    }
  }, [selected]);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <GoogleMapComponentContainter>
      {isLoaded ? (
        <>
          <div className="places-containerx">
            <PlacesAutocomplete setSelected={setSelected} />
          </div>

          <GoogleMap mapContainerStyle={{ width: GOOGLE_MAP_WIDTH, height: GOOGLE_MAP_HEIGHT }} center={center} zoom={12} onLoad={onLoad} onUnmount={onUnmount}>
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </>
      ) : (
        <></>
      )}
    </GoogleMapComponentContainter>
  );
};

export default React.memo(GoogleMapComponent);
