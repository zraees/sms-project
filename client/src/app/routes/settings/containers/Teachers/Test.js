import React from 'react'


class Test extends React.Component {
    
        constructor(props){
            super(props);
        }
    render(){
        const { teacherId, onSubmit, nationalities, countries, onSubmitQualification, onSubmitExperience } = this.props;
        return(
            <h1>hello test {teacherId}</h1>
        )
    }

}

export default Test;