import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const Segments = ({ onChange, onTestSoundClick, settings }) => (
	<div className="row">
		<div className="col-md-6 col-lg-6">
      <RaisedButton
        fullWidth
        label="Test Sound"
        className="align-content m-t-15"
        onClick={onTestSoundClick}
      />

		</div>
		<div className="col-md-6 col-lg-6">
			<SelectField
				floatingLabelText="Frequency"
				value={settings.mic}
				onChange={onChange('mic')}
			>
				<MenuItem value="plughw:0" primaryText="plughw:0" />
				<MenuItem value="plughw:1" primaryText="plughw:1" />
        <MenuItem value="plughw:2" primaryText="plughw:2" />
			</SelectField>
		</div>
		<div className="col-md-3 col-lg-3">
			<TextField
				fullWidth
				floatingLabelText="Середня довжина сегмента"
				onChange={onChange('meanSegmentLength')}
				defaultValue={settings.meanSegmentLength}
			/><br />

		</div>
		<div className="col-md-3 col-lg-3">
			<TextField
				fullWidth
				floatingLabelText="Час прослуховування (2000 мс = 2с)"
				onChange={onChange('minSegmentTimeToListen')}
				defaultValue={settings.minSegmentTimeToListen}
			/><br />

		</div>
		<div className="col-md-3 col-lg-3">
			<TextField
				fullWidth
				floatingLabelText="Енергія +"
				onChange={onChange('minEnergy')}
				defaultValue={settings.minEnergy}
			/><br />
		</div>
		<div className="col-md-3 col-lg-3">
			<TextField
				fullWidth
				floatingLabelText="Енергія +"
				onChange={onChange('maxEnergy')}
				defaultValue={settings.maxEnergy}
			/><br />
		</div>
	</div>
);

Segments.propTypes = {
	onChange: PropTypes.func.isRequired,
  onTestSoundClick: PropTypes.func.isRequired,
	settings: PropTypes.object.isRequired,
};

export default Segments;
