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
            key: getLangKey()     
        } 
        this.getStudent = this.getStudent.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount --> StudentControl');

        this.getStudent(this.props);

    }

    getStudent(props){
        var shiftId, classId, sectionId, batchId, studentId;
        //let key = getLangKey();
        shiftId = props.shiftId ? props.shiftId : 0;
        classId = props.classId ? props.classId : 0;
        sectionId = props.sectionId ? props.sectionId : 0;
        batchId = props.batchId ? props.batchId : 0;
        studentId = props.studentId ? props.studentId : 0;

        //console.log('sdasd');
        axios.get('/api/GetStudentControlData/' + this.state.key + '/' + shiftId + '/' + classId + '/' + sectionId + '/' + batchId + '/' + studentId)
            .then(res => {
                //console.log('sdas asd d', res.data);
                const student = res.data;
                this.setState({ student });
            });
    }
  
    shouldComponentUpdate(nextProps, nextState) {

        //const { batchId, sectionId, classId, shiftId, studentId } = this.props;
        //const { nbatchId, nsectionId, nclassId, nshiftId, nstudentId } = nextProps;

        // console.log('shouldComponentUpdate --> StudentControl',this.props.studentId != nextProps.nstudentId, studentId, nstudentId, nextState.student);
        // console.log('nextProps.studentId ', nextProps.studentId, nextProps);

        if (this.props.studentId != nextProps.studentId && nextProps.studentId) {
            //let key = getLangKey();
            this.setState({ student: [] });
            this.getStudent(nextProps);
        }

        return this.props.studentId != nextProps.nstudentId;
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
                                    <th colSpan="2"><Msg phrase="FullNameText" /></th>
                                    <th>{student.StudentRollNo?<Msg phrase="RollNoText" />:""}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{student.StudentCode}</td>
                                    <td colSpan="2">{student.StudentName}</td>
                                    <td>{student.StudentRollNo}</td>
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