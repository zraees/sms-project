
import { Field, reduxForm } from 'redux-form'

const renderMembers = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Member</button>
    </li>
    {fields.map((member, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}/>
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          placeholder="First Name"/>
        <Field
          name={`${member}.lastName`}
          type="text"
          component={renderField}
          placeholder="Last Name"/> 
      </li>
    )}
  </ul>
)