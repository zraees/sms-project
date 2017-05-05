/**
 * Created by griga on 11/30/15.
 */

import React from 'react'
import axios from 'axios'

import WidgetGrid from '../../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../../components/widgets/JarvisWidget'

import TeacherForm from './TeacherForm'

export default class TeachersPage extends React.Component {
  render() {
      
      function onSubmit(values){
          console.log('values submitted', values);
          
          axios.post('/api/teachers', values)      
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log('this is error: '+error);
              });      
      }

    return (
      <div id="content">
        
        <WidgetGrid>


          {/* START ROW */}

          <div className="row">

            {/* NEW COL START */}
            <article className="col-sm-12 col-md-12 col-lg-12">

              {/* Widget ID (each widget will need unique ID)*/}
              <JarvisWidget editbutton={false} custombutton={false} deletebutton={false}>

                <header>
                  <span className="widget-icon"> <i className="fa fa-edit"/> </span>

                  <h2>Add New Teacher</h2>

                </header>

                {/* widget div*/}
                <div>


                  {/* widget content */}
                  <div className="widget-body no-padding">

                    <TeacherForm onSubmit={onSubmit} />

                  </div>
                  {/* end widget content */}

                </div>
                {/* end widget div */}

              </JarvisWidget>
              {/* end widget */}

          </article>
            {/* END COL */}

          </div>

          {/* END ROW */}

        </WidgetGrid>

        {/* end widget grid */}

        
      </div>
    )
  }
}