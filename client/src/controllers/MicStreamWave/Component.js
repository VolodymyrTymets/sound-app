import React from 'react';
import './style.css'

const MicStreamWave = () => (
	<div className="row">
		<div className="col-md-12 m-t-15">
			<h1> mic here</h1>


      <div className="sound-visualizer">
        <svg preserveAspectRatio="none" id="visualizer" version="1.1">
          <defs>
            <mask id="mask">
              <g id="maskGroup"></g>
            </mask>
            <linearGradient id="gradient" className="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className="stop-0"/>
              <stop offset="40%" className="stop-40"/>
              <stop offset="60%" className="stop-60"/>
              <stop offset="85%" className="stop-85"/>
              <stop offset="100%" className="stop-100"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" mask="url(#mask)"></rect>
        </svg>
      </div>
		</div>
	</div>
);

export default MicStreamWave;
