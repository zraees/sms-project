/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
//import moment from 'moment'

import WidgetGrid from '../../../components/widgets/WidgetGrid'
import JarvisWidget  from '../../../components/widgets/JarvisWidget'
import Moment from '../../../components/utils/Moment'
//import {getDate} from '../../../components/utils/functions'

export default class Home extends React.Component {
  render() {
    
    // var moment = require('moment');
	  // //moment.locale('ur');
    // var localLocale = moment();
    // localLocale.locale('fr');
    // //var moment = require('moment');
    // moment.locale('fr');
    //console.log('hi = ' + moment.locale());
    return (
      <div id="content">
        {moment(1316116057189).fromNow()}
        <WidgetGrid>
          <div className="row">
            <article className="col-sm-6">

              <JarvisWidget >
                <header>
                  <h2><strong>Default</strong> <i>Widget</i></h2>
                </header>
                {/* widget div*/}
                <div>
                  {/* widget content */}
                  <div className="widget-body">
    
                      <p>
                        {moment().format("llll")}
                        {/*<Moment date="12/25/1995" />*/}
                      </p>
                            
                  </div>
                  {/* end widget content */}
                </div>
                {/* end widget div */}
              </JarvisWidget>

            </article>
          </div>

        </WidgetGrid>
      </div>
    )
  }
}