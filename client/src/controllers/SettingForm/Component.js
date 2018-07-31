import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Segments = ({ onChange, settings }) => (
	<div className="row">
		<div className="col-md-10 col-lg-10">
			<TextField
				fullWidth
				floatingLabelText="File Name"
				onChange={onChange('fileName')}
				defaultValue={settings.fileName}
			/><br />

		</div>
		<div className="col-md-2 col-lg-2">
			<SelectField
				floatingLabelText="Frequency"
				value={settings.mic}
				onChange={onChange('mic')}
			>
				<MenuItem value={0} primaryText="plughw:0" />
				<MenuItem value={1} primaryText="plughw:1" />
			</SelectField>
		</div>
		<div className="col-md-6 col-lg-6">
			<TextField
				fullWidth
				floatingLabelText="Середнє начення суми 100 фрагментів (сегментація)"
				onChange={onChange('segmentationValue')}
				defaultValue={settings.segmentationValue}
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
	settings: PropTypes.object.isRequired,
};

export default Segments;
