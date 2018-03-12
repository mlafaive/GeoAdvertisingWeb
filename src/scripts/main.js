import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

class Main extends React.Component {
  render() {
    return(
    	<div>
    		Geode
        <br/>
        Local gems near you
    	</div>
    );
  }
}

export default Main;

ReactDOM.render(<Main/>, document.getElementById('react-container'));
