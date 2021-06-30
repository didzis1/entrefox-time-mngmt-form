import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../contexts/FormContext'
import { getAnswerByID } from '../../utils'

// Material UI
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'

const CheckBox = ({ question }) => {
	const { currentPage, handleInputChange } = useForm()
	const currentValues = getAnswerByID(currentPage, question.ID)

	const handleCheckBox = (event, ID) => {
		console.log(event)
		const checkedBox = {
			text: event.target.name,
			isChecked: event.target.checked,
			ID
		}
		const updatedValues = currentValues.value.map((answer) => {
			return answer.ID === ID ? checkedBox : answer
		})
		handleInputChange(question.ID, updatedValues)
	}
	return (
		<Box mt={2}>
			<FormGroup>
				{question.choices.map((choice) => (
					<FormControlLabel
						key={choice.ID}
						control={
							<Checkbox
								onChange={(event) =>
									handleCheckBox(event, choice.ID)
								}
								checked={
									currentValues?.value.find(
										(answer) => answer.ID === choice.ID
									).isChecked || false
								}
								name={choice.text}
								inputProps={{ 'aria-label': choice.text }}
								color='primary'
							/>
						}
						label={choice.text}
					/>
				))}
			</FormGroup>
		</Box>
	)
}

CheckBox.propTypes = {
	question: PropTypes.object
}

export default CheckBox
