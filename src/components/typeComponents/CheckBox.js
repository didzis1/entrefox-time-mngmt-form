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
	const checkedValues = currentValues.value.filter(
		(values) => values.isChecked
	)

	const handleCheckBox = (event, id) => {
		// Check if last box is disabled
		// If it is, make sure to update its state as NOT checked
		// If it is not disabled, update state as normally would
		let disabledBox = currentValues.value.find((answer) => answer.id === 6)
		if (
			isDisabled(6) ||
			checkedValues.find((checkbox) => checkbox.id !== id)
		) {
			disabledBox.isChecked = false
		}

		const checkedBox = {
			id,
			text: event.target.name,
			isChecked: event.target.checked
		}

		const updatedValues = currentValues.value.map((answer) => {
			// Update disabled checkbox only if the target box is not the disabled box
			if (answer.id === 6 && id !== 6) {
				return disabledBox
				// Update the targeted box
			} else if (answer.id === id) {
				return checkedBox
				// Update non-target and not disabled box
			} else {
				return answer
			}
		})
		// If check box is disabled and other box is targeted, two checkboxes are updated in the state
		handleInputChange(question.id, updatedValues)
	}

	const isDisabled = (id) => {
		// Only the last option needs to be disabled
		// Last option is disabled if any other option is checked
		if (checkedValues.find((checkbox) => checkbox.id !== id)) {
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
