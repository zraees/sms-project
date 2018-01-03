import React from 'react'
import axios from 'axios'
import classNames from 'classnames'

import {getLangKey} from '../../../../components/utils/functions' 
import Msg from '../../../../components/i18n/Msg'

class StudentControl extends React.Component {
  
    constructor(props){
        super(props);
        this.state = { 
            student: {},
               
        } 
    }

    componentDidMount() {
        console.log('componentDidMount --> StudentControl');

        var shiftId, classId, sectionId, batchId, studentId;
        let key = getLangKey();
        shiftId = this.props.shiftId ? this.props.shiftId : 0;
        classId = this.props.classId ? this.props.classId : 0;
        sectionId = this.props.sectionId ? this.props.sectionId : 0;
        batchId = this.props.batchId ? this.props.batchId : 0;
        studentId = this.props.studentId ? this.props.studentId : 0;

        //console.log('sdasd');
        axios.get('/api/GetStudentControlData/' + key + '/' + shiftId + '/' + classId + '/' + sectionId + '/' + batchId + '/' + studentId)
            .then(res => {
                //console.log('sdas asd d', res.data);
                const student = res.data;
                this.setState({ student });
            });

    }

  //
    render() {
        const { student } = this.state;

        return (

            <div>
                <div className="well well-sm bg-color-teal txt-color-white text-center"><h5>StudentText</h5></div>
                <div className="well">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th><Msg phrase="CodeText" /></th>
                                    <th>{student.StudentRollNo?<Msg phrase="RollNoText" />:""}</th>
                                    <th colSpan="2"><Msg phrase="FullNameText" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{student.StudentCode}</td>
                                    <td>{student.StudentRollNo}</td>
                                    <td colSpan="2">{student.StudentName}</td>
                                </tr>
                                <tr>
                                    <th><Msg phrase="BatchText" /></th>
                                    <th><Msg phrase="ShiftText" /></th>
                                    <th><Msg phrase="ClassText" /></th>
                                    <th><Msg phrase="SectionText" /></th>
                                </tr>
                                <tr>
                                    <td>{student.BatchName}</td>
                                    <td>{student.ShiftName}</td>
                                    <td>{student.ClassName}</td>
                                    <td>{student.SectionName}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
 

export default StudentControl