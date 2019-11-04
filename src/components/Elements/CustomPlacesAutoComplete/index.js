import PlacesAutocomplete, {
    geocodeByAddress,
} from 'react-places-autocomplete';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';

class CustomPlacesAutoComplete extends React.Component {

    static propTypes = {
        address: PropTypes.string.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleSelect: PropTypes.func.isRequired,
    }

    static defaultProps = {
        address: "",
        handleChange: () => { },
        handleSelect: () => { }
    }


    handleChange = address => {
        this.props.handleChange(address);
    }

    handleSelect = address => {
        var city_name = '';
        geocodeByAddress(address)
            .then(results => {
                console.log(results);
                results[0]['address_components'].forEach(component => {
                    if (component.types.indexOf('administrative_area_level_1') > -1) {
                        city_name = component.long_name;
                    }
                });
                var lng = results[0].geometry.location.lng();
                var lat = results[0].geometry.location.lat();
                this.props.handleSelect({
                    lat: lat,
                    lng: lng,
                    region: city_name,
                    address: results[0].formatted_address
                });
            })
            .catch(error => {
                console.log(error);
                NotificationManager.error("Error when type address!");
            });
    };

    render() {
        return (
            <PlacesAutocomplete
                value={this.props.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input type="text"
                            {...getInputProps({
                                placeholder: 'enter then choose a address...',
                                className: 'location-search-input form-control',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        )
    }
}

export default CustomPlacesAutoComplete;