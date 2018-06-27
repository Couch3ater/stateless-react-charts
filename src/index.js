import React from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';

import 'bulma/css/bulma.min.css';

import { Tabs, Display } from './Display';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			currentYear: 2010
		}

		//initialize workers to parse data
    //let airlineWorker = new Worker('./workers/AirlineWorker.js');
		let csvFile = require('' + this.props.file + '');
	  Papa.parse(csvFile, {
	    header: true,
	    download: true,
	    skipEmptyLines: true,
	    complete: (result) => {
	    	const data = result.data;
	    	this.setState({ data });
	    }
		});
	}

	clicky = (e) => {
		const currentYear = parseInt(e.currentTarget.id.substring(3, e.currentTarget.id.length));
		this.setState({ currentYear });
	}

	render() {
		return (
	    <div>
	      <Tabs tabs={['2010', '2011', '2012', '2013']} onClick={this.clicky} />
	      <Display chart='airline' data={this.state.data} currentYear={this.state.currentYear} />
	      <Display chart='airport' data={this.state.data} currentYear={this.state.currentYear} />
	    </div>
	  );
	}
}

ReactDOM.render(<App file='./data/claims-2010-2013_0.csv' />, document.getElementById('root'));