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
	const { currentPage, handleInputChange, formData } = useForm()
	const currentValues = getAnswerByID(currentPage, question.id, formData)

	const handleCheckBox = (event, id) => {
		const checkedBox = {
			id,
			text: event.target.name,
			isChecked: event.target.checked
		}
		const updatedValues = currentValues.value.map((answer) => {
			return answer.id === id ? checkedBox : answer
		})
		handleInputChange(question.id, updatedValues)
	}

	const isDisabled = (id) => {
		// Only the last option needs to be disabled
		// Last option is disabled if any other option is checked
		const checkedValues = currentValues.value.filter(
			(values) => values.isChecked
		)
		if (checkedValues.find((checkbox) => checkbox.id !== id)) {
			// Uncheck "En suunnittele" checkbox
			if (checkedValues.find((checkbox) => checkbox.id === id)) {
				const updatedValues = currentValues.value.map((answer) => {
					return answer.id === id
						? {
								...answer,
								isChecked: false
						  }
						: answer
				})
				// Dispatch to update isChecked for last option
				handleInputChange(question.id, updatedValues)
			}
			// Disable "En suunnittele" checkbox
			return true
		}
		// Not disabled if there are no checked checkboxes
		return false
	}

	return (
		<Box mt={2}>
			<FormGroup>
				{question.choices.map((choice) => (
					<FormControlLabel
						key={choice.id}
						control={
							<Checkbox
								onChange={(event) =>
									handleCheckBox(event, choice.id)
								}
								checked={
									currentValues?.value.find(
										(answer) => answer.id === choice.id
									).isChecked || false
								}
								disabled={
									choice.id === 6
										? isDisabled(choice.id)
										: false
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
